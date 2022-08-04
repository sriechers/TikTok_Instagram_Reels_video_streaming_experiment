import Layout from '../components/Layout'
import { Feed } from "../components/Feed"
import { useEffect, useState } from "react"
import { getRandomIntInRange, generateFakeComments, generateFakeUsers } from "../utils"

const videoData = async () => [
  {
    id: 1,
    title: "Lunchtime 🍻",
    src: "uploads/lunch.mp4",
    likes: getRandomIntInRange(0, 980000),
    user: await generateFakeUsers(),
    comments: await generateFakeComments(32)
  },
  {
    id: 2,
    title: "Read more Books",
    src: "uploads/book.mp4",
    likes: getRandomIntInRange(0, 980000),
    user: await generateFakeUsers(),
    comments: await generateFakeComments(20),
  },
  {
    id: 3,
    title: "Relaxing Atmosphere",
    src: "uploads/bridge.mp4",
    likes: getRandomIntInRange(0, 980000),
    user: await generateFakeUsers(),
    comments: await generateFakeComments(10)
  }
]

const IndexPage = () => {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    videoData().then((newData) => setData(newData))
  }, [])
    
  console.log(data)
  return (
    <Layout title="Video Streaming Feed | Tik Tok 🚀">
      {data ? 
        <Feed videos={data}/> 
        : 
        <p>loading…</p>
      }
    </Layout>
  )
}

export default IndexPage
