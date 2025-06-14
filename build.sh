#!/bin/bash

# Exit on error
set -e

echo "Installing dependencies..."
npm install

rm -rf lambda.zip

echo "Creating deployment package..."
zip -r lambda.zip src index.js .env package.json package-lock.json node_modules README.md LICENSE

echo "✅ lambda.zip created successfully!"
