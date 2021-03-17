import { Machine } from "xstate";

const getQuestionnaire = 
    Machine({
      id: "step",
      initial: "one",
      context: {
        results: [],
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
              //{answer : "Other", picture: "src", type:"checkbox, toggle, etc"}
            ],
          },
          on: {
            "Hello by Elementor": "two",
            Astra: "two",
            OceanWP: "two",
            ThemeForest: "two",
            GeneratePress: "two",
            Genesis: "two",
            Divi: "two",
            X: "two",
            Flatsome: "two",
            Other: "two",
          },
        },
        two: {
          meta: {
            question: "Which page builder are you using, if any?",
            optionsAvailable: [
              { answer: "Elementor", picture: "src" },
              { answer: "Divi Builder", picture: "src" },
              { answer: "WPBakery", picture: "src" },
              { answer: "None", picture: "src" },
            ],
          },
          on: {
            Elementor: "three",
            "Divi Builder": "three",
            WPBakery: "three",
            None: "three",
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
              { answer: "None", picture: "src" },
            ],
          },
          on: {
            RocketCache: "fourA",
            W3Cache: "fourA",
            SuperCache: "fourB",
            None: "five",
            PREV: "two",
          },
        },
        fourA: {
          meta: {
            question: "What is the main area you wish to expand?",
            optionsAvailable: [
              { answer: "Courses", picture: "src" },
              { answer: "Forums", picture: "src" },
              { answer: "Sell content", picture: "src" },
            ],
          },
          on: {
            Courses: "five",
            Forums: "five",
            "Sell content": "five",
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
              { answer: "yes", picture: "src" },
              { answer: "no", picture: "src" },
              { answer: "I do not know", picture: "src" },
            ],
          },
          on: { yes: "finish", no: "finish", PREV: "three" },
        },
        finish: {
          type: "final",
        },
      },
    });
  

export default getQuestionnaire;
