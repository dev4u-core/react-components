import * as React from 'react';
import { DetailGridColumn, GridColumnBase, GridColumnBaseProps, GridCellProps } from '../../src/components/grid-column';
import { CssClass } from '../../src/infrastructure/common';
import { CssClassNameBuilder } from '../../src/infrastructure/css-class-name-builder';
import { CssClassSerializer } from '../../src/infrastructure/css-class-serializer';
import { DataSource, DataSourceState, SortDirection } from '../../src/infrastructure/data-source';
import { StyleProvider } from '../../src/infrastructure/style-provider';

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

export abstract class GridBase<P extends GridBaseProps> extends React.Component<P, any> {
    private _columns: GridColumnBase<any>[];
    private _detailColumn: DetailGridColumn;
    private _style: GridStyle;

    constructor(props: P) {
        super(props);
        this.state = { expandedDetailRows: [] };
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

    protected getCellClassName(column: GridColumnBase<any>, cellProps: GridCellProps): string {
        let classNameBuilder = new CssClassNameBuilder();

        if (cellProps) {
            console.log((cellProps.classTemplate != null));
            classNameBuilder
                .add(cellProps.className)
                .addIf((cellProps.classTemplate != null) && (cellProps.classTemplate(column) != null), () => cellProps.classTemplate(column).name);
        }

        return classNameBuilder.build();
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

    protected renderStyleSection(): JSX.Element {
        let headerStyles = this.columns.filter(x => x.props.header && x.props.header.classTemplate)
            .map(x => CssClassSerializer.instance.serialize(x.props.header.classTemplate(x)))
            .join();
        let bodyStyles = this.columns.filter(x => x.props.body && x.props.body.classTemplate)
            .map(x => CssClassSerializer.instance.serialize(x.props.body.classTemplate(x)))
            .join();
        let footerStyles = this.columns.filter(x => x.props.footer && x.props.footer.classTemplate)
            .map(x => CssClassSerializer.instance.serialize(x.props.footer.classTemplate(x)))
            .join();

        return <style>{headerStyles + bodyStyles + footerStyles}</style>;
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

    protected get columns(): GridColumnBase<GridColumnBaseProps>[] {
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
            <td className={this.getCellClassName(column, column.props.body)} key={`${rowIndex}_${columnIndex}`}>
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
            <th className={this.getCellClassName(column, column.props.header)} key={columnIndex}>
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
            <div>
                {this.renderStyleSection()}
                <table className={this.style.class}>
                    {this.renderHeader()}
                    {this.renderBody()}
                </table>
            </div>
        );
    }
}