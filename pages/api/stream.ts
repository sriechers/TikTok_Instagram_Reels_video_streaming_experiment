import { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import path from 'path'

const CHUNK_SIZE = 10 ** 6; // 1 MB

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const range = req.headers.range;
  const { mediaSrc } = req.query;

  const videoPath = Array.isArray(mediaSrc) ? mediaSrc[0] : mediaSrc;
  const uploadedFilePath = path.resolve('./public', videoPath);

  if (!range) {
    res.status(400).send("Requires Range header");
  }

  if(!mediaSrc){
    res.status(400).send("Requires mediaSrc query param");
  }

  const videoSize = fs.statSync(uploadedFilePath).size;

  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(uploadedFilePath, { start, end });
  videoStream.pipe(res);
}

export default handler