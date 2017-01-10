import { DataSource } from './data-source';

export class DataSourcePager {
    private readonly _dataSource: DataSource<any>;

    public constructor(dataSource: DataSource<any>) {
        this._dataSource = dataSource;
    }

    public setFirstPageIndex() {
        this._dataSource.setPageIndex(1);
        this._dataSource.dataBind();
    }
    public setNextPageIndex() {
        let pageIndex = this._dataSource.view.pageIndex + 1;
        this._dataSource.setPageIndex(pageIndex);
        this._dataSource.dataBind();
    }
    public setLastPageIndex() {
        let pageIndex = Math.ceil(this._dataSource.totalCount / this._dataSource.pageSize);
        this._dataSource.setPageIndex(pageIndex);
        this._dataSource.dataBind();
    }
    public setPrevPageIndex() {
        let pageIndex = this._dataSource.view.pageIndex - 1;
        this._dataSource.setPageIndex(pageIndex);
        this._dataSource.dataBind();
    }

    public get dataSource(): DataSource<any> {
        return this._dataSource;
    }
}