import db from "@/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const POST = async (req: Request) => {
  try {
    const body = await req.text();
    const headerPayload = headers();
    const authrization = headerPayload.get("Authorization");
    if (!authrization) {
      console.log("something went wrong");
      return new NextResponse("No authrization header", { status: 400 });
    }

    const event = receiver.receive(body, authrization);

    if (event.event === "ingress_started") {
      console.log(true);
      await db.stream.update({
        where: {
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: true,
        },
      });
    }

    if (event.event === "ingress_ended") {
      await db.stream.update({
        where: {
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: false,
        },
      });
    }

    return new NextResponse("Successfully connected", { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internel server error", { status: 200 });
  }
};
