<template>
  <BContainer>
    <h1 class="text-center">Stack Overflow API Program</h1>
    <BInputGroup prepend="Tag:" class="mt-3 mb-3">
      <BFormInput v-model="tag"></BFormInput>
      <BInputGroupAppend>
        <BButton variant="success" @click="submit()">Submit</BButton>
      </BInputGroupAppend>
    </BInputGroup>

    <Questions :questions="questions"></Questions>

    <h4 v-if="questions.length > 0">Response Time: {{ responseTime }}</h4>
  </BContainer>
</template>

<script>
import StackOverflowService from "@/services/StackOverflowService";
import Questions from "@/components/Questions";

export default {
  name: 'Home',
  components: {
    Questions
  },
  data() {
    return {
      tag: "",
      questionsByVotes: [],
      questionsByDate: [],
      voteTime: 0,
      dateTime: 0,
    }
  },
  methods: {
    submit() {
      if (this.tag.trim() !== "") {
        this.voteTime = Date.now();
        StackOverflowService.getQuestionsByVotes(this.tag.trim()).then(response => {
          this.voteTime = Date.now() - this.voteTime;
          this.questionsByVotes = response.items;
        });

        this.dateTime = Date.now();
        StackOverflowService.getQuestionsByCreationDate(this.tag.trim()).then(response => {
          this.dateTime = Date.now() - this.dateTime;
          this.questionsByDate = response.items;
        });
      } else {
        this.questionsByVotes = [];
        this.questionsByDate = [];
      }
    }
  },
  computed: {
    questions: function() {
      return this.questionsByVotes.concat(this.questionsByDate).sort(function(x, y) {
        return y.creation_date - x.creation_date;
      });
    },
    responseTime: function() {
      return (this.voteTime + this.dateTime) /  1000;
    }
  }
}
</script>

<style>
.topLine {
  border-top: grey 1px solid;
}
</style>
