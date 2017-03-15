import * as React from 'react';
import { Grid, GridStyle } from './grid';
import { DataSource, SortDirection } from '../../src/infrastructure/data-source';

export interface GridCellProps {
    className?: string;
    template?: (column: GridColumnBase<any>, model?: any) => JSX.Element;
}

export interface GridColumnBaseProps {
    body?: GridCellProps;
    className?: string;
    field?: string;
    footer?: GridCellProps;
    header?: GridCellProps;
    isSortable?: boolean;
    title?: string;
}

export abstract class GridColumnBase<P extends GridColumnBaseProps> extends React.Component<P, any> {
    private readonly _grid: Grid;

    public constructor(props: P, grid: Grid) {
        super(props);
        this._grid = grid;
        this.handleClickToSort = this.handleClickToSort.bind(this);
    }

    protected getSortDirection(): SortDirection {
        let sortedBy = (this.grid.props.dataSource.view && this.grid.props.dataSource.view.sortedBy)
            ? this.grid.props.dataSource.view.sortedBy.filter(x => x.field == this.props.field)
            : null;
        return (sortedBy != null)
                && (sortedBy.length == 1)
                && (sortedBy[0].field == this.props.field)
            ? sortedBy[0].direction
            : null;
    }

    public handleClickToSort() {
        let dataSource = this.grid.props.dataSource;
        let sortedBy = null;
        if (dataSource.view && dataSource.view.sortedBy) {
            sortedBy = dataSource.view.sortedBy.filter(x => x.field == this.props.field);
            sortedBy = (sortedBy.length == 1) ? sortedBy[0] : null;
        }
        let direction = (sortedBy != null)
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
            : ((this.props.body && this.props.body.template) ? this.props.body.template(this, model) : model[this.props.field]);
    }

    public renderFooter(): JSX.Element {
        return (this.props.footer && this.props.footer.template) ? this.props.footer.template(this) : null;
    }

    public renderHeader(): JSX.Element {
        return (this.props.header && this.props.header.template) ? this.props.header.template(this) : null;
    }

    protected get grid() {
        return this._grid;
    }
}

export class GridColumn extends GridColumnBase<GridColumnBaseProps> {
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
        let direction = this.getSortDirection(); 
        let className = '';//this.style.headerRow.cell.classBySorting[direction];
        return super.renderHeader()
            || ((this.props.isSortable != false)
                ? <a href="javascript:" onClick={() => this.handleClickToSort()}>{this.props.title}</a>
                : <span>{this.props.title}</span>);
    }
}

export interface DetailGridColumnProps extends GridColumnBaseProps {
    detailRowTemplate: (gridColumn: DetailGridColumn, model: any, rowIndex: number) => JSX.Element;
}

export class DetailGridColumn extends GridColumnBase<DetailGridColumnProps> {
    public constructor(props: DetailGridColumnProps, grid: Grid) {
        super(props, grid);
        this.handleClickToExpandOrCollapseDetail = this.handleClickToExpandOrCollapseDetail.bind(this);
    }

    public handleClickToExpandOrCollapseDetail(model: any) {
        let index = this.grid.state.expandedDetailRows.indexOf(model);
        if (index !== -1) {
            this.grid.state.expandedDetailRows.splice(index, 1);
        } else {
            this.grid.state.expandedDetailRows.push(model);
        }
        this.grid.forceUpdate();
    }

    public renderBody(model: any, rowIndex: number): JSX.Element {
        return (
            <a href="javascript:" onClick={() => this.handleClickToExpandOrCollapseDetail(model)}>
                {(this.grid.state.expandedDetailRows.indexOf(model) != -1) ? '-' : '+'}
            </a>
        );
    }

    public renderDetailRow(model: any, rowIndex: number): JSX.Element {
        return this.props.detailRowTemplate ? this.props.detailRowTemplate(this, model, rowIndex) : null;
    }
}