#!/bin/bash

# Build docs
npm run build
# Switch to gh-pages branch
git checkout gh-pages
# Copy everything from build to root
cp -r ./build/* ./
# Commit with current time
git add .
# Commit with current time
git commit -a -m "Demo updated `date +'%Y-%m-%d %H:%M:%S'`"
# Pull changes, if any
git pull --rebase origin gh-pages
# Push changes
git push origin gh-pages
# Switch back to the branch
git checkout -