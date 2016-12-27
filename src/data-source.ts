import { Comparer } from './comparer';

export class FieldAccessor {
    private static readonly Separator: string = '.';

    public getValue(model: any, compositeField: string): any {
        let result = model;
        var fields = compositeField.split(FieldAccessor.Separator);
        for (let i = 0; i < fields.length; i++) {
            result = result[fields[i]];
            if (!result) break;
        }
        return result;
    }
}

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
    pageIndex?: number;
    sortedBy?: SortExpression[];
}

export interface DataSource<T> {
    dataBind();
    setPageIndex(value: number): DataSource<T>;
    sort(...expressions: SortExpression[]): DataSource<T>;

    readonly fieldAccessor: FieldAccessor;
    pageSize?: number;
    readonly view: DataView<T>;

    onDataBound?: (sender: DataSource<T>) => void;
}

export interface ClientDataSourceProps {
    pageSize?: number;
}

export class ClientDataSource<T> implements DataSource<T> {
    private _data: T[];
    private _fieldAccessor: FieldAccessor;
    private _onDataBound: (sender: DataSource<T>) => void;
    private _setPageIndex: ((view: DataView<T>) => void);
    private _sort: ((view: DataView<T>) => void);
    private _view: DataView<T>;

    public constructor(data: T[], props?: ClientDataSourceProps) {
        if (props && props.pageSize) {
            this.pageSize = props.pageSize;
            this.setPageIndex(0);
        }
        this._data = data;
        this._view = null;
    }

    private getComparer(expressions: SortExpression[]): (x: T, y: T) => number {
        let result = null;
        for (let i = 0; i < expressions.length; i++) {
            var comparer = ((direction, field) =>
                (x, y) => {
                    let xValue = this.fieldAccessor.getValue(x, field);
                    let yValue = this.fieldAccessor.getValue(y, field);
                    return (direction == SortDirection.Ascending)
                        ? Comparer.Instance.compare(xValue, yValue)
                        : Comparer.Instance.compare(yValue, xValue);
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

        if (this._sort)
        {
            this._sort(this._view);
        }

        if (this._setPageIndex) {
            this._setPageIndex(this._view);
        }

        if (this._onDataBound != null) {
            this._onDataBound(this);
        }
    }
    public setPageIndex(value: number): DataSource<T> {
        this._setPageIndex = x => {
            x.pageIndex = value;
            x.data = x.data.slice(this.pageSize * value, this.pageSize * (value + 1));
        };
        return this;
    }
    public sort(...expressions: SortExpression[]): DataSource<T> {
        this._sort = x => {
            x.sortedBy = expressions;
            x.data = expressions ? x.data.sort(this.getComparer(expressions)) : x.data;
        };
        return this;
    }

    public get fieldAccessor(): FieldAccessor {
        return this._fieldAccessor = this._fieldAccessor || new FieldAccessor();
    }
    public pageSize: number;
    public get view(): DataView<T> {
        return this._view;
    }

    public set onDataBound(value: (sender: DataSource<T>) => void) {
        this._onDataBound = value;
    }
}