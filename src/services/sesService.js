import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const SES_CONFIG = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
};

const ses = new AWS.SES(SES_CONFIG);

export const sendEmail = async ({ to, subject, message }) => {
  const params = {
    Source: process.env.SOURCE_EMAIL,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: message,
        },
      },
    },
  };

  return ses.sendEmail(params).promise();
};
