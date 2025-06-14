import validator from "validator";

export const validateEmailPayload = ({ to, subject, message }) => {
  if (!to || !validator.isEmail(to))
    return 'Invalid or missing "to" email address';
  if (!subject || typeof subject !== "string")
    return "Missing or invalid subject";
  if (!message || typeof message !== "string")
    return "Missing or invalid message";
  return null;
};
