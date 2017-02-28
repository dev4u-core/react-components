import { expect } from 'chai';
import * as Mocha from 'mocha';
import { DataType } from '../../src/infrastructure/common';
import { ClientDataSource, FieldAccessor, SortDirection } from '../../src/infrastructure/data-source';
import { TypeConverterProvider } from '../../src/infrastructure/type-converter';

describe('ClientDataSource', () => {
    it('dataBind', () => {
        const data = [{ field: 'value0' }, { field: 'value1' }, { field: 'value2' }];
        const dataSource = new ClientDataSource(data);

        expect(dataSource.view).to.be.null;

        dataSource.dataBind();

        expect(dataSource.view.data[0].field).to.equal('value0');
        expect(dataSource.view.data[1].field).to.equal('value1');
        expect(dataSource.view.data[2].field).to.equal('value2');
    });

    describe('paging', () => {
        const data = [{ field: 'value0' }, { field: 'value1' }, { field: 'value2' }];

        it('by default', () => {
            const dataSource = new ClientDataSource(data, { pageSize: 1 });

            dataSource.dataBind();

            expect(dataSource.view.pageIndex).to.equal(0, 'pageIndex');
            expect(dataSource.view.data.length).to.equal(1, 'data.length');
            expect(dataSource.view.data[0].field).to.equal('value0', 'data[0].field');
        });

        it('setPageIndex', () => {
            [{ pageIndex: 0 }, { pageIndex: 1 }, { pageIndex: 2 }]
                .forEach((x, i) => {
                    const dataSource = new ClientDataSource(data, { pageSize: 1 });

                    dataSource.setPageIndex(x.pageIndex).dataBind();

                    expect(dataSource.view.pageIndex).to.equal(x.pageIndex, 'pageIndex');
                    expect(dataSource.view.data.length).to.equal(1, 'data.length');
                    expect(dataSource.view.data[0].field).to.equal('value' + x.pageIndex, 'data[0].field');
                });
        });
    });

    describe('sorting', () => {
        describe('check view properties', () => {
            it ('ascending sorting by one field', () => {
                const dataSource = new ClientDataSource([]);

                dataSource
                    .sort({ direction: SortDirection.Ascending, field: 'field' })
                    .dataBind();

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Ascending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('field', 'sortedBy[0].field');
            });

            it ('descending sorting by one field', () => {
                const dataSource = new ClientDataSource([]);

                dataSource
                    .sort({ direction: SortDirection.Descending, field: 'field' })
                    .dataBind();

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Descending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('field', 'sortedBy[0].field');
            });
        });

        describe('by one "boolean" field', () => {
            const testCases = [
                [{ booleanField: true }, { booleanField: false }, { booleanField: null }],
                [{ booleanField: null }, { booleanField: true }, { booleanField: false }],
                [{ booleanField: null }, { booleanField: false }, { booleanField: true }]
            ];

            it ('ascending sorting', () => {
                testCases.forEach(x => {
                    const dataSource = new ClientDataSource(x);

                    dataSource
                        .sort({ direction: SortDirection.Ascending, field: 'booleanField' })
                        .dataBind();

                    expect(dataSource.view.data[0].booleanField).to.equal(null);
                    expect(dataSource.view.data[1].booleanField).to.equal(false);
                    expect(dataSource.view.data[2].booleanField).to.equal(true);
                });
            });

            it ('descending sorting', () => {
                testCases.forEach(x => {
                    const dataSource = new ClientDataSource(x);

                    dataSource
                        .sort({ direction: SortDirection.Descending, field: 'booleanField' })
                        .dataBind();

                    expect(dataSource.view.data[0].booleanField).to.equal(true);
                    expect(dataSource.view.data[1].booleanField).to.equal(false);
                    expect(dataSource.view.data[2].booleanField).to.equal(null);
                });
            });
        });

        describe('by one "number" field', () => {
            const testCases = [
                [{ numberField: 0 }, { numberField: 1 }, { numberField: 2 }],
                [{ numberField: 2 }, { numberField: 0 }, { numberField: 1 }],
                [{ numberField: 2 }, { numberField: 1 }, { numberField: 0 }]
            ];

            it ('ascending sorting', () => {
                testCases.forEach(x => {
                    const dataSource = new ClientDataSource(x);

                    dataSource
                        .sort({ direction: SortDirection.Ascending, field: 'numberField' })
                        .dataBind();

                    expect(dataSource.view.data[0].numberField).to.equal(0);
                    expect(dataSource.view.data[1].numberField).to.equal(1);
                    expect(dataSource.view.data[2].numberField).to.equal(2);
                });
            });

            it ('descending sorting', () => {
                testCases.forEach(x => {
                    const dataSource = new ClientDataSource(x);

                    dataSource
                        .sort({ direction: SortDirection.Descending, field: 'numberField'})
                        .dataBind();

                    expect(dataSource.view.data[0].numberField).to.equal(2);
                    expect(dataSource.view.data[1].numberField).to.equal(1);
                    expect(dataSource.view.data[2].numberField).to.equal(0);
                });
            });
        });

        describe('by one "string" field', () => {
            const testCases = [
                [{ stringField: 'value0' }, { stringField: 'value1' }, { stringField: 'value2' }],
                [{ stringField: 'value2' }, { stringField: 'value0' }, { stringField: 'value1' }],
                [{ stringField: 'value2' }, { stringField: 'value1' }, { stringField: 'value0' }]
            ];

            it ('ascending sorting', () => {
                testCases.forEach(x => {
                    const dataSource = new ClientDataSource(x);

                    dataSource
                        .sort({ direction: SortDirection.Ascending, field: 'stringField' })
                        .dataBind();

                    expect(dataSource.view.data[0].stringField).to.equal('value0');
                    expect(dataSource.view.data[1].stringField).to.equal('value1');
                    expect(dataSource.view.data[2].stringField).to.equal('value2');
                });
            });

            it ('descending sorting', () => {
                testCases.forEach(x => {
                    const dataSource = new ClientDataSource(x);

                    dataSource
                        .sort({ direction: SortDirection.Descending, field: 'stringField'})
                        .dataBind();

                    expect(dataSource.view.data[0].stringField).to.equal('value2');
                    expect(dataSource.view.data[1].stringField).to.equal('value1');
                    expect(dataSource.view.data[2].stringField).to.equal('value0');
                });
            });
        });

        describe('by one "date" field if value is string', () => {
            const typeConverter = TypeConverterProvider.instance.get(DataType.Date);
            const fieldAccessor = new FieldAccessor({ 'dateField': x => typeConverter.convert(x.dateField) });
            const testCases = [
                [{ dateField: '3/1/2001' }, { dateField: '2/1/2002' }, { dateField: '1/1/2003' }],
                [{ dateField: '1/1/2003' }, { dateField: '3/1/2001' }, { dateField: '2/1/2002' }],
                [{ dateField: '1/1/2003' }, { dateField: '2/1/2002' }, { dateField: '3/1/2001' }]
            ];

            it ('ascending sorting', () => {
                testCases.forEach(x => {
                    const dataSource = new ClientDataSource(x, { fieldAccessor: fieldAccessor });

                    dataSource
                        .sort({ direction: SortDirection.Ascending, field: 'dateField' })
                        .dataBind();

                    expect(dataSource.view.data[0].dateField).to.equal('3/1/2001');
                    expect(dataSource.view.data[1].dateField).to.equal('2/1/2002');
                    expect(dataSource.view.data[2].dateField).to.equal('1/1/2003');
                });
            });

            it ('descending sorting', () => {
                testCases.forEach(x => {
                    const dataSource = new ClientDataSource(x, { fieldAccessor: fieldAccessor });

                    dataSource
                        .sort({ direction: SortDirection.Descending, field: 'dateField'})
                        .dataBind();

                    expect(dataSource.view.data[0].dateField).to.equal('1/1/2003');
                    expect(dataSource.view.data[1].dateField).to.equal('2/1/2002');
                    expect(dataSource.view.data[2].dateField).to.equal('3/1/2001');
                });
            });
        });
    });
});