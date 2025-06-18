# 📧 AWS Lambda SES Email Sender

A **production-grade AWS Lambda function** to send emails via **Amazon SES (Simple Email Service)**. Designed for clarity, security, and simplicity, this Lambda function receives email details (recipient, subject, message) as input and sends emails using `aws-sdk`.

---

## ✅ Features

- 📤 Send transactional formatted emails via AWS SES
- 🔐 Uses secure environment variables (no hardcoded credentials)
- 🧱 Modular architecture: clean separation of concerns
- 🚀 Multiple deployment options: SAM CLI or manual ZIP upload
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
├── template.yaml             # SAM/CloudFormation template
├── samconfig.toml.example    # Example SAM deployment config
├── .env.example              # Example environment config
├── build.sh                  # ZIP packaging script
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Locked versions for reproducible builds
├── README.md                 # This file
└── LICENSE                   # MIT License
```

---

## ⚙️ Setup & Deployment

### 🔧 Prerequisites

Ensure you have:

- ✅ [Node.js](https://nodejs.org/) (18.x or higher)
- ✅ [npm](https://www.npmjs.com/)
- ✅ [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
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

### 2. Deployment Options

#### A. Using SAM CLI Deployment (Recommended)

1. Create an S3 bucket for SAM deployments:

```bash
aws s3 mb s3://your-sam-deployments-bucket --region your-region
```

2. Create `samconfig.toml` from the example:

```bash
cp samconfig.toml.example samconfig.toml
```

3. Update `samconfig.toml` with your values:

```toml
version = 0.1
[default.deploy.parameters]
stack_name = "aws-ses-lambda"
resolve_s3 = false
s3_bucket = "your-sam-deployments-bucket"
s3_prefix = "aws-ses-lambda"
region = "your-region"
capabilities = "CAPABILITY_IAM"
```

4. Deploy the application:

```bash
sam deploy
```

5. View the deployed API endpoint:

```bash
aws cloudformation describe-stacks --stack-name aws-ses-lambda --query 'Stacks[0].Outputs'
```

#### B. Manual ZIP Deployment

1. Create the deployment package:

```bash
chmod +x build.sh
./build.sh
```

This creates `lambda.zip`, ready for Lambda upload.

2. Upload `lambda.zip` to AWS Lambda:

- Go to AWS Lambda Console
- Select your function
- Click "Upload from" → ".zip file"
- Upload the generated `lambda.zip`

---

### 3. Environment Configuration

The Lambda function requires the following environment variables to be set in the AWS Lambda console:

```ini
SOURCE_EMAIL=youremail@example.com
REGION=us-east-1
ACCESS_KEY_ID=ACCESS_KEY_ID
SECRET_ACCESS_KEY=SECRET_ACCESS_KEY
```

> ⚠️ **Important**:
>
> - The `.env` file is only used for local development
> - After deploying the Lambda function, you must manually set these environment variables in the AWS Lambda console
> - See `.env.example` for the required variable
> - `SOURCE_EMAIL` must be verified in SES

To set environment variables in Lambda:

1. Go to AWS Lambda Console
2. Select your function
3. Scroll down to "Configuration" tab
4. Click on "Environment variables"
5. Click "Edit"
6. Add each variable from `.env.example`
7. Click "Save"

### 4. AWS Console Configuration

- **Runtime**: `Node.js 18.x`
- **Handler**: `index.handler`
- **Environment Variables**: Set `SOURCE_EMAIL`, `REGION`, `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`
- **IAM Role**: Must include `ses:SendEmail` permission

---

## 🧪 Testing the Lambda Function

### A. Testing via Lambda Console

When testing directly in the Lambda console, you need to wrap your payload in a `body` field as a JSON string:

```json
{
  "body": "{\n  \"to\": \"recipient@example.com\",\n  \"subject\": \"Lambda Email Test\",\n  \"message\": \"This is a test email sent from AWS Lambda!\"\n}"
}
```

### B. Testing via API Endpoint

When testing via the API endpoint (e.g., using Postman, curl, or any HTTP client), send the payload directly:

```json
{
  "to": "recipient@example.com",
  "subject": "Lambda Email Test",
  "message": "This is a test email sent from AWS Lambda!"
}
```

> ⚠️ **Important**:
>
> - Make sure to set `Content-Type: application/json` header when testing via API endpoint
> - The email address in `to` field must be valid
> - `SOURCE_EMAIL` must be verified in SES
> - You should receive the email shortly if SES is configured properly

#### API Gateway Authorization

If you've configured API Gateway with IAM authorization:

1. In Postman, go to the "Authorization" tab
2. Select "AWS Signature" as the authorization type
3. Enter your AWS credentials:
   - AccessKey: Your AWS Access Key ID
   - SecretKey: Your AWS Secret Access Key

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
- Keep `samconfig.toml` out of version control (it's in `.gitignore`)
- Use environment variables for sensitive configuration

---

## 📄 License

MIT License. See the [LICENSE](./LICENSE) file for details.
