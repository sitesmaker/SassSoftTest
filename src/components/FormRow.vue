<script setup lang="ts">
import { reactive, computed } from 'vue';

interface FormDataRow {
  label: { text: string }[],
  type: string,
  login: string,
  password: string | null,
}

const selectOptions:string[] = [
  'Локальная',
  'LDAP',
];

const formData = reactive<FormDataRow>({
  label: [],
  type: selectOptions[0] as string,
  login: '',
  password: null,
});

const parseLabel = (value: string): { text: string }[] => {
  if (!value?.trim()) return [];
  
  return value.trim()
    .split(/\s*;\s*/)
    .map(item => item.trim())
    .filter(item => item.length > 0)
    .map(item => ({ text: item }));
};

const labelDisplay = computed({
  get: () => formData.label.map(item => item.text).join('; '),
  set: (newValue: string) => {
    formData.label = parseLabel(newValue);
  }
});

const changeLabel = (newValue: string) => {
  formData.label = parseLabel(newValue);
};
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
            :items="selectOptions"
        />
        <v-text-field
            v-model="formData.login"
            label="Логин"
        />
        <v-text-field
            v-if="formData.type == 'Локальная'"
            v-model="formData.password"
            label="Пароль"
            type="password"
        />
    </div>
</template>