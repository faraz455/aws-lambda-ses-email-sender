import { sendEmail } from "../services/sesService.js";
import { validateEmailPayload } from "../utils/validator.js";

export const handler = async (event) => {
  try {
    // Check if event.body exists
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error:
            "Request body is missing. Please provide a JSON body with 'to', 'subject', and 'message' fields.",
        }),
      };
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch (parseError) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error:
            "Invalid JSON in request body. Please ensure the request body is valid JSON.",
        }),
      };
    }

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
      body: JSON.stringify({
        error: "Internal Server Error",
        message: error.message,
      }),
    };
  }
};
