import { FilterExpression, SortDirection, SortExpression } from './common';
import { DataSourceChangeTracker } from './data-source-change-tracker';
import { DefaultFieldAccessor, FieldAccessor } from './field-accessor';
import { Comparer } from '../comparer';
import { Event } from '../event';

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
    filter(...expressions: FilterExpression[]);
    setPageIndex(value: number);
    sort(...expressions: SortExpression[]);
    update(model: T, field: string, value: any);

    readonly changeTracker: DataSourceChangeTracker<T>;
    readonly fieldAccessor: FieldAccessor;
    readonly pageSize?: number;
    readonly state: DataSourceState;
    readonly totalCount: number;
    readonly view: DataView<T>;

    onDataBinding: Event<any>;
    onDataBound: Event<any>;
}