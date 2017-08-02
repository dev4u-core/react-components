import * as React from 'react';
import { Column, ColumnProps, CellProps } from './column';
import { DetailsColumn } from './details-column';
import { Style } from './style';
import { SortDirection } from '../../../src/infrastructure/common';
import { CssClassNameBuilder } from '../../../src/infrastructure/css-class-name-builder';
import { DataSource, DataSourceState } from '../../../src/infrastructure/data-source';

export interface GridProps {
    autoBind?: boolean;
    dataSource: DataSource<any>;
}

export interface GridState {
    expandedDetailRows: any[];
}

export class Grid<P extends GridProps, S extends GridState> extends React.Component<P, S> {
    private _columns: Column[];
    private _detailColumn: DetailsColumn;
    private _style: Style;

    public constructor(props: P) {
        super(props);

        this.state = { expandedDetailRows: [] } as any;

        this.handleDataBound = this.handleDataBound.bind(this);
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
            if (this.props.dataSource) {
                this.props.dataSource.onDataBound.off(this.handleDataBound);
            }

            this.setDataSource(nextProps.dataSource);
        }
    }

    protected createStyle(): Style {
        return {
            class: '',
            bodyRow: {
                class: '',
                cell: {
                    class: ''
                }
            },
            headerRow: {
                class: '',
                cell: {
                    class: '',
                    classBySortDirection: { },
                    classIfFilter: ''
                }
            }
        };
    }

    protected handleDataBound(dataSource: DataSource<any>) {
        if (dataSource == this.props.dataSource) {
            this.forceUpdate();
        }
    }

    protected setDataSource(dataSource: DataSource<any>) {
        if ((this.props.autoBind != false) && (dataSource.state == DataSourceState.Empty)) {
            dataSource.dataBind();
        }

        if (dataSource) {
            dataSource.onDataBound.on(this.handleDataBound);
        }
    }

    protected getCellClassName(column: Column, cellProps: CellProps): string {
        return new CssClassNameBuilder()
            .addIf(cellProps != null, () => cellProps.className)
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

    protected renderBodyCell(column: Column, model: any, columnIndex: number, rowIndex: number): JSX.Element {
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
                    {this.detailsColumn ? this.detailsColumn.renderDetailsRow(model, rowIndex) : null}
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

    protected renderHeaderCell(column: Column, columnIndex: number): JSX.Element {
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

    protected get columns(): Column[] {
        return this._columns = this._columns
            || React.Children.toArray(this.props.children)
                .map(x => new (x as any).type((x as any).props, this))
                .filter(x => x instanceof Column) as any;
    }

    protected get detailsColumn(): DetailsColumn {
        return this._detailColumn = this._detailColumn
            || (this.columns as any).find(x => x instanceof DetailsColumn);
    }

    protected get style(): Style {
        return this._style = this._style || this.createStyle();
    }
}