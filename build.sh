#!/bin/bash

# Exit on error
set -e

echo "Installing dependencies..."
npm install

echo "Creating deployment package..."
zip -r lambda.zip handler.js package.json package-lock.json node_modules .env.example README.md LICENSE

echo "✅ lambda.zip created successfully!"
