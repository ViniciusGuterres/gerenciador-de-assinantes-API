// Requires model
const subscriberModel = require('../models/subscriber.js');

async function saveSubscriber(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    }

    if (!req.body) {
        console.log("controllers/saveSubscriber - missing req.body");
        objReturn.error = "missing req.body";
        controllerReturn(objReturn, res);
        return;
    }

    const {
        code,
        name,
        lastName,
        birth_date,
        telephone,
        address,
        city,
        state,
        status,
        profileImage
    } = req.body;

    if (!code) {
        console.log("controllers/saveSubscriber - missing code");
        objReturn.error = "missing code";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!name || (typeof name != 'string')) {
        console.log("controllers/saveSubscriber - missing name or wrong format");
        objReturn.error = "missing name or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!lastName || (typeof lastName != 'string')) {
        console.log("controllers/saveSubscriber - missing lastName or wrong format");
        objReturn.error = "missing lastName or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!birth_date) {
        console.log("controllers/saveSubscriber - missing birth_date");
        objReturn.error = "missing birth_date or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!telephone || (typeof telephone != 'number')) {
        console.log("controllers/saveSubscriber - missing telephone or wrong format");
        objReturn.error = "missing telephone or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!address || (typeof address != 'string')) {
        console.log("controllers/saveSubscriber - missing address or wrong format");
        objReturn.error = "missing address or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!city || (typeof city != 'string')) {
        console.log("controllers/saveSubscriber - missing city or wrong format");
        objReturn.error = "missing city or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!state || (typeof state != 'string')) {
        console.log("controllers/saveSubscriber - missing state or wrong format");
        objReturn.error = "missing state or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if ((typeof status != 'boolean')) {
        console.log("controllers/saveSubscriber - missing status or wrong format");
        objReturn.error = "missing status or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    // Starting creating document at mongo
    try {
        const subscriberObj = req.body;

        // Getting the new subscriber id
        const maxMongoSubscriberID = await subscriberModel.findOne({}).sort({ code: -1 });
        subscriberObj.id = maxMongoSubscriberID == null ? 1 : maxMongoSubscriberID.id + 1;

        const createSubscriberResult = await subscriberModel.create(subscriberObj);

        objReturn.data = createSubscriberResult;
        objReturn.resStatus = 201;
    } catch (err) {
        console.log("controllers/saveSubscriber - Error to create subscriber mongo document - ERROR: ", err);
        objReturn.error = err;
        objReturn.resStatus = 500;
    }
    finally {
        controllerReturn(objReturn, res);
    }
};

function controllerReturn(objReturn, res) {
    const { error, data, resStatus } = objReturn;

    if (error || !data) {
        res.status(resStatus).send(objReturn);
        return;
    }

    res.status(resStatus).send(objReturn);
}

exports.saveSubscriber = saveSubscriber;
