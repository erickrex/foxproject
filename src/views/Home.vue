<template>
  <div>
    <h1>WordPress plugin selector</h1>
    <p>
      Don't spend your money on a membership/LMS plugin that might be
      incompatible with your current stack. Consult our expert AI selector first
      and find the right plugin!
    </p>
    <div class="selector-container">
      <h2>{{ state.meta[`step.${state.value}`].question }}</h2>
      <form className="selector">
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
            v-if="!state.done"
            class="submissionButton"
            type="button"
            value="Next"
            @click.prevent="goForward"
          />
          <input
            v-if="state.done"
            class="submissionButton"
            type="button"
            value="See recommendation"
            @click.prevent=""
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import SingleQuestion from '../components/SingleQuestion.vue'
// import Spinner from '../components/Spinner.vue'
import { ref} from "vue";
import { useMutation } from "@vue/apollo-composable";
import createAnswerMutation from "../assets/createAnswer.mutation.gql";
import Questionnaire from "../composables/Questionnaire";
import { useMachine } from "@xstate/vue";

export default {
  name: "Home",
  components: {},

  setup() {
    const picked = ref("");
    const { state, send } = useMachine(Questionnaire);
    const option = ref("");
    const { mutate: insertAnswer } = useMutation(createAnswerMutation);
    const answersFromUser = Questionnaire.context.results;
    
    function answersToDB() {
      const userAnswer = JSON.stringify([...Questionnaire.context.results]);
      const userAnswerDate = new Date();
      insertAnswer({ id: 0, answer: userAnswer, entryAt: userAnswerDate });
      //console.log(JSON.stringify([...Questionnaire.context.results]));
    }

    const goForward = () => {
      send({
        type: `${picked.value.answer}`,
        partialAnswer: {
          [`${state.value.value}`]: `${picked.value.answer}`,
        },
      });
      if (state.value.done) {
        answersToDB();
      }
      //console.log(state.value.meta[`step.${state.value.value}`].question);
    };

    const goBack = () => {
      //prev button not holding state
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
    };
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