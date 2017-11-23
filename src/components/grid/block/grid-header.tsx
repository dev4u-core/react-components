import * as React from 'react';
import { GridHeaderRow } from './grid-header-row';
import { GridHeader as GridHeaderBase, GridHeaderProps } from '../grid-header';

export class GridHeader extends GridHeaderBase<GridHeaderProps, any> {
    public render(): JSX.Element {
        const className = this.props.style.className;

        return (
            <div className={className}>
                {this.renderRows()}
            </div>
        );
    }

    protected get rowType(): { new(): GridHeaderRow } {
        return GridHeaderRow;
    }
}