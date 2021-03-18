import { assign, Machine } from "xstate";
//I can add stuff to the Set via .add


const addPicked = () => {
  console.log("updatePicked")
  //results: ctx => ctx.results.add(8)
};

const updatePicked = assign({
  results: ctx => ctx.results.add(8)
});

const getQuestionnaire = Machine(
  {
    id: "step",
    initial: "one",
    context: {
      results: new Set(),
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
          OceanWP: { target: "two", actions: [updatePicked] },
          ThemeForest: { target: "two", actions: [updatePicked] },
          GeneratePress: { target: "two", actions: [updatePicked] },
          Genesis: { target: "two", actions: [updatePicked] },
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
          WPBakery: { target: "three", actions: [updatePicked] },
          None: { target: "three", actions: [updatePicked] },
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
          SuperCache: { target: "fourB", actions: [updatePicked] },
          None: { target: "five", actions: [updatePicked] },
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
        on: { yes: "five", no: "five", PREV: "three" },
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
        on: { yes: "finish", no: "finish", PREV: "three" },
      },
      finish: {
        type: "final",
      },
    },
  },
  {
    actions: {
      addPicked,
      updatePicked
    },
  }
);

export default getQuestionnaire;
