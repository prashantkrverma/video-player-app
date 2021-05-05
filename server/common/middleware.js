const express = require('express')

module.exports = APP => {
    if (APP) console.log('Middleware checked')

    // Body Parser
    APP
        .use(
            express
                .json({
                    extended: true,
                    limit: '500mb'
                }))
    APP
        .use(
            express
                .urlencoded({
                    extended: true,
                    limit: '500mb'
                }))
    // Allow CORS *
    APP.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })

    //   Allow all headers visible 
    APP.use((req, res, next) => {
        res.header('Access-Control-Expose-Headers', '*');
        next();
    })

    // This check makes sure this is a JSON parsing issue,
    APP.use((err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            console.error(err.message);
            return res.status(400).send({
                status: "fail",
                data: {
                    title: "Bad request",
                    description: err.message
                }
            }) // Bad request
        }
        next();
    });
}
