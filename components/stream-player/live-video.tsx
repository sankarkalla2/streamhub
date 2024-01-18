"use client";

import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { useTracks } from "@livekit/components-react";
import { FullScreenControl } from "./full-screen-conrol";
import { useEventListener } from "usehooks-ts";
import VolumeControl from "./volume-conrol";

interface LiveVideoProps {
  participant: Participant;
}
const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setFullScreen] = useState(false);
  const [volume, setVolume] = useState(50);
  const [mute, setMute] = useState(false);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  const toggleFullScren = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      wrapperRef.current?.requestFullscreen();
    }

    setFullScreen(!isFullScreen);
  };

  const handleFullScreenChange = () => {
    const isCurrenltyFullScreen = document.fullscreenElement !== null;
    setFullScreen(isCurrenltyFullScreen);
  };

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);
  useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef);
  return (
    <div className="h-full flex relative" ref={wrapperRef!}>
      <video width="100%" ref={videoRef} />
      <div className="absolute h-full w-full opacity-0 hover:opacity-100">
        <div className="absolute flex h-14 w-full items-center justify-between px-4 bottom-10">
          <FullScreenControl isFullScreen={false} onToggle={toggleFullScren} />
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
