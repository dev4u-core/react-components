import { } from 'es6-shim';
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

export enum DataSourceState {
    Empty,
    Binding,
    Bound
}

export interface DataSource<T> {
    dataBind();
    setPageIndex(value: number): DataSource<T>;
    sort(...expressions: SortExpression[]): DataSource<T>;

    readonly fieldAccessor: FieldAccessor;
    readonly pageSize?: number;
    readonly state: DataSourceState;
    readonly totalCount: number;
    readonly view: DataView<T>;

    onDataBinding?: (sender: DataSource<T>) => void;
    onDataBound?: (sender: DataSource<T>) => void;
}

export interface ClientDataSourceProps {
    pageSize?: number;
}

export class ClientDataSource<T> implements DataSource<T> {
    private _data: (() => Promise<T[]>) | T[];
    private _fieldAccessor: FieldAccessor;
    private _onDataBinging: ((sender: DataSource<T>) => void)[];
    private _onDataBound: ((sender: DataSource<T>) => void)[];
    private _pageSize: number;
    private _setPageIndex: ((view: DataView<T>) => void);
    private _sort: ((view: DataView<T>) => void);
    private _state: DataSourceState;
    private _view: DataView<T>;

    public constructor(data: T[], props?: ClientDataSourceProps) {
        if (props && props.pageSize) {
            this._pageSize = props.pageSize;
            this.setPageIndex(1);
        }
        this._data = data;
        this._state = DataSourceState.Empty;
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

    protected handleDataBinding() {
        this._state = DataSourceState.Binding;
        for (let i = 0; i < this._onDataBinging.length; i++) {
            this._onDataBinging[i](this);
        }
    }
    protected handleDataBound() {
        this._state = DataSourceState.Bound;
        for (let i = 0; i < this._onDataBound.length; i++) {
            this._onDataBound[i](this);
        }
    }
    protected internalDataBind(data: T[]) {
        this._view = this._view || {};
        this._view.data = data;

        if (this._sort)
        {
            this._sort(this._view);
        }

        if (this._setPageIndex) {
            this._setPageIndex(this._view);
        }
    }

    public dataBind() {
        this.handleDataBinding();
        if (this._data != null) {
            let data = this._data as T[];
            if (data) {
                this.internalDataBind(data);
                this.handleDataBound();
            } else {
                (this._data as (() => Promise<T[]>))().then(x => {
                    this._data = x;
                    this.internalDataBind(x);
                    this.handleDataBound();
                });
            }
        }
    }
    public setPageIndex(value: number): DataSource<T> {
        this._setPageIndex = x => {
            x.pageIndex = value;
            x.data = x.data.slice(this.pageSize * (value - 1), this.pageSize * value);
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
    public get pageSize(): number {
        return this._pageSize;
    }
    public get state(): DataSourceState {
        return this._state;
    }
    public get totalCount(): number {
        return this._data.length;
    }
    public get view(): DataView<T> {
        return this._view;
    }

    public set onDataBinding(value: (sender: DataSource<T>) => void) {
        this._onDataBinging = this._onDataBinging || [];
        this._onDataBinging.push(value);
    }
    public set onDataBound(value: (sender: DataSource<T>) => void) {
        this._onDataBound = this._onDataBound || [];
        this._onDataBinging.push(value);
    }
}