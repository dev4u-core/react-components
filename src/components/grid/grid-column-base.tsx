import * as React from 'react';
import { Grid } from './grid';
import { SortDirection } from '../../infrastructure/data/common';
import { DataSource } from '../../infrastructure/data/data-source';

export interface GridCellProps {
    className?: string;
    template?: (column: GridColumn<any>, model?: any) => JSX.Element;
}

export interface GridColumnProps {
    body?: GridCellProps;
    className?: string;
    field?: string;
    footer?: GridCellProps;
    header?: GridCellProps;
    isSortable?: boolean;
    title?: string;
}

export class GridColumn<P extends GridColumnProps> extends React.Component<P, any> {
    private readonly _grid: Grid;

    public constructor(props: P, grid: Grid) {
        super(props);

        this._grid = grid;

        this.handleSort = this.handleSort.bind(this);
    }

    protected getSortDirection(): SortDirection {
        const sortedBy = (this.grid.props.dataSource.view && this.grid.props.dataSource.view.sortedBy)
            ? this.grid.props.dataSource.view.sortedBy.filter(x => x.field == this.props.field)
            : null;

        return (sortedBy != null)
                && (sortedBy.length == 1)
                && (sortedBy[0].field == this.props.field)
            ? sortedBy[0].direction
            : null;
    }

    public handleSort() {
        const dataSource = this.grid.props.dataSource;
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

    public renderBody(model: any, rowIndex: number): JSX.Element {
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

    protected get grid() {
        return this._grid;
    }
}