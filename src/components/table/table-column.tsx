import * as React from 'react';
import { Table } from './table';
import { SortDirection } from '../../infrastructure/common';
import { DataSource } from '../../infrastructure/data-source';

export interface TableCellProps {
    className?: string;
    template?: (column: TableColumn<any>, model?: any) => JSX.Element;
}

export interface TableColumnProps {
    body?: TableCellProps;
    className?: string;
    field?: string;
    footer?: TableCellProps;
    header?: TableCellProps;
    isSortable?: boolean;
    title?: string;
}

export class TableColumn<P extends TableColumnProps> extends React.Component<P, any> {
    private readonly _table: Table<any, any>;

    public constructor(props: P, table: Table<any, any>) {
        super(props);

        this._table = table;

        this.handleSort = this.handleSort.bind(this);
    }

    protected getSortDirection(): SortDirection {
        const sortedBy = (this.table.props.dataSource.view && this.table.props.dataSource.view.sortedBy)
            ? this.table.props.dataSource.view.sortedBy.filter(x => x.field == this.props.field)
            : null;

        return (sortedBy != null)
                && (sortedBy.length == 1)
                && (sortedBy[0].field == this.props.field)
            ? sortedBy[0].direction
            : null;
    }

    public handleSort() {
        const dataSource = this.table.props.dataSource;
        let sortedBy = null;

        if (dataSource.view && dataSource.view.sortedBy) {
            sortedBy = dataSource.view.sortedBy.filter(x => x.field == this.props.field);
            sortedBy = (sortedBy.length == 1) ? sortedBy[0] : null;
        }

        const direction = (sortedBy != null)
            ? ((sortedBy.direction == SortDirection.Ascending) ? SortDirection.Descending : null)
            : SortDirection.Ascending;

        if (direction) {
            dataSource.sort({ direction: direction, field: this.props.field });
        } else {
            dataSource.sort();
        }

        dataSource.dataBind();
    }

    public renderBody(model: any, index: number): JSX.Element {
        return this.props.children
            ? React.Children.only(this.props.children)
            : (this.props.body && this.props.body.template
                ? this.props.body.template(this, model)
                : (this.props.field ? (<span>{model[this.props.field]}</span>) : null));
    }

    public renderFooter(): JSX.Element {
        return (this.props.footer && this.props.footer.template) ? this.props.footer.template(this) : null;
    }

    public renderHeader(): JSX.Element {
        const direction = this.getSortDirection(); 
        const className = '';//this.style.headerRow.cell.classBySorting[direction];

        return (this.props.header && this.props.header.template)
            ? this.props.header.template(this)
            : ((this.props.isSortable != false)
                ? <a href="javascript:" onClick={() => this.handleSort()}>{this.props.title}</a>
                : <span>{this.props.title}</span>);
    }

    protected get table() {
        return this._table;
    }
}