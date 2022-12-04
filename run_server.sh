#!/bin/sh
export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

nvm use
npm ci

cd discojs
./build.sh

cd ../server
npm ci
npm link ../discojs/discojs-node
npm run dev

