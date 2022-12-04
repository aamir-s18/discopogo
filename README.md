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

## How to train

In the folder [`exa`](exa/) you can find the implementation of our project. For every client a Disco client is created, which can communicate with a running server. To train the model visit the website and visit "Train Model" or `/train`. Select the dummy CSV from this repository and let the magic happen. Currently it's set to support federated learning.

## Some details about implementation

We took some part of the [web-client](https://github.com/epfml/disco/tree/develop/web-client) to make this project possible. The training is working and is tested with multiple inputs for a simple linear regression model. The frontend is MVP to show what can be possible with our project and how we can use Disco for non-traditional and real life related tasks. We used Vue and TypeScript to have maximal compatibility with Disco. Also the model is here a MVP with dummy data, to proof that Disco could work in this setting and is capable of solving tasks outside of the scientific environment and can provide a value to economy and sustainability.



