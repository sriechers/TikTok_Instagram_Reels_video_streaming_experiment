import { Comment as CommentType } from "../types"
import ReactTimeAgo from 'react-time-ago'
import { zonedTimeToUtc } from "date-fns-tz"

export const Comment = ({ id, text, imgUrl, name, createdAt }: CommentType) => {

  return (
    <div className={`flex my-3`}>
      <img src={imgUrl} className="h-[1.8rem] w-[1.8rem] rounded-full ring-2 ring-slate-200" />
      <p className="ml-2 mr-1">
        <span className="font-medium text-normal text-slate-900 mr-1">
          {name}
        </span>
        <span className="text-normal text-slate-700">{text}</span>
        <span className="block white-space-nowrap leading-none -mt-[2px]">
          <ReactTimeAgo
            className={`uppercase text-[0.65rem] mr-5 font-normal tracking-wide text-slate-400`}
            date={zonedTimeToUtc(createdAt, "Europe/Berlin")}
            timeStyle="round-minute"
          />
        </span>
      </p>
    </div>
  )
}