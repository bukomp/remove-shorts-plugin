#!/bin/bash

# Copy all the icons from the src/icons folder to the built folder
cp -R ./icons/* ./build

# Copy all the files from the dist folder to the built folder
cp -R ./dist/* ./build

# Get the version number from package.json
VERSION=$(node -p "require('./package.json').version")

# Replace the version number in manifest.json
sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" build/manifest.json