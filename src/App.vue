<script setup lang="ts">
import Form from './components/Form.vue'
import { useFormRowsStore } from '@/stores/formRows';

const formRowsStore = useFormRowsStore();
</script>

<template>
  <div class="flex items-center gap-x-[10px]">
    <h2>Учётные записи</h2>
    <v-btn
      color="primary"
      icon="mdi-plus"
      @click="formRowsStore.addRow()"
    />
  </div>
  <transition name="fade">
    <div
      class="flex items-center gap-x-[10px] px-[16px] py-[8px] mb-[20px] bg-[#333] rounded-[30px]"
      v-if="formRowsStore.formRows.length"
    >
      <v-icon>mdi-help-circle-outline</v-icon>
      <span>Для указания нескольких меток для одной пары логин/пароль используейте разделитель ;</span>
    </div>
  </transition>
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
