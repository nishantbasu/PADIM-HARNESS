const {StatusCodes} = require ('http-status-codes');
const { spawn } = require('child_process');
const path = require('path');


const uploadTrainingImages = async (req, res, next) => {
    const { id: orderId } = req.params;
    const dataPathResolved = path.join(__dirname, `../uploads/${orderId}`);
    const modelPathResolved = path.join(__dirname, `../uploads/${orderId}`);
    const UUID = orderId;
    const args = [
        '--data_path', dataPathResolved,
        '--model_path', modelPathResolved,
        '--UUID', UUID,
        '--train' // or '--train' depending on your requirements
    ];
    const pythonScriptPath = path.join(__dirname, '../ml/ModelManager.py');

    const pythonProcess = spawn('python', [pythonScriptPath, ...args]);

    // Handle stdout, stderr
    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    // Handle process exit
    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        res.send(`Python process exited with code ${code}`);
    });
};

module.exports = { uploadTrainingImages };