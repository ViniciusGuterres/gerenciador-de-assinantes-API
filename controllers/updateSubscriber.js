// Requires model
const subscriberModel = require('../models/subscriber.js');

async function updateSubscriber(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    }

    if (!req.params) {
        console.log("controllers/updateSubscriber - missing req.params");
        objReturn.error = "missing req.params";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    const { id } = req.params;

    if (!id) {
        console.log("controllers/updateSubscriber - missing req.id");
        objReturn.error = "missing req.params.id";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!req.body) {
        console.log("controllers/updateSubscriber - missing req.body");
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

    if (code && (typeof code != 'number')) {
        console.log("controllers/updateSubscriber - missing code or wrong format");
        objReturn.error = "missing code or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (name && (typeof name != 'string')) {
        console.log("controllers/updateSubscriber - name or wrong format");
        objReturn.error = "name or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (lastName && (typeof lastName != 'string')) {
        console.log("controllers/updateSubscriber - lastName or wrong format");
        objReturn.error = "lastName or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (birth_date && (typeof birth_date != 'string')) {
        console.log("controllers/updateSubscriber - birth_date");
        objReturn.error = "birth_date or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (telephone && (typeof telephone != 'number')) {
        console.log("controllers/updateSubscriber - telephone or wrong format");
        objReturn.error = "telephone or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (address && (typeof address != 'string')) {
        console.log("controllers/updateSubscriber - address or wrong format");
        objReturn.error = "address or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (city && (typeof city != 'string')) {
        console.log("controllers/updateSubscriber - city or wrong format");
        objReturn.error = "city or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (state && (typeof state != 'string')) {
        console.log("controllers/updateSubscriber - state or wrong format");
        objReturn.error = "state or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (status != undefined && (typeof status != 'boolean')) {
        console.log("controllers/updateSubscriber - missing status or wrong format");
        objReturn.error = "missing status or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    // Starting creating document at mongo
    try {
        const subscriberUpdateObj = req.body;

        const updateSubscriberResult = await subscriberModel.updateOne({ _id: id }, subscriberUpdateObj);

        objReturn.data = updateSubscriberResult;
        objReturn.resStatus = 201;
    } catch (err) {
        console.log("controllers/updateSubscriber - Error to create subscriber mongo document - ERROR: ", err);
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

exports.updateSubscriber = updateSubscriber;
