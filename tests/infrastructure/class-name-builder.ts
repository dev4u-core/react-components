import { expect } from 'chai';
import * as Mocha from 'mocha';
import { ClassNameBuilder } from '../../src/infrastructure/class-name-builder';

describe('ClassNameBuilder', () => {
    describe('add', () => {
        it('one class', () => {
            let classNameBuilder = new ClassNameBuilder();

            classNameBuilder.add('class0');

            expect(classNameBuilder.build()).to.equal('class0');
        });

        it('two classes', () => {
            let classNameBuilder = new ClassNameBuilder();

            classNameBuilder.add('class0');
            classNameBuilder.add('class1');

            expect(classNameBuilder.build()).to.equal('class0 class1');
        });
    });

    describe('addIf', () => {
        it('condition is true', () => {
            let classNameBuilder = new ClassNameBuilder();

            classNameBuilder.addIf(true, () => 'class0');

            expect(classNameBuilder.build()).to.equal('class0');
        });

        it('condition is false', () => {
            let classNameBuilder = new ClassNameBuilder();

            classNameBuilder.addIf(false, () => 'class0');

            expect(classNameBuilder.build()).to.equal(null);
        });
    });
});