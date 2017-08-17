import { ComparisonExpression, ComparisonOperator, FilterExpression } from './expression';

export class ExpressionConverter {
    public toComparison<T>(expression: FilterExpression): ComparisonExpression<T> {
        switch (expression.operator) {
            case ComparisonOperator.Contain:
                return x => x[expression.field] && (x[expression.field].toString().indexOf(expression.value) != -1);
            case ComparisonOperator.Equal:
                return x => x[expression.field] == expression.value;
        }
    }
}