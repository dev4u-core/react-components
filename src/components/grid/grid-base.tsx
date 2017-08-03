import * as React from 'react';
import { GridColumn, GridColumnProps, GridCellProps } from './grid-column';
import { GridDetailsColumn } from './grid-details-column';
import { GridStyle, GridRowStyle } from './grid-style';
import { Style } from '../common';
import { SortDirection } from '../../../src/infrastructure/common';
import { CssClassNameBuilder } from '../../../src/infrastructure/css-class-name-builder';
import { DataSource, DataSourceState } from '../../../src/infrastructure/data-source';

export interface GridProps {
    autoBind?: boolean;
    dataSource: DataSource<any>;
}

export enum GridRowType {
    Header,
    Data,
    Details,
    Empty
}

export interface GridState {
    expandedDetails: any[];
}

export abstract class Grid<P extends GridProps, S extends GridState> extends React.Component<P, S> {
    private _columns: GridColumn[];
    private _detailColumn: GridDetailsColumn;
    private _style: GridStyle;

    public constructor(props: P) {
        super(props);

        this.state = { expandedDetails: [] } as any;

        this.handleDataBound = this.handleDataBound.bind(this);
    }

    private getBodyRowStyle(rowType: GridRowType): GridRowStyle<Style> {
        switch (rowType) {
            case GridRowType.Data:
                return this.style.dataBodyRow;
            case GridRowType.Details:
                return this.style.detailsBodyRow;
            case GridRowType.Empty:
                return this.style.headerRow;
            case GridRowType.Header:
                return this.style.emptyBodyRow;
        }
    }

    protected abstract createStyle(): GridStyle;

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

    protected renderHeader(): JSX.Element {
        return (
            <thead>
                {this.renderRow(GridRowType.Header, null, 0)}
            </thead>
        );
    }

    protected renderBody(): JSX.Element {
        const data = (this.props.dataSource.state == DataSourceState.Bound) ? this.props.dataSource.view.data : null;

        return (
            <tbody>
                {(() => {
                    switch (this.props.dataSource.state) {
                        case DataSourceState.Empty:
                        case DataSourceState.Binding:
                            return this.renderRow(GridRowType.Empty, null, 1);
                        case DataSourceState.Bound:
                            return (data.length > 0)
                                ? data.map((x, i) =>
                                    (this.state.expandedDetails.indexOf(x) != -1)
                                        ? [this.renderRow(GridRowType.Data, x, i), this.renderRow(GridRowType.Details, x, i)]
                                        : [this.renderRow(GridRowType.Data, x, i)]) as any
                                : this.renderRow(GridRowType.Empty, null, 1);
                    }
                })()}
            </tbody>
        );
    }

    protected renderCell(rowType: GridRowType, column: GridColumn, model: any, columnIndex: number, rowIndex: number): JSX.Element {
        const rowStyle = this.getBodyRowStyle(rowType);
        const className = ((rowStyle != null) && (rowStyle.cell != null)) ? rowStyle.cell.className : '';
        const key = `${rowIndex}_${columnIndex}`;

        switch (rowType) {
            case GridRowType.Header:
                return (
                    <th className={className} key={key}>
                        {column.renderHeader()}
                    </th>
                );
            case GridRowType.Data:
                return (
                    <td className={className} key={key}>
                        {column.renderBody(model, rowIndex)}
                    </td>
                );
            case GridRowType.Details:
                return (column instanceof GridDetailsColumn)
                    ? (
                        <td className={className} colSpan={this.columns.length} key={key}>
                            {column.renderBody(model, rowIndex)}
                        </td>
                    )
                    : null;
            case GridRowType.Empty:
                return (
                    <td className={className} colSpan={this.columns.length} key={key}>
                    </td>
                );
        }
    }

    protected renderRow(rowType: GridRowType, model: any, index: number): JSX.Element {
        const rowStyle = this.getBodyRowStyle(rowType);
        const className = (rowStyle != null) ? rowStyle.className : '';

        return (
            <tr className={className} key={index}>
                {this.columns.map((x, i) => this.renderCell(rowType, x, model, i, index)).filter(x => x != null)}
            </tr>
        );
    }

    public componentWillMount() {
        this.setDataSource(this.props.dataSource);
    }

    public componentWillUpdate() {
        this._columns = null;
        this._detailColumn = null;
    }

    public componentWillReceiveProps(nextProps: P) {
        if ((this.props.dataSource != nextProps.dataSource) && (nextProps.dataSource != null)) {
            if (this.props.dataSource) {
                this.props.dataSource.onDataBound.off(this.handleDataBound);
            }

            this.setDataSource(nextProps.dataSource);
        }
    }

    public render(): JSX.Element {
        const className = this.style.className || '';

        return (
            <table className={className}>
                {this.renderHeader()}
                {this.renderBody()}
            </table>
        );
    }

    protected get columns(): GridColumn[] {
        return this._columns = this._columns
            || React.Children.toArray(this.props.children)
                .map(x => new (x as any).type((x as any).props, this))
                .filter(x => x instanceof GridColumn) as any;
    }

    protected get style(): GridStyle {
        return this._style = this._style || this.createStyle();
    }
}