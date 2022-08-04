import React from 'react'
import { Video as VideoType } from "../types/index"
import { Video } from "./Video"

type Props = {
  videos: VideoType[]
}

export const Feed = ({ videos }: Props) => {
  return (
    <div className="feed snap-y snap-mandatory overflow-scroll h-screen w-screen">
    {videos.map(video => (
      <div key={video.id}>
        <Video {...video} />
      </div>
    ))}
    </div>
  )
}