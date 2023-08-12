const express = require('express');
const router = express.Router();
const Home_DAL = require('../DAO/home_DAL');


// Use express.json() middleware to parse JSON in the request body
// router.use(express.json());

router.post('/saveuser', async (req, res) => {
    let _DbMgr = null;
    try {
        _DbMgr = await ConnectToDB();
        if (_DbMgr._ServerConnected == false) {
            return res.send(InvalidResult(_DbMgr.getErrorMessage()));
        }

        const { Username, Password } = req.body;
        const HomeDal = new Home_DAL(_DbMgr);

        let result = await HomeDal.SaveUser(Username, Password);

        if (result == false) {
            return res.send(InvalidResult(HomeDal.GetErrorMsg()));
        } else {
            return res.send(ReturnResult(result));
        }
    } catch (err) {
        return res.send(InvalidResult(err.message));
    } finally {
        if (_DbMgr != null) {
            await _DbMgr.closeConnection();
        }
    }
});

module.exports = router;
