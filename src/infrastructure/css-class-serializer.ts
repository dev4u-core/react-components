import { CssClass } from './common';

export class CssClassSerializer {
    public static readonly instance: CssClassSerializer = new CssClassSerializer();

    private constructor() { }

    public serialize(cssClass: CssClass): string {
        let result = cssClass.selector
            ? `.${cssClass.name}:${cssClass.selector} { ${cssClass.styles} }`
            : `.${cssClass.name} { ${cssClass.styles} }`;

        if (cssClass.media) {
            result = `@media ${cssClass.media} { ${result} }`;
        }

        return result;
    }
}