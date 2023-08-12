const SypErrorBase = require("../Common/SypErrorBase");

class Home_DAL extends SypErrorBase {
    constructor(db) {
        super();
        if (!db) {
            throw new Error('Database object cannot be null')
        }
        this._DbMgr = db;
    }
    async SaveUser(Username, Password) {
        try {

            let sql = `INSERT INTO INFORMATION (USER_NAME, PASSWORD) VALUES ($1, $2) `;

            let res = await this._DbMgr.executeNonQuery(sql, [Username, Password]);

            if (res == false) {
                this.AddError(this._DbMgr.getErrorMessage());
                return false;
            }

            return true;


        } catch (error) {
            this.AddError(error.message);
            return false;
        }
    }

}
module.exports = Home_DAL;