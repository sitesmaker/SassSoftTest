<script setup lang="ts">
import Form from './components/Form.vue'
import { useFormRowsStore } from '@/stores/formRows';

const formRowsStore = useFormRowsStore();
</script>

<template>
  <div class="flex items-center gap-x-[10px]">
    <h2>Учётные записи</h2>
    <v-btn
      icon="mdi-plus"
      @click="formRowsStore.addRow()"
      />
  </div>
  <Form />
</template>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.text {
  box-shadow: 0 0 10px #333;
}
</style>
