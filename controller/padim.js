const {StatusCodes} = require ('http-status-codes');

const uploadTrainingImages = async (req, res, next) => {
    res.status(StatusCodes.OK).send();
};

module.exports = { uploadTrainingImages };