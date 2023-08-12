class SypErrorBase {
    constructor() {
        this.msg = "";
    }

    AddError(s1) {
        this.msg = s1;
    }

    ResetErrors() {
        this.msg = "";
    }

    GetErrorMsg() {
        return this.msg;
    }
}

module.exports = SypErrorBase;