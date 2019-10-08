<template>
  <div class="container mx-auto">
    <div class="flex flex-col">
      <div class="flex-row w-1/1 text-center p-2">
        Title of the campaign
      </div>
      <div class="flex flex-col md:flex-row ">
        <div class="sm:w-1/1 md:w-3/5 p-2">
          <player :source="source"
                  :type="type" />
        </div>
        <div class="sm:w-1/1 md:w-2/5 p-2">
          <Input v-for="question in questions"
                 :id="question.id"
                 :key="question.id"
                 v-model="question.value"
                 :label="question.label"
                 :placeholder="question.placeholder" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Player from '~/components/Player';
import Input from '~/components/form/Input';

export default {
  name: 'WatchPage',
  middleware: 'auth',
  components: { Player, Input },
  data: () => {
    return {
      source: 'https://venovum.dev/media/4dfb5192-7440-4bdc-8a8c-d3269eff07da/de/140/mp4',
      type: 'video/mp4',
      questions: [{
        id: 'q1',
        type: 'input',
        label: 'Question 1',
        placeholder: 'Type something here',
        required: true,
        value: '',
      }, {
        id: 'q2',
        type: 'input',
        label: 'Question 2',
        placeholder: 'Type something here',
        required: true,
        value: '',
      }, {
        id: 'q3',
        type: 'input',
        label: 'Question 3',
        placeholder: 'Type something here',
        required: true,
        value: '',
      }],
    };
  },
};
</script>
