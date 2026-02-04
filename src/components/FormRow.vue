<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { FormDataRow } from '@/types/FormDataRow';
import { useFormRowsStore } from '@/stores/formRows';

const formRowsStore = useFormRowsStore();

const props = defineProps<{
  index: number,
  rowData: FormDataRow,
}>();

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

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
    <div class="form__row flex gap-x-[10px]">
        <v-text-field
          class="w-1/4"
          variant="outlined"
          color="primary"
          @input="labelDisplay"
          @update:modelValue="changeLabel"
        />
        <v-select
          class="w-1/4"
          v-model="formData.type"
          variant="outlined"
          color="primary"
          :items="formRowsStore.selectOptions"
        />
        <v-text-field
          :class="[isLocal ? 'w-1/4' : 'w-2/4']"
          v-model="formData.login"
          :rules="loginRules"
          required
          variant="outlined"
          color="primary"
        />
        <v-text-field
            v-if="isLocal"
            class="w-1/4"
            v-model="formData.password"
            :type="isPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="togglePasswordVisibility"
            :rules="passwordRules"
            required
            variant="outlined"
            color="primary"
        />
        <v-btn
          class="w-[48px]"
          color="error"
          icon="mdi-delete"
          @click.prevent="formRowsStore.removeRow(formData.login)"
        />
    </div>
</template>

<style lang="scss">
.form__row {
  transition: all ease-in-out .5s;
}
</style>