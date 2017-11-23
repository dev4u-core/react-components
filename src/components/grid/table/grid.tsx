import * as React from 'react';
import { GridBody } from './grid-body';
import { GridHeader } from './grid-header';
import { InternalGrid, InternalGridProps } from '../internal-grid';

export class Grid extends InternalGrid<InternalGridProps> {
    public render(): JSX.Element {
        const className = this.props.style.className;

        return (
            <table className={className}>
                {this.renderHeader()}
                {this.renderBody()}
            </table>
        );
    }

    protected get bodyType(): { new (): GridBody } {
        return GridBody;
    }

    protected get headerType(): { new (): GridHeader } {
        return GridHeader;
    }
}