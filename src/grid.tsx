import * as React from 'react';
import { DataSource, SortDirection } from '../src/data-source';
import { StyleProvider } from '../src/style-provider';

export interface GridColumnProps {
    className?: string;
    field?: string;
    isSortable?: boolean;
    title?: string;

    onCellDataBinding?: (sender: any, model: any) => JSX.Element | void;
}

export class GridColumn extends React.Component<GridColumnProps, any> {
    public render(): JSX.Element {
        return this.props.children ? React.Children.only(this.props.children) : null;
    }
}

export interface GridProps {
    dataSource?: DataSource<any>;

    onRowDetailsLoading?: (model: any) => JSX.Element | void;
}

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

export abstract class GridBase<TProps extends GridProps> extends React.Component<GridProps, any> {
    private _columns: GridColumn[];
    private _style: GridStyle;

    constructor(props: GridProps) {
        super(props);
    }

    protected componentDidMount() {
        this.props.dataSource.onDataBound = () => this.forceUpdate();
    }
    protected getSortDirection(column: GridColumn): SortDirection {
        let sortedBy = (this.props.dataSource.view.sortedBy != null)
            ? this.props.dataSource.view.sortedBy.filter(x => x.field == column.props.field)
            : null;
        return (sortedBy != null)
                && (sortedBy.length == 1)
                && (sortedBy[0].field == column.props.field)
            ? sortedBy[0].direction
            : null;
    }
    protected handleClickToSort(column: GridColumn) {
        let sortedBy = this.props.dataSource.view.sortedBy;
        let direction = (sortedBy != null)
                && (sortedBy.length == 1)
                && (sortedBy[0].field == column.props.field)
                && (sortedBy[0].direction == SortDirection.Ascending)
            ? SortDirection.Descending
            : SortDirection.Ascending;

        this.props.dataSource.sort({ direction: direction, field: column.props.field });
        this.props.dataSource.dataBind();
    }
    protected renderBodyCell(column: GridColumn, model: any, index: number): JSX.Element {
        let result;
        if (column.props.onCellDataBinding) {
            result = column.props.onCellDataBinding(this, model);
        }
        return result;
    }

    protected get columns(): GridColumn[] {
        return this._columns = this._columns
            || React.Children.toArray(this.props.children).filter(x => (x as any).type == GridColumn) as any;
    }
    protected get style(): GridStyle {
        return this._style = this._style || StyleProvider.Instance.getGridStyle();
    }
}

export class Grid extends GridBase<GridProps> {
    protected renderBody(): JSX.Element {
        return (
            <tbody>
                {this.props.dataSource.view.data.map((x, i) => this.renderBodyRow(x, i))}
            </tbody>
        );
    }
    protected renderBodyCell(column: GridColumn, model: any, index: number): JSX.Element {
        return (
            <td key={index}>{super.renderBodyCell(column, model, index) || model[column.props.field]}</td>
        );
    }
    protected renderBodyRow(model: any, index: number): JSX.Element {
        return (
            <tr key={index}>
                {this.columns.map((x, i) => this.renderBodyCell(x, model, i))}
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
    protected renderHeaderCell(column: GridColumn, index: number): JSX.Element {
        let direction = this.getSortDirection(column); 
        let className = this.style.headerRow.cell.classBySorting[direction];
        return (
            <th className={className} key={index}>
                {(() => (column.props.isSortable != false)
                    ? <a href="javascript:" onClick={() => this.handleClickToSort(column)}>{column.props.title}</a>
                    : column.props.title
                )()}
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
            <table className={this.style.class} width="100%">
                {this.renderHeader()}
                {this.renderBody()}
            </table>
        );
    }
}