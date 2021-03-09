<template>
  <div>
    <h5 class="pt-2 topLine">Answers:</h5>
    <div class="mb-4">
      <BCard v-for="answer in answers" :key="answer.answer_id" class="mb-1">
        <BCardText v-html="answer.body"></BCardText>
        <BRow class="mt-3">
          <BCol>
            <BIcon icon="check2" />
            Score: {{ answer.score }}
          </BCol>
          <BCol class="mb-2">
            <BIcon icon="calendar" />
            Created: {{ new Date(answer.creation_date*1000).toLocaleDateString('en-US') }}
          </BCol>
        </BRow>
        <Comments v-if="answer.comments" :comments="answer.comments"></Comments>
      </BCard>
    </div>
  </div>
</template>

<script>
import Comments from "@/components/Comments";
export default {
  name: "Answers",
  components: {
    Comments
  },
  props: {
    answers: {
      type: Array,
      require: true,
    }
  }
}
</script>