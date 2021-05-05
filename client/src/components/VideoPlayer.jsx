import React, { useEffect, useRef } from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import Dialog from "./Dialog"
import {apiClient} from "../apiClient"

const VideoPlayer = ({ data, ...props }) => {
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false)
    const videoRef = useRef();
    const previousUrl = useRef(data? data.name : "");
    const handleDelete = async() => {
        setDeleting(true)
        let req = {
            method: 'DELETE',
            url: `/delete-video/${data.name}`
        }

        await apiClient(req).then(res => {
            if (res.data) {
                setDeleting(false)
                setDeleteDialog(false)
                props.fetchList()
            }
        }).catch(err => {
            console.log(err.message)
            setDeleting(false)
            setDeleteDialog(false)
        })

    }
    useEffect(() => {
        if ( data && previousUrl.current !== data.name && videoRef.current) {
          videoRef.current.load();
          previousUrl.current = data.name;
        }
      }, [data? data.name: ""]);
    return (
        <>
            <div className="p-3 bg-white rounded ">
            <video ref={videoRef} preload="metadata" controls className="w-100 rounded"><source
            src={`http://localhost:5000/get-video/${data && data.name}`}
            type="video/mp4"
        /></video>
            </div>
            <OverlayTrigger
                key="left"
                placement="left"
                overlay={
                    <Tooltip>
                        Remove this video.
                    </Tooltip>
                }
            >
                <Button size="sm" variant="danger" className="float-right my-2" onClick={() => setDeleteDialog(true)}>Remove</Button>
            </OverlayTrigger>
            <Dialog
                show={deleteDialog}
                onHide={() => setDeleteDialog(false)}
                handleDelete={()=>handleDelete()}
                loading={deleting}
                type="delete"
            />
        </>
    );
}

export default VideoPlayer;