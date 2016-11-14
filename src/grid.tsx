import * as React from 'react';
import { DataSource, SortDirection } from '../src/data-source';
import { DetailGridColumn, GridColumnBase  } from '../src/grid-column';
import { StyleProvider } from '../src/style-provider';

export type GridStyle = {
    class: string;
    headerRow: {
        class: string;
        cell: {
            class: string;
            classBySorting: { [direction: number]: string };
        }
    };
    row: {
        class: string;
        cell: {
            class: string;
        }
    };
};

export interface GridBaseProps {
    autoBind?: boolean;
    dataSource?: DataSource<any>;
    style?: GridStyle;
}

export interface GridBaseState {
    expandedDetailRows: any[];
}

export abstract class GridBase<TProps extends GridBaseProps> extends React.Component<GridBaseProps, any> {
    private _columns: GridColumnBase<any>[];
    private _detailColumn: DetailGridColumn;
    private _style: GridStyle;

    constructor(props: GridBaseProps) {
        super(props);
        if (this.props.dataSource) {
            this.props.dataSource.onDataBound = () => this.forceUpdate();
        }
        this.state = { expandedDetailRows: [] };
    }

    protected componentDidUpdate() {
        if (this.props.autoBind && !this.props.dataSource.view) {
            this.props.dataSource.dataBind();
        }
    }
    protected componentWillMount() {
        if (this.props.autoBind && !this.props.dataSource.view) {
            this.props.dataSource.dataBind();
        }
    }
    protected renderDetailRow(model: any, rowIndex: number): JSX.Element {
        return this.detailColumn ? this.detailColumn.renderDetailRow(model, rowIndex) : null;
    }
    protected renderBodyCell(column: GridColumnBase<any>, model: any, columnIndex: number, rowIndex: number): JSX.Element {
        return column.renderBody(model, rowIndex);
    }
    protected renderHeaderCell(column: GridColumnBase<any>, columnIndex: number): JSX.Element {
        return column.renderHeader();
    }

    protected get columns(): GridColumnBase<any>[] {
        return this._columns = this._columns
            || React.Children.toArray(this.props.children)
                .map(x => new (x as any).type((x as any).props, this))
                .filter(x => x instanceof GridColumnBase) as any;
    }
    protected get detailColumn(): DetailGridColumn {
        return this._detailColumn = this._detailColumn
            || (this.columns as any).find(x => x instanceof DetailGridColumn);
    }

    protected get style(): GridStyle {
        return this._style = this._style || this.props.style || StyleProvider.Instance.getGridStyle();
    }
}

export class Grid extends GridBase<GridBaseProps> {
    protected renderBody(): JSX.Element {
        return (
            <tbody>
                {this.props.dataSource.view
                    ? this.props.dataSource.view.data.map((x, i) =>
                        (this.state.expandedDetailRows.indexOf(x) != -1)
                            ? [this.renderBodyRow(x, i), this.renderDetailRow(x, i)]
                            : [this.renderBodyRow(x, i)])
                    : null}
            </tbody>
        );
    }
    protected renderBodyCell(column: GridColumnBase<any>, model: any, columnIndex: number, rowIndex: number): JSX.Element {
        return (
            <td key={`${rowIndex}_${columnIndex}`}>
                {super.renderBodyCell(column, model, columnIndex, rowIndex)}
            </td>
        );
    }
    protected renderBodyRow(model: any, rowIndex: number): JSX.Element {
        return (
            <tr key={rowIndex}>
                {this.columns.map((x, i) => this.renderBodyCell(x, model, i, rowIndex))}
            </tr>
        );
    }
    protected renderDetailRow(model: any, rowIndex: number): JSX.Element {
        return (
            <tr>
                <td colSpan={this.columns.length}>
                    {super.renderDetailRow(model, rowIndex)}
                </td>
            </tr>
        );
    }
    protected renderHeader(): JSX.Element {
        return (
            <thead>
                {this.renderHeaderRow()}
            </thead>
        );
    }
    protected renderHeaderCell(column: GridColumnBase<any>, columnIndex: number): JSX.Element {
        return (
            <th key={columnIndex}>
                {super.renderHeaderCell(column, columnIndex)}
            </th>
        );
    }
    protected renderHeaderRow(): JSX.Element {
        return (
            <tr>
                {this.columns.map((x, i) => this.renderHeaderCell(x, i))}
            </tr>
        );
    }

    public render(): JSX.Element {
        return (
            <table className={this.style.class}>
                {this.renderHeader()}
                {this.renderBody()}
            </table>
        );
    }
}