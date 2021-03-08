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
        <BCardHeader header-tag="header" class="p-1" role="tab">
          <BButton block v-b-toggle="'accordion-' + index" variant="info">
            <span>{{ item.title }}</span>
            <BRow class="mt-3">
              <BCol>
                <BIcon icon="check2" />
                {{ item.score }}
              </BCol>
              <BCol>
                <BIcon icon="calendar" />
                {{ toDate(item.creation_date) }}
              </BCol>
            </BRow>
          </BButton>
        </BCardHeader>
        <BCollapse :id="'accordion-' + index" accordion="my-accordion" role="tabpanel">
          <BCardBody>
            <!-- TODO: Insert body information here -->
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
        })
      } else {
        this.questionsByVotes = [];
        this.questionsByDate = [];
      }
    },
    toDate(date) {
      // TODO: Timezone?
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
