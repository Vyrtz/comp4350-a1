<template>
  <div>
    <h1>Enter tag and click submit.</h1>
    <BInputGroup class="mt-3">
      <BFormInput v-model="tag"></BFormInput>
      <BInputGroupAppend>
        <BButton variant="success" @click="submit()">Submit</BButton>
      </BInputGroupAppend>
    </BInputGroup>
  </div>
</template>

<script>
import StackOverflowService from "@/services/StackOverflowService";
export default {
  name: 'Home',
  data() {
    return {
      tag: ""
    }
  },
  methods: {
    submit() {
      if (this.tag.trim() !== "") {
        StackOverflowService.getQuestions(this.tag.trim()).then(response => {
          console.log(response);
        })
      }
    }
  }
}
</script>
