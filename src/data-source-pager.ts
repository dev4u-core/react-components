import { DataSource } from './data-source';

export interface PageInfo {
    firstIndex: number;
    lastIndex: number;
}

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

    protected getPageIndex(pageType: PageType) {
        switch (pageType) {
            case PageType.First: return 0;
            case PageType.Last: return this.getPageCount() - 1;
            case PageType.Next: return this.dataSource.view.pageIndex + 1;
            case PageType.Previous: return this.dataSource.view.pageIndex - 1;
        }
    }

    public canMoveToPage(pageType: PageType): boolean {
        let nextPageIndex = this.getPageIndex(pageType);
        let pageCount = this.getPageCount();
        return (nextPageIndex >= 0) && (nextPageIndex < pageCount) && (nextPageIndex != this.dataSource.view.pageIndex);
    }
    public getPageCount(): number {
        return Math.ceil(this.dataSource.totalCount / this.dataSource.pageSize);
    }
    public getPageInfo(pageIndex: number): PageInfo {
        let lastPageIndex = pageIndex * this.dataSource.pageSize - 1;
        return {
            firstIndex: (pageIndex - 1) * this.dataSource.pageSize,
            lastIndex: (lastPageIndex < this.dataSource.totalCount)
                ? lastPageIndex
                : (this.dataSource.totalCount - 1)
        };
    }
    public moveToPage(pageType: PageType) {
        if (!this.canMoveToPage(pageType)) return;

        let pageIndex = this.getPageIndex(pageType);
        this.dataSource.setPageIndex(pageIndex);
        this.dataSource.dataBind();
    }

    public get dataSource(): DataSource<any> {
        return this._dataSource;
    }
}