import { expect } from 'chai';
import * as Mocha from 'mocha';
import { CssClassSerializer } from '../../src/infrastructure/css-class-serializer';

describe('CssClassSerializer', () => {
    describe('serialize', () => {
        it('selector is null', () => {
            let cssClass = {
                name: 'class0',
                styles: 'content: \'value0\''
            };

            let value = CssClassSerializer.instance.serialize(cssClass);

            expect(value).to.equal('.class0 { content: \'value0\' }');
        });

        it('selector is not null', () => {
            let cssClass = {
                name: 'class0',
                selector: 'after',
                styles: 'content: \'value0\''
            };

            let value = CssClassSerializer.instance.serialize(cssClass);

            expect(value).to.equal('.class0: after { content: \'value0\' }');
        });
    });
});