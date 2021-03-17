<template>
  <div>
    <h1>WordPress plugin selector</h1>
    <p>
      Don't spend your money on a membership/LMS plugin that might be
      incompatible with your current stack. Ask our experts first and find the
      right plugin!
    </p>
    <div class="selector-container">
      <h2>{{ currentDecision.question }}</h2>
      <form>
        <div
          class="option"
          v-for="optionsAvailable in currentDecision.optionsAvailable"
          :key="optionsAvailable"
        >
          <input
            type="radio"
            :value="optionsAvailable"
            v-model="picked"
            :name="currentDecision.question"
            validation="required"
          />
          {{ optionsAvailable.answer }}
           
        </div>
        <input type="button" value="Back" @click.prevent="handleButtonBack" />
        <input type="button" value="Next" @click.prevent="handleButtonClick" />
        
      </form>
    </div>
    
  </div>
</template>


<script>
import { ref } from "vue";
import getQuestionnaire from "../composables/getQuestionnaire";
import { useMachine } from '@xstate/vue';

//Chakra didnt work, VueFormulate not supported either
//CONFIGURATION OF THE FORM, Use States for each question
//the initial state has to be set to the first question, in our example "scope"


export default {
  name: "Home",
  components: {},
  setup() {
    console.log(1)
    const { state, send } = useMachine(getQuestionnaire);
    //options doesnt need to be ref
    const option = ref("");
    console.log(state);
    console.log(3)
    //this is not used anywhere

    let answersObj = { questions: [], answers: [] };

    
    console.log(3)
    //console.log(state.one);
    return { state, send, option, answersObj };
  },
  data() {
    return {
      currentState: this.state.initial,
    };
  },
  //   getURL(){
  //       let x = "Vue";
  //       return `../assets/${x}.png`
  //   },

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
    fetchQuestions() {
      //moving the stateMachine to its own file did not work;

      return null;
    },
    handleButtonClick: function () {
      //if state radio button selected
      //get selected option send selected option to next
      this.answersObj.questions.push(this.currentDecision.question);
      this.answersObj.answers.push(this.picked);
      console.log(this);
      this.currentState = this.send(`${this.picked.answer}`);
    },
    handleButtonBack: function () {
      //prev button not holding state
      this.currentState = this.send("PREV");
      console.log(this.state.meta[`step.${this.state.value}`].question);

      //breaks when you reach the end and try to come back
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
form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.Answers {
  text-align: center;
}
</style>