#!/bin/sh
export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

nvm use
npm ci

cd exa
npm ci --legacy-peer-deps
npm link ../discojs/discojs-node
npm run dev