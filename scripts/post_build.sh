#!/bin/bash

buildDirectory="./build"

#create a directory only if it doesn't exist
if [ ! -d "$buildDirectory" ]; then
    mkdir -p "$buildDirectory"
fi

# Copy all the icons from the src/icons folder to the built folder
cp -R ./icons/* $buildDirectory

# Copy all the files from the dist folder to the built folder
cp -R ./dist/* $buildDirectory


# Get the version number from package.json
VERSION=$(node -p "require('./package.json').version")

# Replace the version number in manifest.json
sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" ./manifest.json
cp ./manifest.json $buildDirectory/manifest.json

