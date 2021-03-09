<template>
  <div>
    <div :key="index" v-for="(item, index) in questions">
      <BCard no-body>
        <BCardHeader header-tag="header" class="p-1">
          <BButton block v-b-toggle="'accordion-' + index" variant="info">
            <BCardText v-html="item.title"></BCardText>
            <BRow class="mt-3">
              <BCol>
                <BIcon icon="check2" />
                <BCardText>Score: {{ item.score }}</BCardText>
              </BCol>
              <BCol>
                <BIcon icon="calendar" />
                <BCardText>Created: {{ new Date(item.creation_date*1000).toLocaleDateString('en-US') }}</BCardText>
              </BCol>
            </BRow>
          </BButton>
        </BCardHeader>
        <BCollapse :id="'accordion-' + index">
          <BCardBody>
            <BCardText v-html="item.body" class="question-body"></BCardText>
            <Comments v-if="item.comments" :comments="item.comments"></Comments>
            <Answers v-if="item.answers" :answers="item.answers"></Answers>
          </BCardBody>
        </BCollapse>
      </BCard>
    </div>
  </div>
</template>

<script>
import Comments from "@/components/Comments";
import Answers from "@/components/Answers";

export default {
  name: "Questions",
  components: {
    Comments,
    Answers,
  },
  props: {
    questions: {
      type: Array,
      require: true
    }
  }
}
</script>

<style>
.question-body > p > a > img {
  width: 100%;
}
</style>