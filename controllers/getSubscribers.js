// Requires model
const subscriberModel = require('../models/subscriber.js');

async function getSubscribers(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    }

    const {
        name,
        lastName,
        city,
        state,
        status,
    } = req.body;

    const subscriberCodeParam = req?.params?.id || null;

    if (name && (typeof name != 'string')) {
        console.log("controllers/getSubscribers - name wrong format");
        objReturn.error = "name wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (lastName && (typeof lastName != 'string')) {
        console.log("controllers/getSubscribers - lastName wrong format");
        objReturn.error = "lastName wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (city && (typeof city != 'string')) {
        console.log("controllers/getSubscribers - city wrong format");
        objReturn.error = "city wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (state && (typeof state != 'string')) {
        console.log("controllers/getSubscribers - state wrong format");
        objReturn.error = "state wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (status && (typeof status != 'string')) {
        console.log("controllers/getSubscribers - status wrong format");
        objReturn.error = "status wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    async function getSubscriberByCode() {
        try {
            const getSubscriberResult = await subscriberModel.findOne({ code: subscriberCodeParam });

            objReturn.data = getSubscriberResult;
            objReturn.resStatus = 200;
        } catch (err) {
            console.log("controllers/getSubscribers - Error to get subscriber by code at mongo document, - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    async function getSubscribersByFields() {
        try {
            // Filter subscriber by fields using OR operator
            const getSubscriberResult = await subscriberModel.find({$or:[{name}, {lastName},{city}, {state}, {status}]});

            objReturn.data = getSubscriberResult;
            objReturn.resStatus = 200;
        } catch (err) {
            console.log("controllers/getSubscribers - Error to get subscriber by fields at mongo document, - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    async function getAllSubscribers() {
        try {
            const getAllSubscribersResult = await subscriberModel.find({});

            objReturn.data = getAllSubscribersResult;
            objReturn.resStatus = 200;
        } catch (err) {
            console.log("controllers/getSubscribers - Error to get subscribers mongo document - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    // Getting subscriber by code case has param, 
    if (subscriberCodeParam) {
        getSubscriberByCode();
    }
    // Otherwise get by document fields case has it on body
    else if (Object.keys(req.body)?.length) {
        getSubscribersByFields();
    }
    // Else get all subscribers by default
    else {
        getAllSubscribers();
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

exports.getSubscribers = getSubscribers;
