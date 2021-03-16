<template>
 <div id="main-container">
    <h1>WordPress plugin selector</h1>
    <p>Don't spend your money on a membership/LMS plugin that might be incompatible with your current stack. Ask our experts first and find the right plugin!</p>
    <div class="selector-container">
      <h2>{{currentDecision.question}}</h2>
      <form>
        <div class="option" v-for="optionsAvailable in currentDecision.optionsAvailable" :key="optionsAvailable">
        <input type="radio"  
                   :value="optionsAvailable"
                   v-model="picked"
                   :name="currentDecision.question"
                   validation="required" 
                   > {{optionsAvailable.answer}}
        <!-- <img alt="Plugin image" :src="getURL"> -->
        </div>
        <input type="button" value="Next" @click.prevent="handleButtonClick" /> 
        <input type="button" value="Back" @click.prevent="handleButtonBack" />
        
        
        </form>
    </div>
    <div>      
    </div>
    </div>
    
</template>


<script>
import {reactive, ref} from 'vue'
import { Machine } from 'xstate';
import { useMachine } from '@xstate/vue';


//Chakra didnt work, VueFormulate not supported either
//VueJs 3 is needed as a dependency of @xstate/vue
//CONFIGURATION OF THE FORM, Use States for each question
//the initial state has to be set to the first question, in our example "scope"
const stepMachine =  Machine({
    id: "step",
    initial: "one",
    context: {
      results: [],
      message: ""
    },
    states: {
      one: {
        meta: {
            question: "Which theme are you currently using?",
            optionsAvailable: [{answer : "Hello by Elementor", picture: "src"}, {answer : "Astra", picture: "src"},
            {answer : "OceanWP", picture: "src"},
            {answer : "ThemeForest", picture: "src"},
            {answer : "GeneratePress", picture: "src"},
            {answer : "Genesis", picture: "src"},
            {answer : "Divi", picture: "src"},
            {answer : "X", picture: "src"},
            {answer : "Flatsome", picture: "src"},
            {answer : "Other", picture: "src"}
            //{answer : "Other", picture: "src", type:"checkbox, toggle, etc"}
            ]
            },
        on: { "Hello by Elementor": 'two', 
            Astra: 'two',
            OceanWP: 'two',
            ThemeForest: 'two',
            GeneratePress: 'two',
            Genesis: 'two',
            Divi: 'two',
            X: 'two',
            Flatsome: 'two',
            Other: 'two', }      
    },
    two: {
        meta: {
            question: "Which page builder are you using, if any?",
            optionsAvailable: [{answer : "Elementor", picture: "src"}, 
                            {answer : "Divi Builder", picture: "src"}, 
                            {answer : "WPBakery", picture: "src"}, 
                            {answer : "None", picture: "src"} ]
            },
        on: { Elementor: "three", 
            "Divi Builder": "three", 
            WPBakery: "three", 
            None: "three", 
            PREV: "one" }
    },
    three: {
        meta: {
            question: "Which cache plugin are you using, if any",
            optionsAvailable: [{answer : "RocketCache", picture: "src"}, 
            {answer : "W3Cache", picture: "src"},
            {answer : "SuperCache", picture: "src"},
            {answer : "None", picture: "src"}]
            },
        on: { RocketCache: "fourA",
            W3Cache: "fourA",
            SuperCache: "fourB", 
            None: "five", 
            PREV: "two"}
    },
    fourA: {
        meta: {
            question: "What is the main area you wish to expand?",
            optionsAvailable: [{answer : "Courses", picture: "src"}, 
            {answer : "Forums", picture: "src"}, 
            {answer : "Sell content", picture: "src"}]
            },
        on: { Courses: "five", 
            Forums: "five", 
            "Sell content": "five", 
            PREV: "three"}
    },
    fourB: {
        meta: {
            question: "Are you a developer?",
            optionsAvailable: [{answer : "yes", picture: "src"}, 
            {answer : "no", picture: "src"}]
            },
        on: { yes: "five", 
            no: "five", PREV: "three"}
    },
    five: {
        meta: {
            question: "Do you require content dripping capabilities?",
            optionsAvailable: [{answer : "yes", picture: "src"}, 
            {answer : "no", picture: "src"},
            {answer : "I do not know", picture: "src"}]
            },
        on: { yes: "finish", no: "finish", PREV: "three"}
        },
    finish: {
        type: "final" 
            }
  }
  });

export default {
  name: 'Home',
  components: {},
  setup() {
    
    //options doesnt need to be ref
    const option = ref('')

    //this is not used anywhere
    const selectedOptions = reactive([])
    
    let answersObj = { questions: [], answers: []}

    const {state, send} = useMachine(stepMachine);
    
    return { state, send, option, selectedOptions, answersObj }
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
        currentQUEST = this.state.meta[`step.${this.state.value}`]
        
        
      }
      return currentQUEST;
    },
  },
  methods: {
    fetchQuestions() {
      //moving the stateMachine to its own file did not work;
     
        return null;
    },
    handleButtonClick: function() {
      //if state radio button selected
        //get selected option send selected option to next
      this.answersObj.questions.push(this.currentDecision.question); 
      this.answersObj.answers.push(this.picked);
      console.log(this.answersObj);
      
      this.currentState = this.send(`${this.picked.answer}`);     
    },
    handleButtonBack: function() {
        //prev button not holding state
        this.currentState = this.send('PREV');
        console.log(this.state.meta[`step.${this.state.value}`].question)

        //breaks when you reach the end and try to come back
      
    },
    handleButtonJump: function() {
        //optional button to shortcircuit the tree
        this.currentState = this.send('JUMP');
        console.log(this.state);
       
        console.log(this.state.meta[`step.${this.state.value}`].question)
    },
    
  },
  
}
</script>

<style scoped>

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