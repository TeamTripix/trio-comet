import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

interface IndexProps {
  videoId: string;
}

const Index: React.FC<IndexProps> = ({ videoId }) => {
  // Set up event handlers
  //   const onReady = (event) => {
  //     // Access the player instance
  //     const player = event.target;

  //     // For example, you can automatically play the video
  //     player.playVideo();
  //   };

  //   const onError = (error) => {
  //     console.error("YouTube Player Error:", error);
  //   };

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // console.log(event.target)
    // access to player in all event handlers via event.target
    event.target.playVideo();
  }

  //   return <YouTube videoId={videoId} onReady={onReady} onError={onError} />;
  const opts: YouTubeProps["opts"] = {
    height: "780",
    width: "1400",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <YouTube
      onReady={onPlayerReady}
      videoId={videoId}
      opts={opts}
      style={{ width: "140rem", height: "78rem" }}
    />
  );
};

export default Index;
