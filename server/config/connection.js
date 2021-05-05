const { MongoClient } = require('mongodb');
const CONFIG = require('./config');

module.exports = {
    mongoConnect: (callback) =>{
        MongoClient.connect(CONFIG.development.mongourl,{ useUnifiedTopology: true } , (err, db) =>{
            if (err) console.log(`Mongo connection error : ${err}`)
            return callback(db);
        })
    }
}