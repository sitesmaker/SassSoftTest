<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { FormDataRow } from '@/types/FormDataRow';
import { useFormRowsStore } from '@/stores/formRows';

const formRowsStore = useFormRowsStore();

const props = defineProps<{
  index: number,
  rowData: FormDataRow,
}>();

const formData = ref<FormDataRow>({ ...props.rowData });

const parseLabel = (value: string): { text: string }[] => {
  if (!value?.trim()) return [];
  
  return value.trim()
    .split(/\s*;\s*/)
    .map(item => item.trim())
    .filter(item => item.length > 0)
    .map(item => ({ text: item }));
};

const labelDisplay = computed({
  get: () => formData.value.label.map(item => item.text).join('; '),
  set: (newValue: string) => {
    formData.value.label = parseLabel(newValue);
  }
});

const changeLabel = (newValue: string) => {
  formData.value.label = parseLabel(newValue);
};

const isLocal = computed(():boolean => {
  return formData.value.type == formRowsStore.defaultType
})

const loginRules = computed(() => [
  (v: string) => !!v || 'Логин обязателен',
  (v: string) => v.length >= 3 || 'Минимум 3 символа',
  (v: string) => v.length <= 50 || 'Максимум 50 символов',
]);

const passwordRules = computed(() => {
  if (!isLocal.value) return [];
  return [
    (v: string) => !!v || 'Пароль обязателен',
    (v: string) => v.length >= 8 || 'Минимум 8 символов',
    (v: string) => v.length <= 100 || 'Максимум 50 символов',
  ];
});

const isLoginValid = computed(() => {
  const value = formData.value.login;
  return loginRules.value.every(rule => rule(value) === true);
});

const isPasswordValid = computed(() => {
  if (!isLocal.value) return true;
  const value = formData.value.password;
  return passwordRules.value.every(rule => rule(value) === true);
});

const isFormValid = computed(() => isLoginValid.value && isPasswordValid.value);

watch(
  () => [formData.value.label, formData.value.type, isFormValid.value],
  ([, , isValid]) => {
    if (isValid && !isLocal.value) {
      formData.value.password = null;
      formRowsStore.updateRow(formData.value);
      formRowsStore.saveToLocalStorage();
    } else if(isValid) {
      formRowsStore.updateRow(formData.value);
      formRowsStore.saveToLocalStorage();
    }
})
</script>

<template>
    <div class="flex form__row">
        <v-text-field
            @input="labelDisplay"
            @update:modelValue="changeLabel"
            label="Метка (разделяйте ;)"
        />
        <v-select
            v-model="formData.type"
            label="Select"
            :items="formRowsStore.selectOptions"
        />
        <v-text-field
            v-model="formData.login"
            label="Логин"
            :rules="loginRules"
            required
        />
        <v-text-field
            v-if="isLocal"
            v-model="formData.password"
            label="Пароль"
            type="password"
            :rules="passwordRules"
            required
        />
        <button @click.prevent="formRowsStore.removeRow(formData.login)">delete</button>
    </div>
</template>