const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const fileuploadSchema = require('../../models/fileuploadModel.js');
dotenv.config()


const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'ap-south-1',
});

const uploadFile = async (req, fileName, key) => {
    let response = s3.upload({
        Bucket: 'interior-design1',
        Key: fileName,
        Body: req.files[key].data,
        ContentType: req.files[key].mimetype,
        // ACL: 'public-read'
    }).promise()
    return response.then(data => {
        return { status: true, data }
    }).catch(err => {
        return { status: false, err }
    })
}

const fileupload = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    
    if (!title && !description) {

        res.send({ message: "", statuscode: 400, status: false, errormessage: "Please provide the fields", data: [] });
    }
    else {
        try {

            const fileName = Date.now() + req.files.file.name;
            
            const response = await uploadFile(req, fileName, "file");
            if (response.status) {
                let newfileupload = await fileuploadSchema.create({
                    title: title,
                    description: description,
                    fileUrl: response.data.Location
                });
                newfileupload.save();
                res.send({ message: "Data insert successfully!", statuscode: 200, status: true, errormessage: "", data: [] });

            } else {
                res.send({ response });
            }
        }
        catch (err) {
            res.send(err);
        }
    }
};

module.exports = fileupload;














