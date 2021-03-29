<template>
    <div class="card-container">
        <div class="option-container">
            <input
            type="radio"
            class="radio"
            :value="optionsAvailable.answer"
            v-model="optionPicked"
            :name="optionsName"
            validation="required"
            @change="handleClick"
            />
            {{ optionsAvailable.answer }}
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: "Card",
    emits: ["clickedRadio"],
    props: ['optionsAvailable', 'optionsName'],
    setup(props, context) {
    const optionPicked = ref('');
   
    const handleClick = () => {
        context.emit('clickedRadio', optionPicked )
    }
    return {optionPicked, handleClick}
    }
}
</script>

<style>
.card-container {
    width: 150px;
    height: 150px;
    margin: 0.5em;
    padding: 0.5em;
    background: lightblue;
    border: 0.1em solid black;
}

.card-container:hover {
    background: lightskyblue;
}

.option-container {
  
  padding: 2em;
  margin: 0.1em;

}


.card:hover .radio:disabled {
  border-color: var(--color-gray);
}

</style>