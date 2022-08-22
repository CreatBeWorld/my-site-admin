<template>
  <div class="add-blog-container app-container">
    <AddOrEditBlog mode="add" />
  </div>
</template>

<script>
import AddOrEditBlog from '../addOrEditBlog'
export default {
  name: 'AddBlog',
  components: {
    AddOrEditBlog
  }
}
</script>

<style scoped lang="scss"></style>
