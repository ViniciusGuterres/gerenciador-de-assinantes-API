// Requires model
const subscriberModel = require('../models/subscriber.js');

async function deleteSubscriber(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    }

    if (!req.params) {
        console.log("controllers/deleteSubscriber - missing req.params");
        objReturn.error = "missing req.params";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    const { id } = req.params;

    if (!id) {
        console.log("controllers/deleteSubscriber - missing req.id");
        objReturn.error = "missing req.id";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    try {
        const deleteSubscriberResult = await subscriberModel.deleteOne({ _id: id });
        console.log("🚀 ~ file: deleteSubscriber.js:36 ~ deleteSubscriber ~ deleteSubscriberResult:", deleteSubscriberResult);

        objReturn.data = deleteSubscriberResult;
        objReturn.resStatus = 200;
    } catch (err) {
        console.log("controllers/deleteSubscriber - Error to delete subscriber at mongo document, - ERROR: ", err);
        objReturn.error = err;
        objReturn.resStatus = 500;
    } finally {
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

exports.deleteSubscriber = deleteSubscriber;
