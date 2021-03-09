<template>
  <div>
    <h5 class="pt-2 topLine">Comments:</h5>
    <div class="mb-4">
      <BCard v-for="comment in comments" :key="comment.comment_id" class="mb-1">
        <BCardText v-html="comment.body"></BCardText>
        <BRow class="mt-3">
          <BCol>
            <BIcon icon="check2" />
            Score: {{ comment.score }}
          </BCol>
          <BCol>
            <BIcon icon="calendar" />
            Created: {{ new Date(comment.creation_date*1000).toLocaleDateString('en-US') }}
          </BCol>
        </BRow>
      </BCard>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comments",
  props: {
    comments: {
      type: Array,
      require: true,
    }
  }
}
</script>