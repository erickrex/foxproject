<template>
  <div>
    <h1 class="title">WordPress plugin selector</h1>
    <p>
      Don't spend your money on a membership/LMS plugin that might be
      incompatible with your current stack. Consult our expert AI selector first
      and find the right plugin!
    </p>
    <div class="container">
      <h2 class="subtitle">{{ state.meta[`step.${state.value}`].question }}</h2>
      <form class="form-container">
        <div class="label-card">
        <label
        
        v-for="optionsAvailable in state.meta[`step.${state.value}`]
        .optionsAvailable"
        :key="optionsAvailable"
        >
        <Card :optionsAvailable="optionsAvailable" :optionsName="state.meta[`step.${state.value}`].question" @clickedRadio="setPicked"/>
        </label>
        </div>
        <div class="button-container">
          <input
            v-if="state.value !== 'one'"
            class="submit-button"
            type="button"
            value="Back"
            @click.prevent="goBack"
          />
          <input
            v-if="!state.done"
            class="submit-button"
            type="button"
            value="Next"
            @click.prevent="goForward"
          />
          <input
            v-if="state.done"
            class="submit-button"
            type="button"
            value="Persist to DB"
            @click.prevent=""
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import createAnswerMutation from "../assets/createAnswer.mutation.gql";
import Questionnaire from "../composables/Questionnaire";
import { useMachine } from "@xstate/vue";
import Card from "../components/Card";

export default {
  name: "Home",
  components: { Card },

  setup() {
    const picked = ref("");
    const { state, send } = useMachine(Questionnaire);
    const option = ref("");
    const { mutate: insertAnswer } = useMutation(createAnswerMutation);
    const answersFromUser = Questionnaire.context.results;

    function setPicked(optionPicked) {
      picked.value = optionPicked.value
    }
    function answersToDB() {
      const userAnswer = JSON.stringify([...Questionnaire.context.results]);
      const userAnswerDate = new Date();
      insertAnswer({ id: 0, answer: userAnswer, entryAt: userAnswerDate });
    }

    const goForward = () => {
      send({
        type: `${picked.value}`,
        partialAnswer: {
          [`${state.value.value}`]: `${picked.value}`,
        },
      });
      if (state.value.done) {
        answersToDB();
      }

    };

    const goBack = () => {
      send("PREV");
    };
    return {
      state,
      send,
      option,
      picked,
      goBack,
      goForward,
      answersToDB,
      answersFromUser,
      insertAnswer,
      setPicked
    };
  },
};
</script>


<style scoped>
.title{
  font-size: 2em;
  font-weight: bold;
  margin: 0.2em 0;
}
.subtitle{
  font-size: 1em;
  font-weight: bold;
  margin: 0.5em 0;
  padding: 0.5em 0;
}
.container {
  background-color: lightgray;
  margin: 0 auto;
  max-width: 90%;
  height: 20em;
}
.form-container{
  margin: 0.2em auto;
  
  width: 80vw;
}

.label-card {
  margin: 0 auto;
  justify-content: space-around;
  display:flex;
  flex-wrap: wrap;  
}

.submit-button {
  margin: 1rem;
  padding: 1rem;
}

.submit-button {
  text-transform: uppercase;
  font-weight: 500;
  background: gray;
  margin: 2rem;
  border-radius: 4px;  
  padding: 1rem;
}
.submit-button:hover {
  background: black;
  color: white;
}
</style>