require('dotenv').config();
const pool = require('./Common/database');
var DBManager = require('./Common/DBManager');

global.ConnectToDB = async () => {
    let db = new DBManager(pool);
    await db.connectToDb();
    // let bRes = await DBManager.connectFromString("postgresql://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + ":5432/" + process.env.DB_DATABASE + "");
    return db;
}
global.ReturnResult = function (data, StatusMsg = "", SessionId = "", extraData = null) {
    return {
        StatusVal: true,
        StatusCode: 0,
        StatusMsg: StatusMsg,
        SessionID: SessionId,
        Data: data,
        ExtraData: extraData,
    };
}

global.ReturnException = function (e) {
    return {
        StatusVal: false,
        StatusCode: -10,
        StatusMsg: e,
    };
}

global.InvalidResult = function (msg, statusCode = -1) {
    return {
        StatusVal: false,
        StatusCode: statusCode,
        StatusMsg: msg,
    };
}