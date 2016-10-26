import * as React from 'react';
import { DataSource, SortDirection } from '../src/data-source';
import { StyleProvider } from '../src/style-provider';

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
        }
    };
    row: {
        class: string;
        cell: {
            class: string;
        }
    };
};

export abstract class GridBase<TProps extends GridProps> extends React.Component<GridProps, any> {
    private _style: GridStyle;

    constructor(props: GridProps) {
        super(props);
    }

    protected componentDidMount() {
        this.props.dataSource.onDataBound = () => this.forceUpdate();
    }
    protected getColumnDirection(column: GridColumn) {
        let sortedBy = (this.props.dataSource.view.sortedBy != null)
            ? this.props.dataSource.view.sortedBy.filter(x => x.propertyName == column.propertyName)
            : null;
        return (sortedBy != null)
                && (sortedBy.length == 1)
                && (sortedBy[0].propertyName == column.propertyName)
            ? sortedBy[0].direction
            : null;
    }
    protected handleSortClick(column: GridColumn) {
        let sortedBy = this.props.dataSource.view.sortedBy;
        let direction = (sortedBy != null)
                && (sortedBy.length == 1)
                && (sortedBy[0].propertyName == column.propertyName)
                && (sortedBy[0].direction == SortDirection.Ascending)
            ? SortDirection.Descending
            : SortDirection.Ascending;

        this.props.dataSource.sort({ direction: direction, propertyName: column.propertyName });
        this.props.dataSource.dataBind();
    }

    protected get style(): GridStyle {
        return this._style = this._style || StyleProvider.Instance.getGridStyle();
    }
} 

export class Grid extends GridBase<GridProps> {
    protected renderHeaderCell(column: GridColumn, index: number): JSX.Element {
        let direction = this.getColumnDirection(column); 
        let className = this.style.headerRow.cell.classBySorting[direction];
        return (
            <th key={"grid-header-cell-" + index}>
                {column.title}<a className={className} onClick={() => this.handleSortClick(column)} />
            </th>
        );
    }
    protected renderRow(dataItem: any, index: number): JSX.Element {
        return (
            <tr key={"grid-row-" + index}>
                {this.props.columns.map((x, i) => this.renderRowCell(dataItem, x, i))}
            </tr>
        );
    }
    protected renderRowCell(dataItem: any, column: GridColumn, index: number): JSX.Element {
        return (
            <td key={"grid-cell-" + index}>{dataItem[column.propertyName]}</td>
        );
    }

    public render(): JSX.Element {
        return (
            <table cellSpacing="0" className={this.style.class} width="100%">
                <tbody>
                    <tr>
                        {this.props.columns.map((x, i) => this.renderHeaderCell(x, i))}
                    </tr>
                    {this.props.dataSource.view.data.map((x, i) => this.renderRow(x, i))}
                </tbody>
            </table>
        );
    }
}