const pool = require('pg');

class DBManager {
    constructor(pool) {
        this.pool = pool;
        this._ServerConnected = false;
        this._ServerDB = null;
    }

    async connectToDb() {
        this._errorMsg = '';
        try {
            if (!this._ServerConnected) {
                try {
                    this._ServerDB = await this.pool.connect();
                    console.log('Database connected')
                    this._ServerConnected = true;
                    return true;
                } catch (error) {
                    this._errorMsg = 'Error connecting from the PostgreSQL database ' + error.message;
                    return false;
                }
            } else {
                console.log('Database connected')
                return true;
            }

        } catch (error) {
            this._errorMsg = error.message;
            return false;
        }
    }

    getErrorMessage() {
        return this._errorMsg;
    }

    async closeConnection() {
        this._errorMsg = '';
        try {
            if (this._ServerDB) {
                await this._ServerDB.release();
                this._ServerConnected = false;
            }

            return true;

        } catch (error) {
            this._errorMsg = 'Error disconnecting from the PostgreSQL database' + error;
            return false;
        }
    }

    async CheckConnection() {

        if (!this._ServerConnected) {
            if (!await this.connectToDb()) {
                console.debug(this.ErrorMsg);
                return false;
            }
        }
        return true;
    }

    async validateQueryAndConnection(strSQL) {
        this._errorMsg = '';
        try {
            if (!strSQL && strSQL.trim() != "") {
                this.ErrorMsg = 'SQL Statement cannot be null';
                console.debug(this.ErrorMsg);
                return false;
            }

            if (!(await this.CheckConnection())) {
                return false;
            }
            return true;
        } catch (error) {
            this._errorMsg = error.message;
            return false;
        }
    }

    async getDataTable(strSQL, arrParams = []) {
        try {

            let bValid = await this.validateQueryAndConnection(strSQL);
            if (!bValid) return null;

            let command = await this._ServerDB.query(strSQL, arrParams);
            return command;

        } catch (ex) {

            this._errorMsg = ex.message;
            return null;

        }
    }

    async executeNonQuery(strSQL, arrParams = []) {
        try {
            let bValid = await this.validateQueryAndConnection(strSQL);
            if (!bValid) return false;
            let command = await this._ServerDB.query(strSQL, arrParams);
            return true;
        } catch (ex) {
            this._errorMsg = ex.message;
            return false;
        }
    }

    async executeCountQuery(strSQL, arrParams = []) {
        try {
            let bValid = await this.validateQueryAndConnection(strSQL);
            if (!bValid) return null;

            let command = await this._ServerDB.query(strSQL, arrParams);
            console.log("count:" + command.rows);
            return command.rows[0].count;

        } catch (ex) {
            this._errorMsg = ex.message;
            return -1;
        }
    }


}

module.exports = DBManager;