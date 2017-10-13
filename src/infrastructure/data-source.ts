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


export interface DataSourceProps {
    fieldAccessor?: FieldAccessor;
    firstPageSize?: number;
    pageSize?: number;
    pageIndex?: number;
    sortedBy?: SortExpression[];
    viewMode?: DataViewMode;
}

export interface DataSourceChange<T> {
    model: T;
    type: DataSourceChangeType;
}

export interface DataSourceChangeManager<T> {
    apply();
    rollback();
    update(model: T, field: string, value: any);

    readonly changes: DataSourceChange<T>[];
}

export interface DataSourceUpdate<T> extends DataSourceChange<T> {
    field: string;
    prevValue: any;
    value: any;
}

export enum DataSourceChangeType {
    Create,
    Update,
    Delete
}

export interface DataSource<T> {
    dataBind();
    filter(...expressions: FilterExpression[]): DataSource<T>;
    setPageIndex(value: number): DataSource<T>;
    sort(...expressions: SortExpression[]): DataSource<T>;

    readonly changeManager: DataSourceChangeManager<T>;
    readonly fieldAccessor: FieldAccessor;
    readonly firstPageSize?: number;
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

export class ClientDataSourceChangeManager<T> implements DataSourceChangeManager<T> {
    private _changes: DataSourceChange<T>[];
    private _dataSource: DataSource<T>;

    public constructor(dataSource: DataSource<T>) {
        this._changes = [];
        this._dataSource = dataSource;
    }

    public apply() {
        this._changes = [];
    }

    public rollback() {
        const fieldAccessor = this.dataSource.fieldAccessor;

        while (this.changes.length > 0) {
            const change = this.changes.pop();

            switch (change.type) {
                case DataSourceChangeType.Update:
                    const update = change as DataSourceUpdate<T>;

                    fieldAccessor.setValue(update.model, update.field, update.prevValue);
                break;
            }
        }

        this.dataSource.dataBind();
    }

    public update(model: T, field: string, value: any) {
        const fieldAccessor = this.dataSource.fieldAccessor;
        const currentValue = fieldAccessor.getValue(model, field);

        fieldAccessor.setValue(model, field, value);

        this.changes.push({
            field: field,
            model: model,
            prevValue: currentValue,
            type: DataSourceChangeType.Update,
            value: value
        } as DataSourceChange<T>);
    }

    protected get dataSource(): DataSource<T> {
        return this._dataSource;
    }

    public get changes(): DataSourceChange<T>[] {
        return this._changes;
    }
}

export class ClientDataSource<T> implements DataSource<T> {
    private _changeManager: DataSourceChangeManager<T>;
    private _data: (() => Promise<T[]>) | T[];
    private _fieldAccessor: FieldAccessor;
    private _firstPageSize: number;
    private _onDataBinging: Event<any>;
    private _onDataBound: Event<any>;
    private _pageSize: number;
    private _setPageIndex: ((view: DataView<T>) => void);
    private _sort: ((view: DataView<T>) => void);
    private _state: DataSourceState;
    private _view: DataView<T>;
    private _viewMode: DataViewMode;

    public constructor(data: T[], props?: DataSourceProps) {
        if (props) {
            this._fieldAccessor = props.fieldAccessor;
            this._firstPageSize = props.firstPageSize || 0;
            this._viewMode = props.viewMode

            if (props.pageSize) {
                this._pageSize = props.pageSize;
                this.setPageIndex(props.pageIndex || 0);
            }

            if (props.sortedBy) {
                this.sort(...props.sortedBy);
            }
        }

        this._changeManager = new ClientDataSourceChangeManager<T>(this);
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

                    return Comparer.instance.compare(xValue, yValue, direction);
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
        const firstIndex = this.firstPageSize
            ? (value ? this.firstPageSize + this.pageSize * (value - 1) : 0)
            : this.pageSize * value
        const lastIndex = this.firstPageSize
            ? (value ? this.firstPageSize + this.pageSize * value : this.firstPageSize)
            : this.pageSize * (value + 1);

        this._setPageIndex = x => {
            x.pageIndex = value;
            x.data = (this._viewMode == DataViewMode.FromFirstToCurrentPage)
                ? x.data.slice(0, lastIndex)
                : x.data.slice(firstIndex, lastIndex);
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

    public get changeManager(): DataSourceChangeManager<T> {
        return this._changeManager;
    }

    public get fieldAccessor(): FieldAccessor {
        return this._fieldAccessor = this._fieldAccessor || new DefaultFieldAccessor();
    }

    public get firstPageSize(): number {
        return this._firstPageSize;
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