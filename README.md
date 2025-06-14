# 📧 AWS Lambda SES Email Sender

A lightweight and production-ready AWS Lambda function for sending emails using **Amazon SES (Simple Email Service)**. Designed for seamless deployment, this function accepts dynamic input and dispatches emails using raw MIME formatting.

---

## ✅ Features

- 📤 **Send emails** via Amazon SES with raw MIME formatting
- 🛠 **Easily deployable** — just zip and upload to Lambda
- 🔐 **Secure configuration** using environment variables
- ⚡️ **Fast cold starts** with minimal dependencies
- 📦 Includes `package-lock.json` for reproducible builds

---

## 📁 Project Structure

```
.
├── handler.js           # Lambda function logic
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Dependency lock file for consistent builds
├── .env                 # Environment variables (excluded from production)
```

---

## ⚙️ Setup & Deployment

### 1. Install Dependencies

If working locally or preparing for deployment:

```bash
npm install
```

---

### 2. Create a `.env` File

Define your SES configuration in a `.env` file:

```env
FROM_EMAIL=youremail@example.com         # Must be verified in Amazon SES
REGION=us-east-1                         # Region where SES is configured
ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
```

> 🔐 Do **not** commit this file. For production, use **Lambda environment variables** or **AWS Secrets Manager**.

---

### 3. Package the Function

Zip the function files from the **root** (not the folder itself):

```bash
zip -r lambda-email-sender.zip .
```

---

### 4. Deploy to AWS Lambda

In the AWS Lambda Console:

- **Runtime**: `Node.js 18.x`
- **Handler**: `handler.handler`
- **Upload**: Use the zipped file
- **Environment Variables**: Add values from your `.env`
- **Permissions**: Ensure Lambda has `ses:SendRawEmail` permission

---

## 🧪 Testing the Function

You can test it directly in the AWS Lambda Console with this input:

```json
{
  "toEmail": "recipient@example.com",
  "bccEmail": "bcc@example.com",
  "emailSubject": "Test Email via AWS Lambda",
  "htmlContent": "Hello from your Lambda function!"
}
```

Expected result: The recipient receives an email with your specified content and subject.

---

## 📚 Dependencies

| Package    | Description                    |
| ---------- | ------------------------------ |
| `aws-sdk`  | AWS SDK for JavaScript         |
| `mimetext` | MIME-compliant message builder |

---

## 🔐 Security Notes

- Always store sensitive credentials using environment variables or **AWS Secrets Manager**.
- Restrict IAM roles to the **least privilege** required.
- Verify `FROM_EMAIL` in SES for the region you are using.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.
