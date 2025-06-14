const AWS = require("aws-sdk");
const { createMimeMessage } = require("mimetext");

const FROM_EMAIL = process.env.FROM_EMAIL;

const SES_CONFIG = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
};

exports.handler = async (event) => {
  try {
    if (!event.toEmail) {
      throw new Error("Recipient email (toEmail) is required.");
    }

    const AWS_SES = new AWS.SES(SES_CONFIG);
    const rawMessage = await createMessage(event);

    const params = {
      Source: FROM_EMAIL,
      Destinations: [event.toEmail],
      RawMessage: { Data: rawMessage },
    };

    const result = await AWS_SES.sendRawEmail(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ messageId: result.MessageId }),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

async function createMessage(context) {
  const msg = createMimeMessage();

  msg.setSender(FROM_EMAIL);
  msg.setRecipients(context.toEmail, { type: "To" });
  if (context.bccEmail) msg.setRecipients(context.bccEmail, { type: "Bcc" });
  msg.setSubject(context.emailSubject);
  if (context.htmlContent)
    msg.addMessage({ contentType: "text/plain", data: context.htmlContent });

  return msg.asRaw();
}
