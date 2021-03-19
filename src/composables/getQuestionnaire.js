import { assign, createMachine } from "xstate";

//this works by itself
const addPicked = assign({
  results: (ctx, event) => ctx.results.add(event.userAnswer)
});  

//message could hold the time the user took to finish the questionnaire
const getQuestionnaire = createMachine(
  {
    id: "step",
    initial: "one",
    context: {
      results: new Set,
      message: "",
    },
    states: {
      one: {
        meta: {
          question: "Which theme are you currently using?",
          optionsAvailable: [
            { answer: "Hello by Elementor", picture: "src" },
            { answer: "Astra", picture: "src" },
            { answer: "OceanWP", picture: "src" },
            { answer: "ThemeForest", picture: "src" },
            { answer: "GeneratePress", picture: "src" },
            { answer: "Genesis", picture: "src" },
            { answer: "Divi", picture: "src" },
            { answer: "X", picture: "src" },
            { answer: "Flatsome", picture: "src" },
            { answer: "Other", picture: "src" },
          ],
        },
        on: {
          "Hello by Elementor": { target: "two", actions: [addPicked] },
          Astra: { target: "two", actions: [addPicked] },
          OceanWP: { target: "two", actions: [addPicked] },
          ThemeForest: { target: "two", actions: [addPicked] },
          GeneratePress: { target: "two", actions: [addPicked] },
          Genesis: { target: "two", actions: [addPicked] },
          Divi: { target: "two", actions: [addPicked] },
          X: { target: "two", actions: [addPicked] },
          Flatsome: { target: "two", actions: [addPicked] },
          Other: { target: "two", actions: [addPicked] },
        },
      },
      two: {
        meta: {
          question: "Which page builder are you using, if any?",
          optionsAvailable: [
            { answer: "Elementor", picture: "src" },
            { answer: "Divi Builder", picture: "src" },
            { answer: "WPBakery", picture: "src" },
            { answer: "No page builder", picture: "src" },
          ],
        },
        on: {
          Elementor: { target: "three", actions: [addPicked] },
          "Divi Builder": { target: "three", actions: [addPicked] },
          WPBakery: { target: "three", actions: [addPicked] },
          "No page builder": { target: "three", actions: [addPicked] },
          PREV: "one",
        },
      },
      three: {
        meta: {
          question: "Which cache plugin are you using, if any",
          optionsAvailable: [
            { answer: "RocketCache", picture: "src" },
            { answer: "W3Cache", picture: "src" },
            { answer: "SuperCache", picture: "src" },
            { answer: "No cache plugin", picture: "src" },
          ],
        },
        on: {
          RocketCache: { target: "fourA", actions: [addPicked] },
          W3Cache: { target: "fourA", actions: [addPicked] },
          SuperCache: { target: "fourB", actions: [addPicked] },
          "No cache plugin": { target: "five", actions: [addPicked] },
          PREV: "two",
        },
      },
      fourA: {
        meta: {
          question: "What is the main area in which you wish to expand?",
          optionsAvailable: [
            { answer: "Courses", picture: "src" },
            { answer: "Forums", picture: "src" },
            { answer: "Sell content", picture: "src" },
          ],
        },
        on: {
          Courses: { target: "five", actions: [addPicked] },
          Forums: { target: "five", actions: [addPicked] },
          "Sell content": { target: "five", actions: [addPicked] },
          PREV: "three",
        },
      },
      fourB: {
        meta: {
          question: "Are you a developer?",
          optionsAvailable: [
            { answer: "yes", picture: "src" },
            { answer: "no", picture: "src" },
          ],
        },
        on: { 
          yes: {target: "five", actions: [addPicked] }, 
          no: {target: "five", actions: [addPicked] }, 
          PREV: "three" },
      },
      five: {
        meta: {
          question: "Do you require content dripping capabilities?",
          optionsAvailable: [
            { answer: "definetely", picture: "src" },
            { answer: "probably not", picture: "src" },
            { answer: "I do not know", picture: "src" },
          ],
        },
        on: { 
          definetely: {target: "finish", actions: [addPicked] }, 
          "probably not": {target: "finish", actions: [addPicked] }, 
          "I do not know": {target: "finish", actions: [addPicked] }, 
          PREV: "three" },
      },
      finish: {
        type: "final",
      },
    },
  },
  {
    actions: {
      addPicked
    },
  }
);

// const service = interpret(getQuestionnaire).onTransition(state => {
//   console.log(state.context);
//   console.log(getQuestionnaire.context);
// });

// service.start()

export default getQuestionnaire;
