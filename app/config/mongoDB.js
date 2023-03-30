var MONGO_DB = require('mongodb');
const MongoClient = MONGO_DB.MongoClient;
const url = process.env.MONGO_URL;
//const url = "mongodb://127.0.0.1:27017/";
//const url = "mongodb://localhost:27017";
//const url = 'mongodb://user:password@localhost:27017/dbName'
//const url="mongodb+srv://kranjan0620:<qHOIrN5QqG5bHBwg>@cluster0.pzmzohz.mongodb.net/?retryWrites=true&w=majority";

try{
    var M_CONNECT = MongoClient.connect(url, {
        useUnifiedTopology: true
    });
    module.exports = { MONGO_DB, M_CONNECT };
}
catch(err){
    console.log(err);
}