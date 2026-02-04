export interface FormDataRow {
	id: number,
	label: { text: string }[];
	type: string;
	login: string;
	password: string | null;
}