"use server";

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  CreateIngressOptions,
} from "livekit-server-sdk";

import db from "@/db";
import { getSelf } from "@/lib/auth-service";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";
import { ingressVideoEncodingPresetFromJSON } from "livekit-server-sdk/dist/proto/livekit_ingress";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL! || "",
  process.env.LIVEKIT_API_KEY! || "",
  process.env.LIVEKIT_API_SECRET! || ""
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL! || "");

export const resetIngress = async (hostIdentiy: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentiy,
  });

  const rooms = await roomService.listRooms([hostIdentiy]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};
export const createIngress = async (IngressType: IngressInput) => {
  const self = await getSelf();

  //TODO: reset previdous Ingress
  await resetIngress(self.id);
  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  if (IngressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
  }

  const ingress = await ingressClient.createIngress(IngressType, options);

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create ingress");
  }

  await db.stream.update({
    where: {
      userId: self.id,
    },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  revalidatePath(`/u/${self.username}/keys`);
  revalidatePath(`/u/${self.username}`);
};
