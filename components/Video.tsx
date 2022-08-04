import React, { useState, ElementType, ReactNode, useRef } from 'react'
import { User, Comment as CommentType } from "../types/index"
import { useInView } from "react-intersection-observer"
import { HeartIcon, AnnotationIcon, VolumeUpIcon, VolumeOffIcon } from "@heroicons/react/solid";
import { Modal } from "./Modal"
import { Comment } from "./Comment"
import { motion, useSpring, useTransform } from "framer-motion"
import { formatNumberK } from "../utils"

type Props = {
  src: string,
  title: string,
  user: User,
  likes: number,
  comments: CommentType[]
}

type ActionButtonProps = {
  IconActiveComponent: ElementType,
  IconInactiveComponent: ElementType,
  children?: ReactNode,
  state: boolean,
  setState: (prev: unknown) => void,
}

const dropShadow = "drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.3))";

const ActionButton = ({ IconActiveComponent, IconInactiveComponent, children, setState, state }: ActionButtonProps) => {
  return (
    <div className="flex justify-center flex-col mb-2">
      <button onClick={() => setState(prev => !prev)} className="active:scale-105 transition-transform duration-200 ease-out">
        {state ? <IconActiveComponent style={{ filter: dropShadow }} className="text-white h-9 w-9" /> : <IconInactiveComponent style={{ filter: dropShadow }} className="text-white h-9 w-9" />}
      </button>
      <span className="text-white text-sm font-medium w-full text-center">{children}</span>
    </div>
  )
}

export const Video = ({ src, title, likes, user, comments }: Props) => {
  const [ muted, setMuted ] = useState(true);
  const [ liked, setLike ] = useState(false);
  const playerRef = useRef(null);
  const [ showComments, setShowComments ] = useState(false);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const onPlayback = (e) => {
    const target = (e.target as HTMLVideoElement);
    const currTime = target.currentTime;
    const duration = target.duration;
    const percent = currTime / duration * 100;

    playerRef.current.style.transform = `scaleX(${percent}%)`;
  }

  return (
    <div ref={ref} className="h-screen w-screen bg-black snap-start">
      <div className="max-w-md relative mx-auto h-full overflow-hidden">
        <video onTimeUpdate={(e) => onPlayback(e)} preload={inView ? "auto" : "none"} className="absolute object-cover h-full w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" controls={false} muted={muted} autoPlay={true} loop={true}>
          <source src={`/api/stream?mediaSrc=${src}`} type="video/mp4" />
        </video>
        <div className="bg-slate-900 bg-opacity-60 h-1 w-full z-20 absolute bottom-0 left-0">
          <div ref={playerRef} className="h-full bg-gray-200 origin-left transition-transform duration-300 ease-linear" />
        </div>
        <div className="z-20 absolute grid grid-cols-3 bottom-0 left-0 w-full px-5 pb-7">
          <div className="col-span-2">
            <p className="text-white">@{user[0].name}</p>
            <p className="text-white">{title}</p>
          </div> 
        </div>
        <div className="z-20 absolute flex flex-col justify-center items-center right-2 top-1/2 transform -translate-y-1/2"> 
          <ActionButton setState={setLike} state={liked} IconActiveComponent={HeartIcon} IconInactiveComponent={HeartIcon}>
            {formatNumberK(liked ? likes + 1 : likes)}
          </ActionButton>
          <ActionButton setState={setShowComments} state={showComments} IconActiveComponent={AnnotationIcon} IconInactiveComponent={AnnotationIcon}>
            {formatNumberK(comments.length)}
          </ActionButton>
          <ActionButton setState={setMuted} state={muted} IconActiveComponent={VolumeOffIcon} IconInactiveComponent={VolumeUpIcon} />

        </div>
        <Modal open={showComments} onClose={() => setShowComments(false)} title={`${comments.length} comments`}>
          {comments.map((comment) => (
            <Comment key={"comment_"+comment.id} {...comment}/>
          ))}
        </Modal>
        <div className="w-full h-[20%] bg-gradient-to-t bg-opacity-80 from-black to-transparent absolute bottom-0 left-0 z-10"/>
      </div>
    </div>
  )
}