import { expect } from 'chai';
import * as Mocha from 'mocha';
import { ClassNameGenerator } from '../../src/infrastructure/class-name-generator';

describe('ClassNameGenerator', () => {
    describe('generate', () => {
        it('result is different', () => {
            let className0 = ClassNameGenerator.instance.generate();
            let className1 = ClassNameGenerator.instance.generate();

            expect(className0).is.not.null;
            expect(className1).is.not.null;
            expect(className0).to.not.equal(className1);
        });
    });

    describe('generateByKey', () => {
        it('result is the same', () => {
            let className0 = ClassNameGenerator.instance.generateByKey('0');
            let className1 = ClassNameGenerator.instance.generateByKey('0');

            expect(className0).is.not.null;
            expect(className1).is.not.null;
            expect(className0).to.equal(className1);
        });
    });
});