<script setup lang="ts">
import FormRow from '@/components/FormRow.vue';
import { useFormRowsStore } from '@/stores/formRows';
import { onMounted } from 'vue';

const formRowsStore = useFormRowsStore();

onMounted(() => {
  formRowsStore.loadFromLocalStorage();
})
</script>

<template>
  <v-form class="form">
    <FormRow
      v-for="(row, idx) in formRowsStore.formRows"
      :key="idx"
      :rowData="row"
      @update="formRowsStore.updateRow(idx, $event)"
      @remove="formRowsStore.removeRow(idx)"
    />
  </v-form>
</template>

<style scoped>

</style>
