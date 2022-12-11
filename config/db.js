const mongoose = require('mongoose');
const config = require('config');

const db = config.get('db');

const connectDB = (callback)=>{

    try {
        mongoose.connect(db);
        callback();
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = connectDB;