import React, { useEffect } from "react"
import './App.css';
import { Row, Col } from "react-bootstrap"

import VideoPlayer from "./components/VideoPlayer"
import Playlist from "./components/Playlist"
import { apiClient } from "./apiClient"

function App() {
  const [currentVideo, setCurrentVideo] = React.useState({})
  const [alert, setAlert] = React.useState({ data: false })
  const [loading, setLoading] = React.useState({ data: false })
  const [playlist, setPlaylist] = React.useState([])
  const handleCurrentVideo = async (data) => {
      setCurrentVideo(data)
  }
  const fetchList = async () => {
    let req = {
        method: 'GET',
        url: '/get-video-playlist'
    }
    setLoading(true)
    await apiClient(req).then(res => {
        if (res.data) {
            setPlaylist(res.data.data)
            setLoading(false)
            setCurrentVideo(res.data.data[0])
           
        }
    }).catch(err => {
        console.log(err.message)
        setLoading(false)
        alertOn(err.message)
    })
}
const alertOn = (message, type = "danger") => {
  setAlert({ data: true, message: message, type: type })
  setTimeout(() => {
      setAlert({ data: false })
  }, 2000)
}
useEffect(()=>{
  fetchList()
},[])
  return (
    <div className="App">
      <h3 className="text-center text-muted py-4 font-weight-bold">Video Player App</h3>
      <Row className="px-2 w-100 justify-content-center ">
        <Col xs={12} sm={12} md={12} lg={8} >
          <VideoPlayer data={currentVideo} fetchList={fetchList} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={4} className="">
          <Playlist alert={alert} loading={loading} current={currentVideo && currentVideo._id} fetchList={fetchList} playlist={playlist} handleCurrentVideo={(data) => handleCurrentVideo(data)}/>
        </Col>
      </Row>
    </div>
  );
}

export default App;
