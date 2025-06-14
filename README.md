# 📧 AWS Lambda SES Email Sender

A **production-grade AWS Lambda function** to send emails via **Amazon SES (Simple Email Service)**. Designed for clarity, security, and simplicity, this Lambda function receives email details (recipient, subject, message) as input and sends MIME-compliant emails using `aws-sdk`.

---

## ✅ Features

- 📤 Send transactional or custom MIME-formatted emails via AWS SES
- 🔐 Uses secure environment variables (no hardcoded credentials)
- 🧱 Modular architecture: clean separation of concerns
- 🚀 Easily deployable via ZIP upload to AWS Lambda
- 🧪 Includes a test payload and build script for quick setup

---

## 📁 Project Structure

```
.
├── index.js              # Lambda entry point (exports handler)
├── src/
│   ├── handlers/
│   │   └── emailHandler.js    # Lambda logic
│   ├── services/
│   │   └── sesService.js      # AWS SES email service
│   └── utils/
│       └── validator.js       # Input validation
├── .env.example          # Example environment config
├── build.sh              # ZIP packaging script
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Locked versions for reproducible builds
├── README.md             # This file
└── LICENSE               # MIT License
```

---

## ⚙️ Setup & Deployment

### 🔧 Prerequisites

Ensure you have:

- ✅ [Node.js](https://nodejs.org/) (18.x or higher)
- ✅ [npm](https://www.npmjs.com/)
- ✅ AWS account with SES and verified sender email
- ✅ IAM Role with permission: `ses:SendEmail`

---

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/faraz455/aws-lambda-ses-email-sender.git
cd aws-lambda-ses-email-sender
npm install
```

---

### 2. Environment Configuration

Create a `.env` file (or set Lambda environment variables in AWS Console):

```ini
FROM_EMAIL=youremail@example.com
REGION=us-east-1
ACCESS_KEY_ID=ACESS_KEY_ID
SECRET_ACCESS_KEY=SECRET_ACCESS_KEY
```

> ℹ️ `FROM_EMAIL` must be verified in SES.

---

### 3. Package for Deployment

Run the provided build script:

```bash
chmod +x build.sh
./build.sh
```

This creates `lambda.zip`, ready for Lambda upload.

---

### 4. Deploy on AWS Lambda

- **Runtime**: `Node.js 18.x`
- **Handler**: `index.handler`
- **Upload**: `lambda.zip`
- **Environment Variables**: Set `SOURCE_EMAIL`, `REGION`, `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`
- **IAM Role**: Must include `ses:SendEmail` permission

---

## 🧪 Testing the Lambda Function

Send a test event with this payload in the Lambda console:

```json
{
  "to": "recipient@example.com",
  "subject": "Lambda Email Test",
  "message": "This is a test email sent from AWS Lambda!"
}
```

> You should receive the email shortly if SES is configured properly and the email is verified.

---

## 🛠️ Build Script

Included `build.sh` simplifies packaging:

```bash
#!/bin/bash

set -e

echo "Installing dependencies..."
npm install

zip -r lambda.zip index.js src/ package.json package-lock.json .env README.md LICENSE
echo "✅ lambda.zip ready to upload!"
```

---

## 📚 Dependencies

| Package     | Purpose                           |
| ----------- | --------------------------------- |
| `aws-sdk`   | Interface with AWS SES            |
| `validator` | Email input validation            |
| `dotenv`    | Loads `.env` during local testing |

---

## 🔐 Security Best Practices

- Never hardcode AWS credentials — use IAM roles or Secrets Manager
- Only send from **verified emails/domains** in SES
- Apply least-privilege policy to IAM roles

---

## 📄 License

MIT License. See the [LICENSE](./LICENSE) file for details.

---

Let me know if you'd like to add:

- ✅ HTML + plain-text MIME support
- ✅ Multi-recipient or BCC support
- ✅ CDK/SAM deployment templates
- ✅ API Gateway integration example
