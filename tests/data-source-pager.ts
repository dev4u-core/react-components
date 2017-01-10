import { expect } from 'chai';
import * as Mocha from 'mocha';
import { ClientDataSource } from '../src/data-source';
import { DataSourcePager, PageType } from '../src/data-source-pager';

describe('DataSourcePager', () => {
    function createPager() {
        let dataSource = new ClientDataSource(
            [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }],
            { pageSize: 2, pageIndex: 2 }
        );
        dataSource.dataBind();

        return new DataSourcePager(dataSource);
    }

    describe('canMoveToPage', () => {
        it('PageType.First if true', () => {
            let pager = createPager();

            pager.moveToPage(PageType.Last);

            expect(pager.canMoveToPage(PageType.First)).equal(true);
        });
        it('PageType.First if false', () => {
            let pager = createPager();

            pager.moveToPage(PageType.First);

            expect(pager.canMoveToPage(PageType.First)).equal(false);
        });
        it('PageType.Last if true', () => {
            let pager = createPager();

            pager.moveToPage(PageType.First);

            expect(pager.canMoveToPage(PageType.Last)).equal(true);
        });
        it('PageType.Last if false', () => {
            let pager = createPager();

            pager.moveToPage(PageType.Last);

            expect(pager.canMoveToPage(PageType.Last)).equal(false);
        });
        it('PageType.Next if true', () => {
            let pager = createPager();

            pager.moveToPage(PageType.First);

            expect(pager.canMoveToPage(PageType.Next)).equal(true);
        });
        it('PageType.Next if false', () => {
            let pager = createPager();

            pager.moveToPage(PageType.Last);

            expect(pager.canMoveToPage(PageType.Next)).equal(false);
        });
        it('PageType.Last if true', () => {
            let pager = createPager();

            pager.moveToPage(PageType.Last);

            expect(pager.canMoveToPage(PageType.Previous)).equal(true);
        });
        it('PageType.Last if false', () => {
            let pager = createPager();

            pager.moveToPage(PageType.First);

            expect(pager.canMoveToPage(PageType.Previous)).equal(false);
        });
    });
    describe('moveToPage', () => {
        it('PageType.First', () => {
            let pager = createPager();

            pager.moveToPage(PageType.Last);
            pager.moveToPage(PageType.First);

            expect(pager.dataSource.view.pageIndex).to.equal(1);
        });
        it('PageType.Last', () => {
            let pager = createPager();

            pager.moveToPage(PageType.First);
            pager.moveToPage(PageType.Last);

            expect(pager.dataSource.view.pageIndex).to.equal(3);
        });
        it('PageType.Next', () => {
            let pager = createPager();

            pager.moveToPage(PageType.First);
            pager.moveToPage(PageType.Next);

            expect(pager.dataSource.view.pageIndex).to.equal(2);
        });
        it('PageType.Previous', () => {
            let pager = createPager();

            pager.moveToPage(PageType.Last);
            pager.moveToPage(PageType.Previous);

            expect(pager.dataSource.view.pageIndex).to.equal(2);
        });
    });
});