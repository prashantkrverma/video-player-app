import React from "react"
import { Modal, Button, Form, Spinner } from "react-bootstrap"

const Dialog = (props) => {
    const [videoFile, setVideoFile] = React.useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        switch (props.type) {
            case "delete":
                return props.handleDelete()
            case "add":
                return props.handleupload(videoFile)
            default:
                props.onHide()
                break;
        }
    }

    const handleInputChange = (event) => {
        setVideoFile(event.target.files[0])
    }
    const getText = () => {
        switch (props.type) {
            case "delete":
                return {
                    title: "Confirmation",
                    message: <h2 className="text-center text-danger">Warning!</h2>,
                    body: <p className="text-center text-muted">Are you sure you want to delete?</p>
                }
            case "add":
                return {
                    title: "Add Video",
                    message: "",
                    body: getUploadForm()
                }
            default: return {
                title: "Confirmation",
                message: "",
                body: ""
            }
        }
    }
    const getUploadForm = () => {
        return (
            <>
                <Form className="d-flex w-100 justify-content-center align-items-center" >
                    <Form.Group >
                        <label>Select video</label>
                        <Form.File accept="video/mp4" onChange={handleInputChange} />
                    </Form.Group>
                </Form>
            </>
        )
    }

    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby={getText().title}
                centered
                backdrop
            >
                <Modal.Header closeButton className="py-2 d-flex justify-content-between align-items-center">
                    <Modal.Title className="text-dark">
                        {getText().title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {getText().message}
                    {getText().body}
                    {props.loading && 
                        (<div className="d-flex justify-content-center "><Spinner animation="border" variant="primary" /></div>)}
                </Modal.Body>
                <Modal.Footer className="py-1">
                    <Button onClick={props.onHide} size="sm" variant="link-secondary">Cancel</Button>
                    <Button onClick={handleSubmit}
                        size="sm"
                        variant={props.type === "delete" ? "danger" : "primary"}>
                        {props.type === "delete" ? "Delete" : "Upload"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Dialog;