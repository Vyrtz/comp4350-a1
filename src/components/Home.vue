<template>
  <BContainer>
    <h1 class="text-center">Stack Overflow API Program</h1>
    <BInputGroup prepend="Tag:" class="mt-3 mb-3">
      <BFormInput v-model="tag"></BFormInput>
      <BInputGroupAppend>
        <BButton variant="success" @click="submit()">Submit</BButton>
      </BInputGroupAppend>
    </BInputGroup>
    <div :key="index" v-for="(item, index) in questions">
      <BCard no-body>
        <BCardHeader header-tag="header" class="p-1">
          <BButton block v-b-toggle="'accordion-' + index" variant="info">
            <BCardText>{{ item.title }}</BCardText>
            <BRow class="mt-3">
              <BCol>
                <BIcon icon="check2" />
                <BCardText>Score: {{ item.score }}</BCardText>
              </BCol>
              <BCol>
                <BIcon icon="calendar" />
                <BCardText>{{ toDate(item.creation_date) }}</BCardText>
              </BCol>
            </BRow>
          </BButton>
        </BCardHeader>
        <BCollapse :id="'accordion-' + index">
          <BCardBody>
            <BCardText v-html="item.body" class="question-body"></BCardText>
            <div v-if="item.comments">
              <h5 class="pt-2 topLine">Comments:</h5>
              <div class="mb-4">
                <BCard v-for="comment in item.comments" :key="comment.comment_id" class="mb-1">
                  <BCardText v-html="comment.body"></BCardText>
                  <BRow class="mt-3">
                    <BCol>
                      <BIcon icon="check2" />
                      Score: {{ comment.score }}
                    </BCol>
                    <BCol>
                      <BIcon icon="calendar" />
                      {{ toDate(comment.creation_date) }}
                    </BCol>
                  </BRow>
                </BCard>
              </div>
            </div>
            <div v-if="item.answers">
              <h5 class="pt-2 topLine">Answers:</h5>
              <div class="mb-4">
                <BCard v-for="answer in item.answers" :key="answer.answer_id" class="mb-1">
                  <BCardText v-html="answer.body"></BCardText>
                  <BRow class="mt-3">
                    <BCol>
                      <BIcon icon="check2" />
                      Score: {{ answer.score }}
                    </BCol>
                    <BCol>
                      <BIcon icon="calendar" />
                      {{ toDate(answer.creation_date) }}
                    </BCol>
                  </BRow>
                </BCard>
              </div>
            </div>
          </BCardBody>
        </BCollapse>
      </BCard>
    </div>
  </BContainer>
</template>

<script>
import StackOverflowService from "@/services/StackOverflowService";
export default {
  name: 'Home',
  data() {
    return {
      tag: "",
      questionsByVotes: [],
      questionsByDate: [],
    }
  },
  methods: {
    submit() {
      // TODO: Do validation for if the entry is already in there?
      if (this.tag.trim() !== "") {
        StackOverflowService.getQuestionsByVotes(this.tag.trim()).then(response => {
          this.questionsByVotes = response.items;
        });

        StackOverflowService.getQuestionsByCreationDate(this.tag.trim()).then(response => {
          this.questionsByDate = response.items;
        });
      } else {
        this.questionsByVotes = [];
        this.questionsByDate = [];
      }
    },
    toDate(date) {
      return new Date(date*1000).toLocaleDateString('en-US');
    }
  },
  computed: {
    questions: function() {
      return this.questionsByVotes.concat(this.questionsByDate).sort(function(x, y) {
        return y.creation_date - x.creation_date;
      });
    }
  }
}
</script>

<style>
.topLine {
  border-top: grey 1px solid;
}

.question-body > p > a > img {
  width: 100%;
}
</style>
