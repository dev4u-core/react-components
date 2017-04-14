import * as React from 'react';
import { DetailsTableColumn } from './details-table-column';
import { TableColumn, TableColumnProps, TableCellProps } from './table-column';
import { StyleProvider, TableStyle } from '../style-provider';
import { SortDirection } from '../../../src/infrastructure/common';
import { CssClassNameBuilder } from '../../../src/infrastructure/css-class-name-builder';
import { DataSource, DataSourceState } from '../../../src/infrastructure/data-source';

export interface TableProps {
    autoBind?: boolean;
    dataSource: DataSource<any>;
}

export interface TableState {
    expandedDetailRows: any[];
}

export class Table<P extends TableProps, S extends TableState> extends React.Component<P, S> {
    private _columns: TableColumn<any>[];
    private _detailColumn: DetailsTableColumn;
    private _style: TableStyle;

    public constructor(props: P) {
        super(props);

        this.state = { expandedDetailRows: [] } as any;

        this._style = StyleProvider.instance.getGridStyle();
    }

    protected componentWillMount() {
        this.setDataSource(this.props.dataSource);
    }

    protected componentWillUpdate() {
        this._columns = null;
        this._detailColumn = null;
    }

    protected componentWillReceiveProps(nextProps: P) {
        if ((this.props.dataSource != nextProps.dataSource) && (nextProps.dataSource != null)) {
            this.setDataSource(nextProps.dataSource);
        }
    }

    protected setDataSource(dataSource: DataSource<any>) {
        if ((this.props.autoBind != false) && (dataSource.state == DataSourceState.Empty)) {
            dataSource.dataBind();
        }

        if (dataSource) {
            dataSource.onDataBound = dataSource => {
                if (dataSource == this.props.dataSource) {
                    this.forceUpdate();
                }
            };
        }
    }

    protected getCellClassName(column: TableColumn<any>, cellProps: TableCellProps): string {
        return new CssClassNameBuilder()
            .addIf(column.props.cellProps, () => cellProps.className)
            .build();
    }

    protected renderBody(): JSX.Element {
        return (
            <tbody>
                {this.props.dataSource.view
                    ? this.props.dataSource.view.data.map((x, i) =>
                        (this.state.expandedDetailRows.indexOf(x) != -1)
                            ? [this.renderBodyRow(x, i), this.renderDetailsRow(x, i)]
                            : [this.renderBodyRow(x, i)])
                    : null}
            </tbody>
        );
    }

    protected renderBodyCell(column: TableColumn<any>, model: any, columnIndex: number, rowIndex: number): JSX.Element {
        return (
            <td className={this.getCellClassName(column, column.props.body)} key={`${rowIndex}_${columnIndex}`}>
                {column.renderBody(model, rowIndex)}
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

    protected renderDetailsRow(model: any, rowIndex: number): JSX.Element {
        return (
            <tr>
                <td colSpan={this.columns.length}>
                    {this.detailColumn ? this.detailColumn.renderDetailsRow(model, rowIndex) : null}
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

    protected renderHeaderCell(column: TableColumn<any>, columnIndex: number): JSX.Element {
        return (
            <th className={this.getCellClassName(column, column.props.header)} key={columnIndex}>
                {column.renderHeader()}
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

    protected get columns(): TableColumn<TableColumnProps>[] {
        return this._columns = this._columns
            || React.Children.toArray(this.props.children)
                .map(x => new (x as any).type((x as any).props, this))
                .filter(x => x instanceof TableColumn) as any;
    }

    protected get detailColumn(): DetailsTableColumn {
        return this._detailColumn = this._detailColumn
            || (this.columns as any).find(x => x instanceof DetailsTableColumn);
    }

    protected get style(): TableStyle {
        return this._style = this._style || StyleProvider.instance.getGridStyle();
    }
}