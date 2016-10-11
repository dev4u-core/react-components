import * as React from 'react';


//data-source.ts
export declare enum SortDirection {
    Ascending = 1,
    Descending = 2,
}
export interface ISortExpression {
    direction: SortDirection;
    propertyName: string;
}
export interface IDataSource<T> {
    dataBind(): any;
    sort(...expressions: ISortExpression[]): any;
    view: IDataView<T>;
    onDataBound?: (view: IDataView<T>) => void;
}
export interface IDataView<T> {
    data?: T[];
    sortedBy?: ISortExpression[];
}
export declare class ClientDataSource<T> implements IDataSource<T> {
    constructor(data: T[]);
    private getComparer(expressions);
    dataBind(): void;
    sort(...expressions: ISortExpression[]): void;
    readonly view: IDataView<T>;
    onDataBound: (view: IDataView<T>) => void;
}


//grid.ts
export interface IGridColumn {
    propertyName: string;
    title?: string;
}
export interface IGridProps {
    columns: IGridColumn[];
    dataSource?: IDataSource<any>;
}
export declare type GridStyle = {
    class: string;
    headerRow: {
        class: string;
        cell: {
            class: string;
            classBySorting: (direction?: number) => string;
        };
    };
    row: {
        class: string;
        cell: {
            class: string;
        };
    };
};
export declare abstract class GridBase<TProps extends IGridProps> extends React.Component<IGridProps, any> {
    private _style;
    constructor(props: IGridProps);
    protected componentDidMount(): void;
    protected getColumnDirection(column: IGridColumn): SortDirection;
    protected handleSortClick(column: IGridColumn): void;
    protected readonly style: GridStyle;
}
export declare class Grid extends GridBase<IGridProps> {
    protected renderHeaderCell(column: IGridColumn, index: number): JSX.Element;
    protected renderRow(dataItem: any, index: number): JSX.Element;
    protected renderRowCell(dataItem: any, column: IGridColumn, index: number): JSX.Element;
    render(): JSX.Element;
}


//panel-container.ts
export declare enum PanelContainerMode {
    DynamicAndStatic = 1,
    StaticAndDynamic = 2,
}
export declare enum PanelContainerOrientation {
    Horizontal = 1,
    Vertical = 2,
}
export interface IPanelContainerProps {
    dynamicPanels?: IPanelProps[];
    mode?: PanelContainerMode;
    orientation?: PanelContainerOrientation;
    onPanelClosed?: (panel: Panel) => void;
    onPanelClosing?: (panel: Panel) => boolean;
}
export interface IPanelContainerRenderContext {
    defaultColumnCount: number;
    orientation: PanelContainerOrientation;
}
export interface IPanelContainerState {
    dynamicPanels: IPanelProps[];
    staticPanels: IPanelProps[];
}
export declare class PanelContainer extends React.Component<IPanelContainerProps, IPanelContainerState> {
    constructor(props: IPanelContainerProps);
    private getStaticPanels();
    protected handleDynamicPanelClosed(panel: Panel): void;
    protected handlePanelClosing(panel: Panel): boolean;
    protected handleStaticPanelClosed(panel: Panel): void;
    protected renderDynamicPanel(renderContext: IPanelContainerRenderContext, panel: IPanelProps, index: number): JSX.Element;
    protected renderDynamicPanels(renderContext: IPanelContainerRenderContext): JSX.Element[];
    protected renderStaticPanel(renderContext: IPanelContainerRenderContext, panel: IPanelProps, index: number): JSX.Element;
    protected renderStaticPanels(renderContext: IPanelContainerRenderContext): JSX.Element[];
    render(): JSX.Element;
}


//panel.ts
export interface IProps {
    columnCount?: number;
    title?: string;
    onClosed?: (panel: Panel) => void;
    onClosing?: (panel: Panel) => boolean;
}
export declare class Panel extends React.Component<IProps, any> {
    constructor(props: IProps);
    protected handleClose(): void;
    protected renderBody(): any;
    render(): JSX.Element;
}
export { IProps as IPanelProps };


//style-provider.ts
export interface IStyleProvider {
    getGridStyle(): GridStyle;
}
export declare class StyleProvider implements IStyleProvider {
    static Instance: IStyleProvider;
    getGridStyle(): GridStyle;
}