
# Removing all folders before build
# This is done for developers peace of mind :)

# List of files and directories to remove
items=(
"./build"
"./dist"
"./build.zip"
)

# Loop through the array
for item in "${items[@]}"
do
  # If the file or directory exists, remove it
  if [ -e "$item" ]; then
    rm -r "$item"
  fi
done