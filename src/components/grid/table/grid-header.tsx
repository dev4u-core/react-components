import * as React from 'react';
import { GridHeaderRow } from './grid-header-row';
import { GridHeader as GridHeaderBase, GridHeaderProps } from '../grid-header';

export class GridHeader extends GridHeaderBase<GridHeaderProps, any> {
    public render(): JSX.Element {
        const className = this.props.style.className;

        return (
            <thead className={className}>
                {this.renderRows()}
            </thead>
        );
    }

    protected get rowType(): { new(): GridHeaderRow } {
        return GridHeaderRow;
    }
}