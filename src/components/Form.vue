<script setup lang="ts">
import FormRow from '@/components/FormRow.vue';
</script>

<template>
  <form class="form">
    <FormRow v-for="idx in 4" :key="idx" />
  </form>
</template>

<style scoped>

</style>
