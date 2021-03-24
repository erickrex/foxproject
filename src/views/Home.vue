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
            class="submissionButton"
            type="button"
            value="Next"
            @click.prevent="goForward"
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
import getQuestionnaire from "../composables/getQuestionnaire";
import { useMachine } from "@xstate/vue";


export default {
  name: "Home",
  components: {},
  setup() {
    const picked = ref("");
    const { state, send } = useMachine(getQuestionnaire);
    const option = ref("");
    console.log(Date.now());

    const { mutate: insertAnswer } = useMutation(createAnswerMutation);
    const answersFromUser = getQuestionnaire.context.results;

    function answersToDB() {
      const userAnswer = JSON.stringify([...getQuestionnaire.context.results]);
      const userAnswerDate = new Date();

      insertAnswer({ id: 3, answer: userAnswer, entryAt: userAnswerDate });

      console.log(typeof JSON.stringify([...getQuestionnaire.context.results]));
    }

    const goForward = () => {
      send({
        type: `${picked.value.answer}`,
        partialAnswer: {
          [`${state.value.value}`]: `${picked.value.answer}`,
        },
      });
      if (state.value.value == "finish") {
        answersToDB();
      }
      console.log(state.value.value);
      console.log(getQuestionnaire.context.results);
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
h1 {
  size: 2rem;
}
h2 {
  size: 1 rem;
}
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