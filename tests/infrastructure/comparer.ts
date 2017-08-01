import { expect } from 'chai';
import * as Mocha from 'mocha';
import { Comparer } from '../../src/infrastructure/comparer';

describe('Comparer', () => {
    it('compare boolean values', () => {
        [
            { x: true, y: true, result: 0 },
            { x: true, y: false, result: 1 },
            { x: true, y: null, result: 1 },
            { x: false, y: true, result: -1 },
            { x: false, y: false, result: 0 },
            { x: false, y: null, result: 1 },
            { x: null, y: true, result: -1 },
            { x: null, y: false, result: -1 },
            { x: null, y: null, result: 0 }
        ].forEach(testCase => {
            expect(Comparer.Instance.compare(testCase.x, testCase.y)).to.equal(testCase.result, `x: ${testCase.x}, y: ${testCase.y}`);
        });
    });

    it('compare string values', () => {
        [
            { x: 'value0', y: 'value0', result: 0 },
            { x: 'VALUE0', y: 'value0', result: 0 },
            { x: 'value0', y: 'value1', result: -1 },
            { x: 'value1', y: 'value0', result: 1 }
        ].forEach(testCase => {
            expect(Comparer.Instance.compare(testCase.x, testCase.y)).to.equal(testCase.result, `x: ${testCase.x}, y: ${testCase.y}`);
        });
    })
});