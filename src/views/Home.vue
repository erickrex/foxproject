<template>
  <div>
    <h1>WordPress plugin selector</h1>
    <p>
      Don't spend your money on a membership/LMS plugin that might be incompatible with your current stack. Ask our expert AI selectir first and find the right plugin!
    </p>
    <div class="selector-container">
      <h2>{{ state.meta[`step.${state.value}`].question }}</h2>
      <form class="selector">
        <div>
          <div
            class="option"
            v-for="optionsAvailable in state.meta[`step.${state.value}`].optionsAvailable"
            :key="optionsAvailable"
          >
            <input
              type="radio"
              :value="optionsAvailable"
              v-model="picked"
              :name="state.meta[`step.${state.value}`].question"
              validation="required"
            />
            {{ optionsAvailable.answer }}
          </div>
        </div>
        <div class="submitQuestion">
          <input
            class="submissionButton"
            type="button"
            value="Back"
            @click.prevent="handleBack"
          />
          <input
            class="submissionButton"
            type="button"
            value="Next"
            @click.prevent="handleForward"
          />
          <input
            class="submissionButton"
            type="button"
            value="Machine"
            @click="goBack"
          />
        </div>
      </form>      
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import getQuestionnaire from "../composables/getQuestionnaire";
import { useMachine } from "@xstate/vue";

//Chakra didnt work, VueFormulate not supported either
//CONFIGURATION OF THE FORM, Uses States for each question
//the initial state has to be set to the first question

export default {
  name: "Home",
  components: {},
  setup() {
    const picked = ref('')
    const { state, send } = useMachine(getQuestionnaire);
    const option = ref("");

    
    const goBack = () => {
      //prev button not holding state
      send("PREV");
    }
    return { state, send, option, picked, goBack };
  },
  data() {
    return {
      currentState: this.state.initial,
    };
  },
  computed: {
    currentDecision() {
      let currentQUEST = this.state.meta[`step.one`];
      if (this.currentState !== this.state.initial) {
        currentQUEST = this.state.meta[`step.${this.state.value}`];
      } 
      return currentQUEST;
    },
  },
  methods: {
    handleForward: function () {
      //if state radio button selected
      //get selected option send selected option to next
      //this.answersObj.questions.push(this.currentDecision.question);
      //this.answersObj.answers.push(this.picked);
      //console.log(this);
      this.currentState = this.send({
        //name of the action in the state
        type: `${this.picked.answer}`,
        final: `${this.picked.answer}` 
        });
    console.log(getQuestionnaire.context.results);
    },
    handleBack: function () {
      //prev button not holding state
      this.currentState = this.send("PREV");
      console.log(this.state.meta[`step.${this.state.value}`].question);
    },
    handleButtonJump: function () {
      //optional button to shortcircuit the tree
      this.currentState = this.send("JUMP");
      console.log(this.state);

      console.log(this.state.meta[`step.${this.state.value}`].question);
    },
  },
};
</script>

<style>
.selector {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: auto 0;
}
.Answers {
  text-align: center;
}
.submitQuestion {
  margin: 1rem;
  padding: 1rem;
}
.option {
  margin: 0.3rem;
  padding: 0.3rem;
}
.submissionButton {
  margin: 2rem;
  padding: 1rem;
}
</style>