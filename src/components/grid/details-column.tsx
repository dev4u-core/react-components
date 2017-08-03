import * as React from 'react';
import { Grid } from './grid';
import { Column, ColumnProps } from './column-base';

export interface DetailsColumnProps extends ColumnProps {
    detailsRowTemplate: (column: DetailsColumn, model: any, rowIndex: number) => JSX.Element;
}

export class DetailsColumn extends Column<DetailsColumnProps> {
    public constructor(props: DetailsColumnProps, grid: Grid) {
        super(props, grid);

        this.handleExpandOrCollapse = this.handleExpandOrCollapse.bind(this);
    }

    protected handleExpandOrCollapse(model: any) {
        const index = this.grid.state.expandedDetails.indexOf(model);

        if (index != -1) {
            this.grid.state.expandedDetails.splice(index, 1);
        } else {
            this.grid.state.expandedDetails.push(model);
        }

        this.grid.forceUpdate();
    }

    public renderBody(model: any, rowIndex: number): JSX.Element {
        return (
            <a href="javascript:" onClick={() => this.handleExpandOrCollapse(model)}>
                {(this.grid.state.expandedDetails.indexOf(model) != -1) ? '-' : '+'}
            </a>
        );
    }

    public renderDetailsRow(model: any, rowIndex: number): JSX.Element {
        return this.props.detailsRowTemplate ? this.props.detailsRowTemplate(this, model, rowIndex) : null;
    }
}