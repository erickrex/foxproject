import { assign, createMachine } from "xstate";

const addPicked = assign({
  results: (ctx, event) => ctx.results.add(event.partialAnswer),
});

//message could hold some additional info about the user
const getQuestionnaire = createMachine(
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
            { answer: "Astra", picture: "src" },
            { answer: "ThemeForest theme", picture: "src" },
            { answer: "GeneratePress", picture: "src" },
            { answer: "Divi", picture: "src" },
            { answer: "Flatsome", picture: "src" },
            { answer: "Other", picture: "src" },
          ],
        },
        on: {
          Astra: { target: "two", actions: [addPicked] },
          "ThemeForest theme": { target: "two", actions: [addPicked] },
          GeneratePress: { target: "two", actions: [addPicked] },
          Divi: { target: "two", actions: [addPicked] },
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
          "No cache plugin": { target: "fourB", actions: [addPicked] },
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
          yes: { target: "five", actions: [addPicked] },
          no: { target: "five", actions: [addPicked] },
          PREV: "three",
        },
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
          definetely: { target: "sixA", actions: [addPicked] },
          "probably not": { target: "sixB", actions: [addPicked] },
          "I do not know": { target: "sixC", actions: [addPicked] },
          PREV: "three",
        },
      },
      sixA: {
        meta: {
          question: "We recommend you the following product",
          optionsAvailable: [{ answer: "Learn Dash", picture: "src" }],
        },
        on: {
          "Learn Dash": { target: "finish", actions: [addPicked] },
          PREV: "five",
        },
      },
      sixB: {
        meta: {
          question: "We recommend you the following product",
          optionsAvailable: [{ answer: "Lifter LMS", picture: "src" }],
        },
        on: {
          "Lifter LMS": { target: "finish", actions: [addPicked] },
          PREV: "five",
        },
      },
      sixC: {
        meta: {
          question: "We recommend you the following product",
          optionsAvailable: [{ answer: "TutorLMS", picture: "src" }],
        },
        on: {
          TutorLMS: { target: "finish", actions: [addPicked] },
          PREV: "five",
        },
      },
      finish: {
        meta: {
          question: "Thank you for trusting our selector",
          optionsAvailable: [{ answer: "Finished", picture: "src" }],
        },
        type: "final",
      },
    },
  },
  {
    actions: {
      addPicked,
    },
  }
);

export default getQuestionnaire;
