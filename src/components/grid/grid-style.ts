import { Style } from '../common';

export interface GridRowStyle<TCell extends Style> extends Style {
    cell?: TCell;
}

export interface GridBodyRowStyle extends GridRowStyle<Style> {
    cell?: GridBodyRowStyle;
};

export interface GridHeaderCellStyle extends Style {
    classBySortDirection?: { [direction: number]: string };
    classIfFilter?: string;
}

export interface GridHeaderRowStyle extends GridRowStyle<GridHeaderCellStyle> { };

export interface GridStyle {
    dataBodyRow?: GridBodyRowStyle;
    className?: string;
    detailsBodyRow?: GridBodyRowStyle;
    emptyBodyRow?: GridBodyRowStyle;
    headerRow?: GridHeaderRowStyle;
    loadingBodyRow?: GridBodyRowStyle;
};