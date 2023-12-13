import aws from "aws-sdk";
import axios from "axios";

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3!);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID!,
    secretAccessKey: process.env.APP_KEY!,
  },
});

export const uploadFile = async (path: any, buffer: any, mimetype: any) => {
  const file = await s3
    .upload({
      Bucket: process.env.BACKBLAZE_BUCKET!,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

  return {
    url: file.Location,
    path: file.Key,
  };
};

export const listFiles = async () => {
  const arquivos = await s3
    .listObjects({
      Bucket: process.env.BACKBLAZE_BUCKET!,
    })
    .promise();

  const files = arquivos.Contents?.map((file) => {
    return {
      url: `https://${process.env.BACKBLAZE_BUCKET}.${process.env.ENDPOINT_S3}/${file.Key}`,
      path: file.Key,
    };
  });

  return files;
};

export const getFirstFile = async () => {
  const files = await listFiles();
  const response = await axios.get(files?.[0].url!);

  return response.data;
};

export const getFirstFileName = async () => {
  const files = await listFiles();

  const fileName = files?.[0].path;
  return fileName;
};

export const deleteAllFiles = async () => {
  const files = await listFiles();

  if (files) {
    const promises = files.map(async (file) => {
      if (file.path) {
        await s3
          .deleteObject({
            Bucket: process.env.BACKBLAZE_BUCKET || "",
            Key: file.path,
          })
          .promise();
      }
    });

    await Promise.all(promises);
  }
};

// export const deleteFile = async () => {
//   const files = await listFiles();
//   const fileName = files?.[0].path;

//   await s3
//     .deleteObject({
//       Bucket: process.env.BACKBLAZE_BUCKET || "",
//       Key: fileName || "",
//     })
//     .promise();
// };
