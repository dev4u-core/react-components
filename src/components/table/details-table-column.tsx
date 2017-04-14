import * as React from 'react';
import { Table } from './table';
import { TableColumn, TableColumnProps } from './table-column';

export interface DetailsTableColumnProps extends TableColumnProps {
    detailsRowTemplate: (tableColumn: DetailsTableColumn, model: any, rowIndex: number) => JSX.Element;
}

export class DetailsTableColumn extends TableColumn<DetailsTableColumnProps> {
    public constructor(props: DetailsTableColumnProps, table: Table<any, any>) {
        super(props, table);

        this.handleExpandOrCollapse = this.handleExpandOrCollapse.bind(this);
    }

    protected handleExpandOrCollapse(model: any) {
        const index = this.table.state.expandedDetailRows.indexOf(model);

        if (index !== -1) {
            this.table.state.expandedDetailRows.splice(index, 1);
        } else {
            this.table.state.expandedDetailRows.push(model);
        }

        this.table.forceUpdate();
    }

    public renderBody(model: any, rowIndex: number): JSX.Element {
        return (
            <a href="javascript:" onClick={() => this.handleExpandOrCollapse(model)}>
                {(this.table.state.expandedDetailRows.indexOf(model) != -1) ? '-' : '+'}
            </a>
        );
    }

    public renderDetailsRow(model: any, rowIndex: number): JSX.Element {
        return this.props.detailsRowTemplate ? this.props.detailsRowTemplate(this, model, rowIndex) : null;
    }
}