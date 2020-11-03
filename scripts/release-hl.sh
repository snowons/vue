#!/bin/bash
set -e
CUR_VERSION=$(node build/get-hl-version.js -c)
NEXT_VERSION=$(node build/get-hl-version.js)

echo "Current: $CUR_VERSION"
read -p "Enter new version ($NEXT_VERSION): " -n 1 -r
if ! [[ -z $REPLY ]]; then
  NEXT_VERSION=$REPLY
fi

read -p "Releasing hl-vue-framework@$NEXT_VERSION - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing hl-vue-framework@$NEXT_VERSION ..."
  npm run lint
  npm run flow
  npm run test:hl

  # build
  HL_VERSION=$NEXT_VERSION npm run build:hl

  # update package
  # using subshells to avoid having to cd back
  ( cd packages/hl-vue-framework
  npm version "$NEXT_VERSION"
  npm publish
  )

  ( cd packages/hl-template-compiler
  npm version "$NEXT_VERSION"
  npm publish
  )

  # commit
  git add packages/hl*
  git commit -m "[release] hl-vue-framework@$NEXT_VERSION"
fi
