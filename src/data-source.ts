export enum SortDirection {
    Ascending = 1 << 0,
    Descending = 1 << 1
}

export interface ISortExpression {
    direction: SortDirection;
    propertyName: string;
}

export interface IDataSource<T> {
    dataBind();
    sort(...expressions: ISortExpression[]);

    view: IDataView<T>;

    onDataBound?: (view: IDataView<T>) => void;
}

export interface IDataView<T> {
    data?: T[];
    sortedBy?: ISortExpression[];
}

export class ClientDataSource<T> implements IDataSource<T> {
    private _data: T[];
    private _onDataBound: (view: IDataView<T>) => void;
    private _sort: ((view: IDataView<T>) => void);
    private _view: IDataView<T>;

    constructor(data: T[]) {
        this._data = data;
        this._view = null;
    }

    private getComparer(expressions: ISortExpression[]): (x: T, y: T) => number {
        let result = null;
        for (let i = 0; i < expressions.length; i++) {
            var comparer = ((direction, propertyName) =>
                (x, y) => {
                    let xValue = x[propertyName];
                    let yValue = y[propertyName];
                    if (xValue > yValue) return (direction == SortDirection.Ascending) ? 1 : -1;
                    if (xValue < yValue) return (direction == SortDirection.Ascending) ? -1 : 1;
                    return 0;
                })(expressions[i].direction, expressions[i].propertyName);
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
    public sort(...expressions: ISortExpression[]) {
        this._sort =x => {
            x.sortedBy = expressions;
            x.data = x.data.sort(this.getComparer(expressions));
        };
    }

    public get view(): IDataView<T> {
        return this._view;
    }

    public set onDataBound(value: (view: IDataView<T>) => void) {
        this._onDataBound = value;
    }
}