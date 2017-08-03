import { Grid as GridBase, GridProps, GridState } from './grid-base';
import { GridStyle } from './grid-style';

export class Grid extends GridBase<GridProps, GridState> {
    protected createStyle(): GridStyle {
        return {};
    }
}