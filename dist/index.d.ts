import * as React from 'react';

declare module 'dev4u.react-components' {
    //data-source.ts
    export enum SortDirection {
        Ascending = 1,
        Descending = 2,
    }
    export interface SortExpression {
        direction: SortDirection;
        propertyName: string;
    }
    export interface DataSource<T> {
        dataBind(): any;
        sort(...expressions: SortExpression[]): any;
        view: DataView<T>;
        onDataBound?: (view: DataView<T>) => void;
    }
    export interface DataView<T> {
        data?: T[];
        sortedBy?: SortExpression[];
    }
    export class ClientDataSource<T> implements DataSource<T> {
        constructor(data: T[]);
        private getComparer(expressions);
        dataBind(): void;
        sort(...expressions: SortExpression[]): void;
        readonly view: DataView<T>;
        onDataBound: (view: DataView<T>) => void;
    }


    //grid.ts
    export interface GridColumn {
        propertyName: string;
        title?: string;
    }
    export interface GridProps {
        columns: GridColumn[];
        dataSource?: DataSource<any>;
    }
    export type GridStyle = {
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
    export abstract class GridBase<TProps extends GridProps> extends React.Component<GridProps, any> {
        constructor(props: GridProps);
        protected componentDidMount(): void;
        protected getColumnDirection(column: GridColumn): SortDirection;
        protected handleSortClick(column: GridColumn): void;
        protected readonly style: GridStyle;
    }
    export class Grid extends GridBase<GridProps> {
        protected renderHeaderCell(column: GridColumn, index: number): JSX.Element;
        protected renderRow(dataItem: any, index: number): JSX.Element;
        protected renderRowCell(dataItem: any, column: GridColumn, index: number): JSX.Element;
        render(): JSX.Element;
    }


    //panel-container.ts
    export enum PanelContainerMode {
        DynamicAndStatic = 1,
        StaticAndDynamic = 2,
    }
    export enum PanelContainerOrientation {
        Horizontal = 1,
        Vertical = 2,
    }
    export interface PanelContainerProps {
        dynamicPanels?: PanelProps[];
        mode?: PanelContainerMode;
        orientation?: PanelContainerOrientation;
        onPanelClosed?: (panel: Panel) => void;
        onPanelClosing?: (panel: Panel) => boolean;
    }
    export interface PanelContainerRenderContext {
        defaultColumnCount: number;
        orientation: PanelContainerOrientation;
    }
    export interface PanelContainerState {
        dynamicPanels: PanelProps[];
        staticPanels: PanelProps[];
    }
    export class PanelContainer extends React.Component<PanelContainerProps, PanelContainerState> {
        constructor(props: PanelContainerProps);
        private getStaticPanels();
        protected handleDynamicPanelClosed(panel: Panel): void;
        protected handlePanelClosing(panel: Panel): boolean;
        protected handleStaticPanelClosed(panel: Panel): void;
        protected renderDynamicPanel(renderContext: PanelContainerRenderContext, panel: PanelProps, index: number): JSX.Element;
        protected renderDynamicPanels(renderContext: PanelContainerRenderContext): JSX.Element[];
        protected renderStaticPanel(renderContext: PanelContainerRenderContext, panel: PanelProps, index: number): JSX.Element;
        protected renderStaticPanels(renderContext: PanelContainerRenderContext): JSX.Element[];
        render(): JSX.Element;
    }


    //panel.ts
    export interface PanelProps {
        columnCount?: number;
        title?: string;
        onClosed?: (panel: Panel) => void;
        onClosing?: (panel: Panel) => boolean;
    }
    export class Panel extends React.Component<PanelProps, any> {
        constructor(props: PanelProps);
        protected handleClose(): void;
        protected renderBody(): any;
        render(): JSX.Element;
    }


    //style-provider.ts
    export class StyleProvider {
        static readonly Instance: StyleProvider;
        getGridStyle(): GridStyle;
        setGridStyle(value: GridStyle): StyleProvider;
    }
}