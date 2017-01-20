import { CssClass } from './common';

export class CssClassSerializer {
    public static readonly instance: CssClassSerializer = new CssClassSerializer();

    private constructor() { }

    public serialize(cssClass: CssClass): string {
        return cssClass.selector
            ? `.${cssClass.name}: ${cssClass.selector} { ${cssClass.styles} }`
            : `.${cssClass.name} { ${cssClass.styles} }`;
    }
}