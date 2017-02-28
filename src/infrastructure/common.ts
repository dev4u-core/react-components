export interface CssClass {
    media?: string;
    name: string;
    selector?: string;
    styles?: string;
}

export enum DataType {
    Date,
    Enum,
    String,
    Number
}