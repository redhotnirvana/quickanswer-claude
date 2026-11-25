#!/bin/zsh
# Builds the app, then QuickAnswer-<VERSION>.pkg (installs to /Applications). Bump VERSION before a release.
set -e
cd "$(dirname "$0")"
VERSION=$(cat VERSION)
./build.sh
S=$(mktemp -d)
mkdir -p $S/root/Applications && ditto QuickAnswer.app $S/root/Applications/QuickAnswer.app
pkgbuild --analyze --root $S/root $S/c.plist >/dev/null
plutil -replace 0.BundleIsRelocatable -bool NO $S/c.plist # always /Applications, even if a copy exists elsewhere
pkgbuild --root $S/root --component-plist $S/c.plist --identifier local.quickanswer.claude.pkg \
  --version $VERSION --install-location / QuickAnswer-$VERSION.pkg
# Checks: same version inside the app, no API key anywhere, valid signature.
pkgutil --expand-full QuickAnswer-$VERSION.pkg $S/x
[[ $(plutil -extract CFBundleShortVersionString raw $S/x/Payload/Applications/QuickAnswer.app/Contents/Info.plist) == $VERSION ]]
! grep -rqE "sk-ant-[a-zA-Z0-9]" $S/x
codesign --verify --deep $S/x/Payload/Applications/QuickAnswer.app
rm -rf $S
echo "OK: QuickAnswer-$VERSION.pkg (app $VERSION, aucune clé, signature valide)"
