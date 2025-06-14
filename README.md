# 📧 AWS Lambda SES Email Sender

A production-ready AWS Lambda function to send emails using **Amazon SES (Simple Email Service)**. This function takes dynamic input such as recipient address, subject, and content — and sends MIME-formatted emails using `aws-sdk` and `mimetext`.

---

## ✅ Features

- 📤 Send rich MIME-formatted emails via AWS SES
- ⚙️ Easily configurable with environment variables
- 🚀 Deployable via ZIP upload to AWS Lambda
- 🔐 Secure: does not expose credentials
- 🧪 Includes test instructions and deployment script
- 📦 Reproducible builds via `package-lock.json`

---

## 📁 Project Structure

```
.
├── handler.js           # Main Lambda handler
├── package.json         # Project dependencies and metadata
├── package-lock.json    # Locked dependencies for stable builds
├── .env.example         # Example .env file (for local testing)
├── build.sh             # Script to package project into lambda.zip
├── README.md            # Project documentation
└── LICENSE              # MIT License
```

---

## ⚙️ Setup & Deployment

### 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x recommended)
- [npm](https://www.npmjs.com/)
- `zip` utility (for packaging the Lambda)
- AWS account with verified SES sender

---

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/faraz455/aws-lambda-ses-email-sender.git
cd aws-lambda-ses-email-sender
npm install
```

---

### 2. Configure Environment

Create a `.env` file in the project root with your SES and AWS credentials:

```env
FROM_EMAIL=youremail@example.com         # Must be verified in SES
REGION=us-east-1                         # AWS region where SES is setup
ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
```

> 🛡️ **Note**: Never commit `.env` to version control. For production, use Lambda environment variables or AWS Secrets Manager.

---

### 3. Package the Lambda Function

You can run the provided `build.sh` to install dependencies and create a ZIP file:

```bash
chmod +x build.sh
./build.sh
```

> This will generate `lambda.zip` which can be uploaded to AWS Lambda.

---

### 4. Deploy on AWS Lambda

- **Runtime**: `Node.js 18.x`
- **Handler**: `handler.handler`
- **Upload**: Select `lambda.zip`
- **Environment Variables**: Add values from your `.env`
- **IAM Role**: Must include `ses:SendRawEmail` permission

---

## 🧪 Testing the Function

Sample test payload for AWS Lambda Console:

```json
{
  "toEmail": "recipient@example.com",
  "bccEmail": "bcc@example.com",
  "emailSubject": "Lambda Email Test",
  "htmlContent": "This is a test email sent via AWS Lambda!"
}
```

You should receive an email shortly if everything is configured correctly.

---

## 🛠️ Build Script

A helper script is included to streamline deployment:

**`build.sh`**

```bash
#!/bin/bash

set -e

echo "Installing dependencies..."
npm install

echo "Packaging lambda.zip..."
zip -r lambda.zip handler.js package.json package-lock.json node_modules .env.example README.md LICENSE

echo "✅ lambda.zip is ready for deployment!"
```

> Make it executable:

```bash
chmod +x build.sh
```

---

## 📚 Dependencies

| Package    | Description                         |
| ---------- | ----------------------------------- |
| `aws-sdk`  | AWS SDK for programmatic SES access |
| `mimetext` | Generates MIME-compliant email body |

---

## 🔐 Security Tips

- Use **Lambda environment variables** or **AWS Secrets Manager** to manage secrets.
- Ensure your IAM role follows **least privilege** principle.
- Only use **verified emails** in SES for sending.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for more details.
