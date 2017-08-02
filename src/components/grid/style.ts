export type Style = {
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