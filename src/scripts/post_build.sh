#!/bin/bash

# Copy all the icons from the src/icons folder to the built folder
cp -R src/icons/* ./built

# Copy all the files from the dist folder to the built folder
cp -R ./dist/* ./built

# Get the version number from package.json
VERSION=$(node -p "require('./package.json').version")

# Replace the version number in manifest.json
sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" built/manifest.json