#!/bin/bash

# Set the name of the zip file
ZIP_FILE="build.zip"

# Remove the zip file if it already exists
if [ -f "$ZIP_FILE" ]; then
  rm "$ZIP_FILE"
fi

# Create a new zip file using 7-Zip and add the contents of the build folder
"D:\7-Zip\7z.exe" a "$ZIP_FILE" ./build/*