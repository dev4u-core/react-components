import { DataSource } from './data-source';

export enum PageType {
    First,
    Next,
    Last,
    Previous
}

export class DataSourcePager {
    private readonly _dataSource: DataSource<any>;

    public constructor(dataSource: DataSource<any>) {
        this._dataSource = dataSource;
    }

    protected getPageCount(): number {
        return Math.ceil(this._dataSource.totalCount / this._dataSource.pageSize);
    }
    protected getPageIndex(pageType: PageType) {
        switch (pageType) {
            case PageType.First: return 1;
            case PageType.Last: return this.getPageCount();
            case PageType.Next: return this._dataSource.view.pageIndex + 1;
            case PageType.Previous: return this._dataSource.view.pageIndex - 1;
        }
    }

    public canMoveToPage(pageType: PageType): boolean {
        let nextPageIndex = this.getPageIndex(pageType);
        let pageCount = this.getPageCount();
        return (nextPageIndex > 0) && (nextPageIndex <= pageCount) && (nextPageIndex != this._dataSource.view.pageIndex);
    }
    public moveToPage(pageType: PageType) {
        if (!this.canMoveToPage(pageType)) return;

        let pageIndex = this.getPageIndex(pageType);
        this._dataSource.setPageIndex(pageIndex);
        this._dataSource.dataBind();
    }

    public get dataSource(): DataSource<any> {
        return this._dataSource;
    }
}