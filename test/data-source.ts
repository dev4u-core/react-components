import { expect } from 'chai';
import * as Mocha from 'mocha';
import { SortDirection, ClientDataSource } from '../src/data-source';

describe('ClientDataSource', () => {
    it('dataBind', () => {
        let data = [{ title: 'title0' }, { title: 'title1' }, { title: 'title2' }];
        let dataSource = new ClientDataSource(data);

        expect(dataSource.view).to.be.null;

        dataSource.dataBind();

        expect(dataSource.view.data[0].title).to.equal('title0');
        expect(dataSource.view.data[1].title).to.equal('title1');
        expect(dataSource.view.data[2].title).to.equal('title2');
    });
    describe('sort', () => {
        let dataByCases = [
            [{ title: 'title0' }, { title: 'title1' }, { title: 'title2' }],
            [{ title: 'title2' }, { title: 'title0' }, { title: 'title1' }],
            [{ title: 'title2' }, { title: 'title1' }, { title: 'title0' }]
        ];

        it ('"SortDirection.Ascending" by one field', () => {
            dataByCases.forEach(x => {
                let dataSource = new ClientDataSource(x);

                dataSource.sort({ direction: SortDirection.Ascending, field: 'title' });
                dataSource.dataBind();

                expect(dataSource.view.data[0].title).to.equal('title0');
                expect(dataSource.view.data[1].title).to.equal('title1');
                expect(dataSource.view.data[2].title).to.equal('title2');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Ascending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('title', 'sortedBy[0].field');
            });
        });
        it ('"SortDirection.Descending" by one field', () => {
            dataByCases.forEach(x => {
                let dataSource = new ClientDataSource(x);

                dataSource.sort({ direction: SortDirection.Descending, field: 'title'});
                dataSource.dataBind();

                expect(dataSource.view.data[0].title).to.equal('title2');
                expect(dataSource.view.data[1].title).to.equal('title1');
                expect(dataSource.view.data[2].title).to.equal('title0');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Descending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('title', 'sortedBy[0].field');
            });
        });
    });
});