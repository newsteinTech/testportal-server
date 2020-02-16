import { ResponseModel } from '../dto/responseModel';

import * as AWS from 'aws-sdk';

export class S3Service {
    private static bucketName: string = "bucket name";

    public static async upload(req, res) {
        try {
            let s3bucket = new AWS.S3({
                accessKeyId: "<access key>",
                secretAccessKey: "<secret key>",
                apiVersion: '2006-03-01'
              });

             let file = req.files.file;

             console.log(req.files.file.name)
            var params = {
                Key: file.name,
                Body: file.data,
                ACL: 'public-read',
                Bucket: S3Service.bucketName
            };

            s3bucket.putObject(params).promise().then(data => {
                console.log('Successfully uploaded data ', data);
               
                return res.status(200).send(ResponseModel.getValidResponse(S3Service.buildUploadedFileUrl(file.name)));
            }, error => {
                console.error(error, error.stack);
                return res.status(200).send(ResponseModel.getInvalidResponse("fat gya"));
            })

            

        } catch (err) {
            console.log('ERROR MSG: ', err);
            return res.status(500).send(err);
        }
    }

    private static buildUploadedFileUrl(fileName: string) : string {
        return `https://bucket path/${fileName}`;
    }
}