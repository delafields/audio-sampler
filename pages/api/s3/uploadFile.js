import S3 from "aws-sdk/clients/s3";

// s3 instance
const s3 = new S3({
  region: "us-east-1",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: "v$"
});



export default async => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        let { name, type } = req.body;

        const fileParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: name,
            Expires: 600,
            ContentType: type
        };

        const url = await s3.getSignedUrlPromise("putObject", fileParams);

        res.status(200).json({ url });
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err })
    }
};

// setting filesize limit
export const config = {
    api: {
      bodyParser: {
        sizeLimit: "8mb"
      }
    }
  };