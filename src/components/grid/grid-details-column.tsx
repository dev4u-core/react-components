import * as React from 'react';
import { Grid } from './grid';
import { GridColumn, GridColumnProps } from './grid-column-base';

export interface DetailsColumnProps extends GridColumnProps {
    detailsRowTemplate: (column: GridDetailsColumn, model: any, rowIndex: number) => JSX.Element;
}

export class GridDetailsColumn extends GridColumn<DetailsColumnProps> {
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