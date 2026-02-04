import { defineStore } from 'pinia';

interface FormDataRow {
    id: number,
    label: { text: string }[],
    type: string,
    login: string,
    password: string | null,
}

export const useFormRowsStore = defineStore('formRows', {
    state: () => ({
        selectOptions: [
            'Локальная',
            'LDAP',
        ] as string[],
        formRows: [] as FormDataRow[],
    }),

    getters: {
        rowCount: (state) => state.formRows.length,
        defaultType: (state) => state.selectOptions[0],
    },

    actions: {
        addRow() {
            this.formRows.push({
                id: Date.now(),
                label: [],
                type: this.defaultType!,
                login: '',
                password: null,
            });
        },

        updateRow(row: FormDataRow) {
            console.log(row)
            const index = this.formRows.findIndex(item => item.id === row.id);

            if (index !== -1) {
                this.formRows[index] = row;
            } else {
                console.warn(`Строка с id=${row.id} не найдена в formRows`);
            }
        },

        reset() {
            this.formRows = [];
        },

        loadFromLocalStorage() {
            try {
                const data = localStorage.getItem('formRowsArray');
                if (data) {
                    this.formRows = JSON.parse(data);
                    console.log('[Pinia] Данные загружены из localStorage');
                }
            } catch (error) {
                console.error('[Pinia] Ошибка загрузки из localStorage:', error);
            }
        },

        saveToLocalStorage() {
            try {
                localStorage.setItem('formRowsArray', JSON.stringify(this.formRows));
                console.log('[Pinia] Массив сохранён:');
            } catch (error) {
                console.error('[Pinia] Ошибка сохранения:', error);
            }
        },

        removeRow(login: string) {
            const index = this.formRows.findIndex(row => row.login === login);
            if (index !== -1) {
                this.formRows.splice(index, 1);
                this.saveToLocalStorage();
                console.log(`[Pinia] Запись с login="${login}" удалена`);
            } else {
                console.warn(`[Pinia] Запись с login="${login}" не найдена`);
            }
        },
    },
});