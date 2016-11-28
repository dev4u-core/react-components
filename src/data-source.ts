export enum SortDirection {
    Ascending = 1 << 0,
    Descending = 1 << 1
}

export interface SortExpression {
    direction: SortDirection;
    field: string;
}

export interface DataView<T> {
    data?: T[];
    sortedBy?: SortExpression[];
}

export interface DataSource<T> {
    dataBind();
    sort(...expressions: SortExpression[]);

    view: DataView<T>;

    onDataBound?: (view: DataView<T>) => void;
}

export class ClientDataSource<T> implements DataSource<T> {
    private _data: T[];
    private _onDataBound: (view: DataView<T>) => void;
    private _sort: ((view: DataView<T>) => void);
    private _view: DataView<T>;

    constructor(data: T[]) {
        this._data = data;
        this._view = null;
    }

    private getComparer(expressions: SortExpression[]): (x: T, y: T) => number {
        let result = null;
        for (let i = 0; i < expressions.length; i++) {
            var comparer = ((direction, field) =>
                (x, y) => {
                    let xValue = x[field];
                    let yValue = y[field];
                    if (xValue > yValue) return (direction == SortDirection.Ascending) ? 1 : -1;
                    if (xValue < yValue) return (direction == SortDirection.Ascending) ? -1 : 1;
                    return 0;
                })(expressions[i].direction, expressions[i].field);
            result = (result != null)
                ? ((prevComparer) => (x, y) => prevComparer(x, y))(result)
                : comparer;
        }
        return result;
    }

    // IDataSource<T> Members
    public dataBind() {
        this._view = this._view || {};
        this._view.data = this._data;

        if (this._sort != null)
        {
            this._sort(this._view);
            this._sort = null;
        }

        if (this._onDataBound != null) {
            this._onDataBound(this._view);
        }
    }
    public sort(...expressions: SortExpression[]) {
        this._sort = x => {
            x.sortedBy = expressions;
            x.data = expressions ? x.data.sort(this.getComparer(expressions)) : x.data;
        };
    }

    public get view(): DataView<T> {
        return this._view;
    }

    public set onDataBound(value: (view: DataView<T>) => void) {
        this._onDataBound = value;
    }
}