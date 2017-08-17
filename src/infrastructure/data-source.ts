import { } from 'es6-shim';
import { FilterExpression, SortDirection, SortExpression } from './common';
import { Comparer } from './comparer';
import { Event } from './event';
import { DefaultFieldAccessor, FieldAccessor } from './field-accessor';

export enum DataViewMode {
    CurrentPage,
    FromFirstToCurrentPage
}

export interface DataView<T> {
    data?: T[];
    filteredBy?: FilterExpression[];
    mode?: DataViewMode;
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
    filter(...expressions: FilterExpression[]): DataSource<T>;
    setPageIndex(value: number): DataSource<T>;
    sort(...expressions: SortExpression[]): DataSource<T>;

    readonly fieldAccessor: FieldAccessor;
    readonly pageSize?: number;
    readonly state: DataSourceState;
    readonly totalCount: number;
    readonly view: DataView<T>;

    onDataBinding: Event<any>;
    onDataBound: Event<any>;
}

export interface ClientDataSourceProps {
    fieldAccessor?: FieldAccessor;
    pageSize?: number;
    pageIndex?: number;
    sortedBy?: SortExpression[];
    viewMode?: DataViewMode;
}

export class ClientDataSource<T> implements DataSource<T> {
    private _data: (() => Promise<T[]>) | T[];
    private _fieldAccessor: FieldAccessor;
    private _onDataBinging: Event<any>;
    private _onDataBound: Event<any>;
    private _pageSize: number;
    private _setPageIndex: ((view: DataView<T>) => void);
    private _sort: ((view: DataView<T>) => void);
    private _state: DataSourceState;
    private _view: DataView<T>;
    private _viewMode: DataViewMode;

    public constructor(data: T[], props?: ClientDataSourceProps) {
        if (props) {
            if (props.pageSize) {
                this._pageSize = props.pageSize;
                this.setPageIndex(props.pageIndex || 0);
            }

            if (props.sortedBy) {
                this.sort(...props.sortedBy);
            }

            this._fieldAccessor = props.fieldAccessor;
            this._viewMode = props.viewMode
        }

        this._data = data;
        this._onDataBinging = new Event<any>();
        this._onDataBound = new Event<any>();
        this._state = DataSourceState.Empty;
        this._view = null;
    }

    private getComparer(expressions: SortExpression[]): (x: T, y: T) => number {
        let result = null;

        for (let i = 0; i < expressions.length; i++) {
            const comparer = ((direction, field) =>
                (x, y) => {
                    const xValue = this.fieldAccessor.getValue(x, field);
                    const yValue = this.fieldAccessor.getValue(y, field);

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

        this.onDataBinding.trigger(this, {});
    }

    protected handleDataBound() {
        this._state = DataSourceState.Bound;

        this.onDataBound.trigger(this, {});
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
            const data = this._data as T[];

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
            x.data = (this._viewMode == DataViewMode.FromFirstToCurrentPage)
                ? x.data.slice(0, this.pageSize * (value + 1))
                : x.data.slice(this.pageSize * value, this.pageSize * (value + 1));
        };

        return this;
    }

    public filter(...expressions: FilterExpression[]): DataSource<T> {
        this._sort = x => {
            x.filteredBy = expressions;
            x.data = x.data.filter(expressions[0].expression)
        };

        return this;
    }

    public sort(...expressions: SortExpression[]): DataSource<T> {
        this._sort = x => {
            x.sortedBy = expressions;
            x.data = (expressions && (expressions.length > 0))
                ? x.data.concat().sort(this.getComparer(expressions))
                : x.data;
        };

        return this;
    }

    public get fieldAccessor(): FieldAccessor {
        return this._fieldAccessor = this._fieldAccessor || new DefaultFieldAccessor();
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

    public get onDataBinding(): Event<any> {
        return this._onDataBinging;
    }

    public get onDataBound(): Event<any> {
        return this._onDataBound;
    }
}