<template>
  <div class="edit-blog-container app-container">
    <AddOrEditBlog mode="edit" />
  </div>
</template>

<script>
import AddOrEditBlog from '../addOrEditBlog'
export default {
  name: 'EditBlog',
  components: {
   AddOrEditBlog
  }
}
</script>

<style scoped lang="scss"></style>
