const { query } = require('express');
const { MONGO_DB, M_CONNECT} = require('./config/mongoDB');


exports.createNote = async (payload) => {
    const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
    let collection = await db.collection(process.env.MONGO_DB_NOTES_COLLECTION);

    let res = await collection.insertOne(payload);

    return res.insertedId;
    
}

exports.fetchAllNotes = async (query) => {
    const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
    let collection = await db.collection(process.env.MONGO_DB_NOTES_COLLECTION);

   let res = await collection.find(query).sort({createdAt: -1}).toArray(); //newly created notes at top hence -1
    return res;
}

exports.updateNote = async (id, payload) => {
    const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
    let collection = await db.collection(process.env.MONGO_DB_NOTES_COLLECTION);

    await collection.updateOne(
        { '_id': MONGO_DB.ObjectId(id) },
        { $set: payload }
    );
    return true;
}

exports.deleteNote = async (id) => {
    const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
    let collection = await db.collection(process.env.MONGO_DB_NOTES_COLLECTION);

    const response = await collection.deleteOne(
        { '_id' : MONGO_DB.ObjectId(id) }
    )
        //Error handling when note is not deleted.
    if(!response.result.n == 1){
        throw new Error('Something went wrong');
    }

    return response.n;
}