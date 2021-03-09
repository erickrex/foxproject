# foxproject

A multi-step questionnaire application to create a sequence of questions and answeres based on a JSON object.  

#### Note
This application is purely for practice purposes. Most of its setup and configuration are derived from a typical create-vue-app, it's not ready for production and may contain bugs. 

## Features
The questionnaire resembles a decision tree. The following question you receive depends directly of your previous answer. Some may converge into the same question later.

The example data uses a state Machine. You are free to replace it with a JSON object for your use case.

Built with VueJS 3.0, XState, xstate/vue, Vuex and JavaScript.

## Prerequisites
The only requirement for this project is to have NodeJS installed.

## Project setup
```
Clone this repository locally with:

git clone https://github.com/erickrex/foxproject.git

Run:

npm install
```
It will install all the dependencies needed.

### Compiles and hot-reloads for development
```
npm run serve
```
You should be on your way :D

## Logic of the questionnaire
The easiest way to get going is to copy the Machine available in line 40 of Home.vue and visualize it through https://xstate.js.org/viz/ 

You can modify the questions and their sequence bases solely on this object.
```
