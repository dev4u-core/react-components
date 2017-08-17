import { expect } from 'chai';
import * as Mocha from 'mocha';
import { ComparisonExpression, ComparisonOperator, FilterExpression } from '../../../src/infrastructure/expressions/expression';
import { ExpressionConverter } from '../../../src/infrastructure/expressions/expression-converter';

describe('ExpressionConverter', () => {
    describe('toComparison', () => {
        describe('if operator is "contain"', () => {
            const expressionConverter = new ExpressionConverter();
            const model = { field0: 'xxxyyyzzz' };

            it ('if result is true and value is start part', () => {
                const filterExpression = {
                    field: 'field0',
                    operator: ComparisonOperator.Contain,
                    value: 'xxx'
                };

                const comparisonExpression = expressionConverter.toComparison(filterExpression);

                expect(comparisonExpression(model)).equal(true);
            });

            it ('if result is true and value is middle part', () => {
                const filterExpression = {
                    field: 'field0',
                    operator: ComparisonOperator.Contain,
                    value: 'yyy'
                };

                const comparisonExpression = expressionConverter.toComparison(filterExpression);

                expect(comparisonExpression(model)).equal(true);
            });

            it ('if result is true and value is in part', () => {
                const filterExpression = {
                    field: 'field0',
                    operator: ComparisonOperator.Contain,
                    value: 'zzz'
                };

                const comparisonExpression = expressionConverter.toComparison(filterExpression);

                expect(comparisonExpression(model)).equal(true);
            });

            it ('if result is false', () => {
                const filterExpression = {
                    field: 'field0',
                    operator: ComparisonOperator.Contain,
                    value: 'xxxxxxxxx'
                };

                const comparisonExpression = expressionConverter.toComparison(filterExpression);

                expect(comparisonExpression(model)).equal(false);
            });

            it ('if result is false and value is null', () => {
                const filterExpression = {
                    field: 'field0',
                    operator: ComparisonOperator.Contain,
                    value: null
                };

                const comparisonExpression = expressionConverter.toComparison(filterExpression);

                expect(comparisonExpression(model)).equal(false);
            });
        });

        describe('toComparison if operator is "equal"', () => {

        });
    });
});