# foxproject

A multi-step questionnaire application to create a sequence of questions and answers based on a JSON object/state machine.  

#### Note
This application is purely for practice purposes. Most of its setup and configuration come from the vue-cli create vue app command, it's not ready for production and may contain bugs. 

## Features
The questionnaire resembles a decision tree. The following question you receive depends directly of your previous answer. Some may converge into the same question later. The final result is a unique branch in the final step that recommends you a product according to your answers and persists this to a DB via Apollo GraphQL.



The example data uses a state Machine, its composition is very similar to a JSON object. You are free to modify it for your use case under /src/composables/getQuestionnaire.js

Built with VueJS 3.0, XState, xstate/vue, and JavaScript.

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
The easiest way to get going is to copy the Machine available in /src/composables/getQuestionnaire.js and visualize it through https://xstate.js.org/viz/ 

You can modify the questions and their sequence based solely on this object.
```
