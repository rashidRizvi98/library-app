
export enum InputType {
    TEXT = 'TEXT',
    DROPDOWN = 'DROPDOWN'
}

export interface FormField {
    key: string;
    label: string;
    type: InputType;
    options?: Array<any>;
    defaultValue?: string;
}