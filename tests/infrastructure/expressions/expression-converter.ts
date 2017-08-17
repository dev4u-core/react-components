import { expect } from 'chai';
import * as Mocha from 'mocha';
import { ComparisonExpression, ComparisonOperator, FilterExpression } from '../../../src/infrastructure/expressions/expression';
import { ExpressionConverter } from '../../../src/infrastructure/expressions/expression-converter';

describe('ExpressionConverter', () => {
    describe('toComparison', () => {
        describe('if operator is "contain"', () => {
            const expressionConverter = new ExpressionConverter();
            const model = { field0: 'xxxyyyzzz' };

            function createFilterExpression(value: any): FilterExpression {
                return {
                    field: 'field0',
                    operator: ComparisonOperator.Contain,
                    value: value
                };
            }

            it ('if result is true and value is start part', () => {
                const filterExpression = createFilterExpression('xxx');

                const comparisonExpression = expressionConverter.toComparison(filterExpression);

                expect(comparisonExpression(model)).equal(true);
            });

            it ('if result is true and value is middle part', () => {
                const filterExpression = createFilterExpression('yyy');

                const comparisonExpression = expressionConverter.toComparison(filterExpression);

                expect(comparisonExpression(model)).equal(true);
            });

            it ('if result is true and value is end part', () => {
                const filterExpression = createFilterExpression('zzz');

                const comparisonExpression = expressionConverter.toComparison(filterExpression);

                expect(comparisonExpression(model)).equal(true);
            });

            it ('if result is false', () => {
                const filterExpression = createFilterExpression('xxxxxxxxx');

                const comparisonExpression = expressionConverter.toComparison(filterExpression);

                expect(comparisonExpression(model)).equal(false);
            });

            it ('if result is false and value is null', () => {
                const filterExpression = createFilterExpression(null);

                const comparisonExpression = expressionConverter.toComparison(filterExpression);

                expect(comparisonExpression(model)).equal(false);
            });
        });

        describe('if operator is "contain" and filed is array', () => {
            const expressionConverter = new ExpressionConverter();
            const model = { fields: [{ field0: 'xxxyyyzzz' }] };

            function createFilterExpression(value: any): FilterExpression {
                return {
                    field: 'fields.field0',
                    operator: ComparisonOperator.Contain,
                    value: value
                };
            }

            it ('if result is true and value is start part', () => {
                const filterExpression = createFilterExpression('xxx');

                const comparisonExpression = expressionConverter.toComparison(filterExpression);

                expect(comparisonExpression(model)).equal(true);
            });

            it ('if result is true and value is middle part', () => {
                const filterExpression = createFilterExpression('yyy');

                const comparisonExpression = expressionConverter.toComparison(filterExpression);

                expect(comparisonExpression(model)).equal(true);
            });

            it ('if result is true and value is end part', () => {
                const filterExpression = createFilterExpression('zzz');

                const comparisonExpression = expressionConverter.toComparison(filterExpression);

                expect(comparisonExpression(model)).equal(true);
            });
        });

        describe('toComparison if operator is "equal"', () => {

        });
    });
});