const APP = require('express')()
require('dotenv').config()
const CORS = require('cors')
require('./common').middleware(APP)
const { mongoConnect } = require("./config/connection")
const { upload } = require('./common').upload
const { DB } = process.env
var fs = require('fs');


// CORS initialize
APP
    .use(
        CORS()
    )

// env config
const PORT = process.env.PORT || 3000

APP
    .listen(
        PORT,
        () => console.log(`Server started @${PORT}`)
    )

// API test
APP
    .get(
        '/',
        (req, res) => {
            res.status(200).send("Hellow Server is running!")
        })

APP.get('/get-video-playlist',
    (req, res) => {
        mongoConnect(stream => {
            stream.db(DB)
                .collection("videos")
                .find().sort( { _id: -1 } ).toArray().then(result => {
                    res.send({
                        data: result
                    })
                }).catch(ex => {
                    console.log(ex.message)
                    res.send({
                        error: ex.message
                    })
                })
        })
    })

APP.get('/get-video/:filename',
    (req, res) => {
        res.sendFile(`uploads/${req.params.filename}`, { root: __dirname })
    })
APP.delete('/delete-video/:filename',
    (req, res) => {
        mongoConnect(stream => {
            stream.db(DB).collection("videos").deleteMany({ name: req.params.filename }).then((r1) => {
                fs.unlink(`uploads/${req.params.filename}`, (err, result) => {
                    res.send({ message: "successfully deleted." })
                })
            }).catch(ex => {
                console.log(ex.message)
                res.send({
                    error: ex.message
                })
            })
        })

    })

APP
    .post('/upload-video',
        upload,
        (req, res) => {
            const newVideo = {
                name: req.file.filename
            }
            mongoConnect(stream => {
                stream.db(DB)
                    .collection("videos")
                    .insertOne(newVideo, (err, result) => {
                        if (err) {
                            console.log(`Error :  ${err.message}`)
                            res
                                .status(406)
                                .send({
                                    Error: err
                                })
                        }
                        else {
                            res
                                .status(201)
                                .send({
                                    message: 'Uploaded successfully.'
                                })
                        }
                    })
            })
        })