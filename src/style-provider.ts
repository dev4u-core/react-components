import { GridStyle } from 'grid';

export interface IStyleProvider {
    getGridStyle(): GridStyle;
}

export class StyleProvider implements IStyleProvider {
    public static readonly Instance: IStyleProvider = new StyleProvider();

    // IStyleProvider Members
    public getGridStyle(): GridStyle {
        return {
            class: null,
            headerRow: {
                class: null,
                cell: {
                    class: null,
                    classBySorting: (direction?: number) => null
                }
            },
            row: {
                class: null,
                cell: {
                    class: null
                }
            }
        };
    }
}