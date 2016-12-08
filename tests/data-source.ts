import { expect } from 'chai';
import * as Mocha from 'mocha';
import { SortDirection, ClientDataSource } from '../src/data-source';

describe('ClientDataSource', () => {
    it('dataBind', () => {
        let data = [{ field: 'value0' }, { field: 'value1' }, { field: 'value2' }];
        let dataSource = new ClientDataSource(data);

        expect(dataSource.view).to.be.null;

        dataSource.dataBind();

        expect(dataSource.view.data[0].field).to.equal('value0');
        expect(dataSource.view.data[1].field).to.equal('value1');
        expect(dataSource.view.data[2].field).to.equal('value2');
    });
    describe('sort', () => {
        let dataByCases = [
            [{ booleanField: true, stringField: 'value0' }, { booleanField: false, stringField: 'value1' }, { booleanField: null, stringField: 'value2' }],
            [{ booleanField: null, stringField: 'value2' }, { booleanField: true, stringField: 'value0' }, { booleanField: false, stringField: 'value1' }],
            [{ booleanField: null, stringField: 'value2' }, { booleanField: false, stringField: 'value1' }, { booleanField: true, stringField: 'value0' }]
        ];

        it ('"SortDirection.Ascending" by one field', () => {
            dataByCases.forEach(x => {
                let dataSource = new ClientDataSource(x);

                dataSource.sort({ direction: SortDirection.Ascending, field: 'stringField' });
                dataSource.dataBind();

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Ascending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('stringField', 'sortedBy[0].field');
            });
        });
        it ('"SortDirection.Descending" by one field', () => {
            dataByCases.forEach(x => {
                let dataSource = new ClientDataSource(x);

                dataSource.sort({ direction: SortDirection.Descending, field: 'stringField' });
                dataSource.dataBind();

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Descending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('stringField', 'sortedBy[0].field');
            });
        });
        it ('"SortDirection.Ascending" by one "boolean" field', () => {

            dataByCases.forEach(x => {
                let dataSource = new ClientDataSource(x);

                dataSource.sort({ direction: SortDirection.Ascending, field: 'booleanField' });
                dataSource.dataBind();

                expect(dataSource.view.data[0].booleanField).to.equal(null);
                expect(dataSource.view.data[1].booleanField).to.equal(false);
                expect(dataSource.view.data[2].booleanField).to.equal(true);
            });
        });
        it ('"SortDirection.Descending" by one "boolean" field', () => {
            dataByCases.forEach(x => {
                let dataSource = new ClientDataSource(x);

                dataSource.sort({ direction: SortDirection.Descending, field: 'booleanField' });
                dataSource.dataBind();

                expect(dataSource.view.data[0].booleanField).to.equal(true);
                expect(dataSource.view.data[1].booleanField).to.equal(false);
                expect(dataSource.view.data[2].booleanField).to.equal(null);
            });
        });
        it ('"SortDirection.Ascending" by one "string" field', () => {
            dataByCases.forEach(x => {
                let dataSource = new ClientDataSource(x);

                dataSource.sort({ direction: SortDirection.Ascending, field: 'stringField' });
                dataSource.dataBind();

                expect(dataSource.view.data[0].stringField).to.equal('value0');
                expect(dataSource.view.data[1].stringField).to.equal('value1');
                expect(dataSource.view.data[2].stringField).to.equal('value2');
            });
        });
        it ('"SortDirection.Descending" by one "string" field', () => {
            dataByCases.forEach(x => {
                let dataSource = new ClientDataSource(x);

                dataSource.sort({ direction: SortDirection.Descending, field: 'stringField'});
                dataSource.dataBind();

                expect(dataSource.view.data[0].stringField).to.equal('value2');
                expect(dataSource.view.data[1].stringField).to.equal('value1');
                expect(dataSource.view.data[2].stringField).to.equal('value0');
            });
        });
    });
});