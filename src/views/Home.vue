<template>
  <div>
    <h1>WordPress plugin selector</h1>
    <p>
      Don't spend your money on a membership/LMS plugin that might be
      incompatible with your current stack. Ask our expert AI selector first and
      find the right plugin!
    </p>
    <div class="selector-container">
      <h2>{{ state.meta[`step.${state.value}`].question }}</h2>

      <form className="w-3/12 m-auto bg-purple-100 mt-4 shadow-2xl flex justify-center flex-col items-center">
        <div
          class="option"
          v-for="optionsAvailable in state.meta[`step.${state.value}`]
            .optionsAvailable"
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

        <div class="submitQuestion">
          <input
            class="submissionButton"
            type="button"
            value="Back"
            @click.prevent="goBack"
          />
          <input
            class="submissionButton"
            type="button"
            value="Next"
            @click.prevent="goForward"
          />
          <input
            class="x"
            type="button"
            value="Prisma"
            @click.prevent="answersToDB()"
          />
          
        </div>
      </form>
      
    </div>
    <div v-if="end.value==true" ><h1>YASSS</h1></div>
  </div>
</template>

<script>
import { ref, computed, reactive } from "vue";
import { useMutation } from '@vue/apollo-composable'
import createAnswerMutation from '../assets/createAnswer.mutation.gql'
import getQuestionnaire from "../composables/getQuestionnaire";
import { useMachine } from "@xstate/vue";

//Chakra didnt work, VueFormulate not supported either
//CONFIGURATION OF THE FORM, Uses States for each question
//the initial state has to be set to the first question

export default {
  name: "Home",
  components: {},
  setup() {
    const picked = ref("");
    const { state, send } = useMachine(getQuestionnaire);
    const option = ref("");
    
    
    const end = reactive((computed(() => state.value.value == 'two' ? true: false)));
    

    // function finishedQuestionnaire() {
    //     return state.value.value == 'two' ? true: false
    // }
    //const email = 'yaja@gmail.com'
    const {mutate: insertAnswer }  = useMutation(createAnswerMutation)

    const answersFromUser = getQuestionnaire.context.results
    
    

    function answersToDB() {
      const userAnswer = getQuestionnaire.context.results.value.toString();
      insertAnswer({  id: 3, answer: userAnswer, entryAt: "2025-11-22T13:57:31.123Z"});
      console.log(getQuestionnaire.context.results.value)
    }

    const goForward = () => {
      send({
        //name of the action in the state
        type: `${picked.value.answer}`,
        userAnswer: {
          [`${state.value.value}`]: `${picked.value.answer}`,
        },
      });
      console.log(state.value.value)
      console.log(end.value)
    };
    const goBack = () => {
      //prev button not holding state
      send("PREV");
    };
    return { state, send, option, picked, goBack, goForward, 
    answersToDB, answersFromUser,
     insertAnswer, end };
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