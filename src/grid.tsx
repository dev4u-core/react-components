import { IDataSource, SortDirection } from '../src/data-source';
import * as React from 'react';

interface IColumn {
    propertyName: string;
    title?: string;
}

interface IProps {
    columns: IColumn[];
    dataSource?: IDataSource<any>;
}

export class Grid extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        props.dataSource.onDataBound = () => this.forceUpdate();
    }

    protected getClassBySortDirection(value: SortDirection): string {
        switch (value) {
            case SortDirection.Ascending: return 'glyphicon-sort-by-attributes'
            case SortDirection.Descending: return 'glyphicon-sort-by-attributes-alt';
            default: return 'glyphicon-sort';
        }
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
    protected renderHeaderCell(column: IColumn, index: number): JSX.Element {
        let sortedBy = (this.props.dataSource.view.sortedBy != null)
            ? this.props.dataSource.view.sortedBy.filter(x => x.propertyName == column.propertyName)
            : null;
        let direction = (sortedBy != null)
                && (sortedBy.length == 1)
                && (sortedBy[0].propertyName == column.propertyName)
            ? sortedBy[0].direction
            : null;
        let directionClass = this.getClassBySortDirection(direction);
        let className = `btn btn-xs glyphicon ${directionClass} pull-right`;
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
            <table cellspacing="0" className="table table-bordered table-striped" width="100%">
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