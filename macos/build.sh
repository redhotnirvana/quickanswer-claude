#!/bin/zsh
# Builds QuickAnswer.app next to this script. Usage: ./build.sh
set -e
cd "$(dirname "$0")"
APP=QuickAnswer.app
VERSION=$(cat VERSION) # single source for the app and the .pkg (see package.sh)
rm -rf $APP && mkdir -p $APP/Contents/MacOS
swiftc -O -swift-version 5 -target arm64-apple-macos14.0 main.swift -o $APP/Contents/MacOS/QuickAnswer
cat > $APP/Contents/Info.plist <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
<key>CFBundleIdentifier</key><string>local.quickanswer.claude</string>
<key>CFBundleName</key><string>QuickAnswer</string>
<key>CFBundleExecutable</key><string>QuickAnswer</string>
<key>CFBundlePackageType</key><string>APPL</string>
<key>CFBundleShortVersionString</key><string>$VERSION</string>
<key>CFBundleVersion</key><string>$VERSION</string>
<key>LSMinimumSystemVersion</key><string>14.0</string>
<key>LSUIElement</key><true/>
</dict></plist>
EOF
# A stable signing identity keeps the Accessibility / Screen Recording grants across rebuilds.
IDENTITY=$(security find-identity -v -p codesigning | awk -F'"' 'NR==1 && /"/ {print $2}')
codesign --force --sign "${IDENTITY:--}" $APP
echo "Built $(pwd)/$APP (signed with: ${IDENTITY:-ad-hoc})"
