# **PredicTable** 


We created PredicTable, a web application for resaurant to predict future sales, to help reduce overproduction and create a menu plan tailored for the customers.

PredicTable works inside **DISCO**,to run federated learning without sharing any original data from the resaurant, so that they can keep their privacy.

:question: **WHY DISCO?** 
- To build deep learning models across private datasets without compromising data privacy, ownership, sovereignty, or model performance
- To create an easy-to-use platform that allows non-specialists to participate in collaborative learning


## Quick Start
We provide a [`run_server.sh`](run_server.sh) and a [`run_client.sh`](run_client.sh) to help launch the project.
Firstly run run_server.sh and then run run_client.sh when you want to create a new client. Note that each time you need to open a new terminal window to run the bash script.

The detailed commands for running is as below:
```
cd disco
nvm use
npm ci
cd discojs/
npm ci
./build.sh 
cd ../server/
npm ci
npm link ../discojs/discojs-node
npm run dev
cd ../exa
npm ci --legacy-peer-deps
npm link ../discojs/discojs-node
npm run dev
```


