#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Setting up Python backend..."
# Create virtual environment if it doesn't exist
if [ ! -d "server/venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv server/venv
fi

# Activate virtual environment and install dependencies
echo "Installing backend dependencies..."
. server/venv/bin/activate
pip install -r server/requirements.txt
deactivate

echo "Build complete!"
