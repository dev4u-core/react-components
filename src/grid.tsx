import * as React from 'react';
import { IDataSource, SortDirection } from '../src/data-source';
import { StyleProvider } from '../src/style-provider';

interface IColumn {
    propertyName: string;
    title?: string;
}

interface IProps {
    columns: IColumn[];
    dataSource?: IDataSource<any>;
}

type Style = {
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

abstract class GridBase<TProps extends IProps> extends React.Component<IProps, any> {
    private _style: Style;

    constructor(props: IProps) {
        super(props);
    }

    protected componentDidMount() {
        this.props.dataSource.onDataBound = () => this.forceUpdate();
    }
    protected getColumnDirection(column: IColumn) {
        let sortedBy = (this.props.dataSource.view.sortedBy != null)
            ? this.props.dataSource.view.sortedBy.filter(x => x.propertyName == column.propertyName)
            : null;
        return (sortedBy != null)
                && (sortedBy.length == 1)
                && (sortedBy[0].propertyName == column.propertyName)
            ? sortedBy[0].direction
            : null;
    }
    protected handleSortClick(column: IColumn) {
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

    protected get style(): Style {
        return this._style = this._style || StyleProvider.Instance.getGridStyle();
    }
} 

class Grid extends GridBase<IProps> {
    protected renderHeaderCell(column: IColumn, index: number): JSX.Element {
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
    protected renderRowCell(dataItem: any, column: IColumn, index: number): JSX.Element {
        return (
            <td key={"grid-cell-" + index}>{dataItem[column.propertyName]}</td>
        );
    }

    public render(): JSX.Element {
        return (
            <table cellspacing="0" className={this.style.class} width="100%">
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

export {
    IColumn as IGridColumn,
    IProps as IGridProps,
    Grid,
    GridBase,
    Style as GridStyle
}