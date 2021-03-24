# foxproject

A multi-step questionnaire application to create a sequence of questions and answers based on a JSON object/state machine and persist the result to a DB through a GraphQL API.  

## Features
The questionnaire resembles a decision tree. The following question you receive depends directly of your previous answer. Some may converge into the same question later. The final result is a unique branch in the final step that recommends you a product according to your answers and persists this to a DB via Apollo GraphQL.

![Image of Questionnaire](https://github.com/erickrex/foxproject/blob/main/src/assets/visualMachine.JPG)

The example data uses a state Machine, its composition is very similar to a JSON object. You are free to modify it for your use case under /src/composables/getQuestionnaire.js

The API needs to be installed separately and can be found in:
https://github.com/erickrex/graphql

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

Install the GraphQL API found in:

https://github.com/erickrex/graphql

### Compiles and hot-reloads for development
```
npm run serve
```
You should be on your way :D

## Logic of the questionnaire
The easiest way to get going is to copy the Machine available in /src/composables/getQuestionnaire.js and visualize it through https://xstate.js.org/viz/ 

You can modify the questions and their sequence based solely on this object.
```
