import { GridStyle } from '../components/grid';

enum StyleType {
    GridStyle
}

export class StyleProvider {
    private readonly _styles: any = {};

    public static readonly Instance: StyleProvider = new StyleProvider()
        .setGridStyle({
            class: null,
            headerRow: {
                class: null,
                cell: {
                    class: null,
                    classBySorting: {}
                }
            },
            row: {
                class: null,
                cell: {
                    class: null
                }
            }
        });

    public getGridStyle(): GridStyle {
        return this._styles[StyleType.GridStyle];
    }
    public setGridStyle(value: GridStyle): StyleProvider {
        this._styles[StyleType.GridStyle] = value;
        return this;
    }
}