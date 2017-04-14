import { expect } from 'chai';
import * as Mocha from 'mocha';
import { ClientDataSource } from '../../src/infrastructure/data-source';
import { DataSourcePager, PageType } from '../../src/infrastructure/data-source-pager';

describe('DataSourcePager', () => {
    function createPager(pageSize?: number) {
        const dataSource = new ClientDataSource(
            [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }],
            { pageSize: pageSize || 2, pageIndex: 2 }
        );
        dataSource.dataBind();

        return new DataSourcePager(dataSource);
    }

    describe('canMoveToPage', () => {
        it('PageType.First if true', () => {
            const pager = createPager();

            pager.moveToPage(PageType.Last);

            expect(pager.canMoveToPage(PageType.First)).equal(true);
        });

        it('PageType.First if false', () => {
            const pager = createPager();

            pager.moveToPage(PageType.First);

            expect(pager.canMoveToPage(PageType.First)).equal(false);
        });

        it('PageType.Last if true', () => {
            const pager = createPager();

            pager.moveToPage(PageType.First);

            expect(pager.canMoveToPage(PageType.Last)).equal(true);
        });

        it('PageType.Last if false', () => {
            const pager = createPager();

            pager.moveToPage(PageType.Last);

            expect(pager.canMoveToPage(PageType.Last)).equal(false);
        });

        it('PageType.Next if true', () => {
            const pager = createPager();

            pager.moveToPage(PageType.First);

            expect(pager.canMoveToPage(PageType.Next)).equal(true);
        });

        it('PageType.Next if false', () => {
            const pager = createPager();

            pager.moveToPage(PageType.Last);

            expect(pager.canMoveToPage(PageType.Next)).equal(false);
        });

        it('PageType.Last if true', () => {
            const pager = createPager();

            pager.moveToPage(PageType.Last);

            expect(pager.canMoveToPage(PageType.Previous)).equal(true);
        });

        it('PageType.Last if false', () => {
            const pager = createPager();

            pager.moveToPage(PageType.First);

            expect(pager.canMoveToPage(PageType.Previous)).equal(false);
        });
    });

    describe('getPageInfo', () => {
        it('if total count more then page size', () => {
            [
                { pageIndex: 0, pageInfo: { firstIndex: 0, lastIndex: 1 }},
                { pageIndex: 1, pageInfo: { firstIndex: 2, lastIndex: 3 }},
                { pageIndex: 2, pageInfo: { firstIndex: 4, lastIndex: 4 }}
            ].forEach(x => {
                const pager = createPager();

                const pageInfo = pager.getPageInfo(x.pageIndex);

                expect(pageInfo.firstIndex).to.equal(x.pageInfo.firstIndex, 'firstIndex');
                expect(pageInfo.lastIndex).to.equal(x.pageInfo.lastIndex, 'lastIndex');
            });
        });

        it('if total count less then page size', () => {
            const pager = createPager(10);

            const pageInfo = pager.getPageInfo(0);

            expect(pageInfo.firstIndex).to.equal(0, 'firstIndex');
            expect(pageInfo.lastIndex).to.equal(4, 'lastIndex');
        });

        it('if data source is empty', () => {
            const dataSource = new ClientDataSource([], { pageSize: 2, pageIndex: 0 });
            const pager = new DataSourcePager(dataSource);

            dataSource.dataBind();

            const pageInfo = pager.getPageInfo(0);

            expect(pageInfo.firstIndex).to.equal(0, 'firstIndex');
            expect(pageInfo.lastIndex).to.equal(0, 'lastIndex');
        });
    });

    describe('moveToPage', () => {
        it('PageType.First', () => {
            const pager = createPager();

            pager.moveToPage(PageType.Last);
            pager.moveToPage(PageType.First);

            expect(pager.dataSource.view.pageIndex).to.equal(0);
        });

        it('PageType.Last', () => {
            const pager = createPager();

            pager.moveToPage(PageType.First);
            pager.moveToPage(PageType.Last);

            expect(pager.dataSource.view.pageIndex).to.equal(2);
        });

        it('PageType.Next', () => {
            const pager = createPager();

            pager.moveToPage(PageType.First);
            pager.moveToPage(PageType.Next);

            expect(pager.dataSource.view.pageIndex).to.equal(1);
        });

        it('PageType.Previous', () => {
            const pager = createPager();

            pager.moveToPage(PageType.Last);
            pager.moveToPage(PageType.Previous);

            expect(pager.dataSource.view.pageIndex).to.equal(1);
        });
    });
});