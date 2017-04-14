export type TableStyle = {
    class: string;
    bodyRow: {
        class: string;
        cell: {
            class: string;
        };
    };
    headerRow: {
        class: string;
        cell: {
            class: string;
            classBySortDirection: { [direction: number]: string };
            classIfFilter: string;
        };
    };
};

export class StyleProvider {
    public static instance: StyleProvider = new StyleProvider();

    public getGridStyle(): TableStyle {
        return {
            class: '',
            bodyRow: {
                class: '',
                cell: {
                    class: ''
                }
            },
            headerRow: {
                class: '',
                cell: {
                    class: '',
                    classBySortDirection: { },
                    classIfFilter: ''
                }
            }
        };
    }
}