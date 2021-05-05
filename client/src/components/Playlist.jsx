import React, { useEffect } from "react"
import { Button, OverlayTrigger, Tooltip, Alert, Spinner } from "react-bootstrap"
import Dialog from "./Dialog"
import { apiClient } from "../apiClient"


const Playlist = (props) => {
    const [addDialog, setAddDialog] = React.useState(false);
    const [uploading, setUploading] = React.useState(false)

    const handleUpload = async(videoFile) => {
        setUploading(true)
        const data = new FormData() 
        data.append('video', videoFile)
        console.warn(videoFile);
        let req = {
            method: 'POST',
            url: '/upload-video',
            data: data
        }

        await apiClient(req).then(res => {
            if (res.data) {
                setUploading(false)
                setAddDialog(false)
                props.fetchList()
            }
        }).catch(err => {
            console.log(err.message)
            setAddDialog(false)
            setUploading(false)
        })

    }
    return (
        <>
            {props.alert.data && (<Alert key={props.alert.type} variant={props.alert.type }>
                {props.alert.message}
            </Alert>)}
            <div className="px-3 py-2 bg-dark rounded">
                <h3 className="text-white d-flex justify-content-between">Playlist
                    <span>
                        <OverlayTrigger
                            key="left"
                            placement="left"
                            overlay={
                                <Tooltip>
                                    Add new video.
                                </Tooltip>
                            }
                        >
                            <Button size="sm" variant="outline-light" className="mx-2" onClick={() => setAddDialog(true)}>+</Button>
                        </OverlayTrigger>

                    </span>
                </h3>
            </div>
            <div className="py-2 bg-white rounded max-height-75 overflow-auto">
                {!props.loading && props.playlist.map((item, i) => (<div key={item._id} className={item._id === props.current ? "bg-light" : ""}>
                    <Button block variant="outline-link" onClick={()=>props.handleCurrentVideo(item)}>{item.name}</Button>
                    <hr className="my-1" />
                </div>)
                )}
                {props.playlist.length === 0 && !props.loading && (
                    <p className="text-center text-muted"> No videos available.</p>
                )}
                {props.loading && (<div className="d-flex justify-content-center "><Spinner animation="border" variant="primary" /></div>)}
            </div>
            {addDialog && (<Dialog
                show={addDialog}
                onHide={() => setAddDialog(false)}
                type="add"
                loading={uploading}
                handleupload={(data)=> handleUpload(data)}
            />)}
        </>
    );
}

export default Playlist;