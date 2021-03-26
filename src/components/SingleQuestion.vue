<template>
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
</template>