import { sendEmail } from "../services/sesService.js";
import { validateEmailPayload } from "../utils/validator.js";

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body) || {};
    // Validate input
    const validationError = validateEmailPayload(body);
    if (validationError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: validationError }),
      };
    }

    const { to, subject, message } = body;

    await sendEmail({ to, subject, message });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
