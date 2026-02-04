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
    <transition name="fade" mode="out-in">
      <div v-if="!formRowsStore.formRows.length" key="no-records">
        <div class="text-[1.5rem] py-[50px]">
          Записей не найдено.
        </div>
      </div>
      <div v-else key="records">
        <div class="flex gap-x-[10px] text-left mb-[20px]">
          <div class="w-1/4 pl-[15px]">Метки</div>
          <div class="w-1/4 pl-[15px]">Тип записи</div>
          <div class="w-1/4 pl-[15px]">Логин</div>
          <div class="w-1/4 pl-[15px]">Пароль</div>
          <div class="w-[48px]"></div>
        </div>
        <FormRow
          v-for="(row, idx) in formRowsStore.formRows"
          :key="idx"
          :rowData="row"
          @update="formRowsStore.updateRow(idx, $event)"
          @remove="formRowsStore.removeRow(idx)"
        />
      </div>
    </transition>
  </v-form>
</template>

<style scoped>
.form {
  min-height: 400px;
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
