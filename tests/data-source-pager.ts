import { expect } from 'chai';
import * as Mocha from 'mocha';
import { ClientDataSource } from '../src/data-source';
import { DataSourcePager } from '../src/data-source-pager';

describe('DataSourcePager', () => {
    function createPager() {
        let dataSource = new ClientDataSource([{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }], { pageSize: 2 });
        dataSource.dataBind();

        return new DataSourcePager(dataSource);
    }

    it('setFirstPageIndex', () => {
        let pager = createPager();

        pager.setLastPageIndex();
        pager.setFirstPageIndex();

        expect(pager.dataSource.view.pageIndex).to.equal(1);
    });
    it('setLastPageIndex', () => {
        let pager = createPager();

        pager.setFirstPageIndex();
        pager.setLastPageIndex();

        expect(pager.dataSource.view.pageIndex).to.equal(3);
    });
    it('setNextPageIndex', () => {
        let pager = createPager();

        pager.setFirstPageIndex();
        pager.setNextPageIndex();

        expect(pager.dataSource.view.pageIndex).to.equal(2);
    });
    it('setPrevPageIndex', () => {
        let pager = createPager();

        pager.setLastPageIndex();
        pager.setPrevPageIndex();

        expect(pager.dataSource.view.pageIndex).to.equal(2);
    });
});