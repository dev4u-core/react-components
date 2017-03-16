export interface FieldAccessor {
    getValue(model: any, compositeField: string): any;
}

export class DefaultFieldAccessor {
    private static readonly Separator: string = '.';

    public getValue(model: any, compositeField: string): any {
        const fields = compositeField.split(DefaultFieldAccessor.Separator);
        let result = model;

        for (let i = 0; i < fields.length; i++) {
            result = result[fields[i]];
            if (!result) break;
        }

        return result;
    }
}