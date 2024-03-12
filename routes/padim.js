const express = require('express');
const router = express.Router();
const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { id: orderId } = req.params;
        const path = `./uploads/${orderId}`
        fs.mkdirSync(path, { recursive: true })
        return cb(null, path)
    },
    filename: function (req, file, cb) {
        const {prefix} = req.query;
        cb(null, prefix + '-' + Date.now() + '-' + file.originalname)
    }
})
const upload = multer({storage});

const { uploadTrainingImages } = require('../controller/padim');

router.route('/upload-train-images/:id').post(upload.array('uploadedImages',50), uploadTrainingImages);


module.exports = router;