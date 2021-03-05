<template>
  <BContainer>
    <BInputGroup prepend="Tag:" class="mt-3">
      <BFormInput v-model="tag"></BFormInput>
      <BInputGroupAppend>
        <BButton variant="success" @click="submit()">Submit</BButton>
      </BInputGroupAppend>
    </BInputGroup>
    <div :key="index" v-for="(item, index) in questions">
      <BCard no-body>
        <BCardHeader header-tag="header" class="p-1" role="tab">
          <BButton block v-b-toggle="'accordion-' + index" variant="info">
            {{item.title}}
            <BRow>
              <BCol>
                <BIcon icon="check" />
                {{item.score}}
              </BCol>
              <BCol>
                <BIcon icon="calendar-date" />
                {{item.creation_date}}
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
      questions: []

    }
  },
  methods: {
    submit() {
      this.questions = [];
      if (this.tag.trim() !== "") {
        StackOverflowService.getQuestionsByVotes(this.tag.trim()).then(response => {
          this.questions = response.items;
        });
      }
    }
  }
}
</script>
