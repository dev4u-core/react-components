import { ComparisonExpression, ComparisonOperator, FilterExpression } from './expression';
import { DefaultFieldAccessor, FieldAccessor } from '../field-accessor';

export class ExpressionConverter {
    private _fieldAccessor: FieldAccessor = new DefaultFieldAccessor();

    public toComparison<T>(expression: FilterExpression): ComparisonExpression<T> {
        switch (expression.operator) {
            case ComparisonOperator.Contain:
                return model => {
                    let result = false;
                    const comparer = x => x && x.toString().indexOf(expression.value) != -1;
                    const value = this._fieldAccessor.getValue(model, expression.field);

                    if (value instanceof Array) {
                        result = value.some(x => comparer(x));
                    } else {
                        result = comparer(value)
                    }

                    return result;
                };
            case ComparisonOperator.Equal:
                return x => x[expression.field] == expression.value;
        }
    }
}