import * as Enzyme from 'enzyme';
import { expect } from 'chai';
import * as React from 'react';
import { Column } from '../../src/components/table/column';
import { Table } from '../../src/components/table/table';
import { SortDirection } from '../../src/infrastructure/common';
import { ClientDataSource, DataSource } from '../../src/infrastructure/data-source';

describe('<Table />', () => {
    describe('behaviour', () => {
        describe('sorting', () => {
            let dataSource: DataSource<any>;
            let table;

            beforeEach(() => {
                dataSource = new ClientDataSource([]);
                dataSource.dataBind();

                table = Enzyme.mount(
                    <Table dataSource={dataSource}>
                        <Column field="title" title="Title" />
                        <Column field="description" title="Description" />
                    </Table>
                );
            });

            it('one click on first column', () => {
                table.find('th a').first().simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Ascending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('title', 'sortedBy[0].field');
            });

            it('one click on first column and one click by last column', () => {
                table.find('th a').first().simulate('click');
                table.find('th a').last().simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Ascending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('description', 'sortedBy[0].field');
            });

            it('two click on first column', () => {
                table.find('th a')
                    .first()
                    .simulate('click')
                    .simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Descending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('title', 'sortedBy[0].field');
            });

            it('three click on first column', () => {
                table.find('th a')
                    .first()
                    .simulate('click')
                    .simulate('click')
                    .simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(0, 'sortedBy.length');
            });

            it('two click on first column and one click on last column', () => {
                table.find('th a')
                    .first()
                    .simulate('click')
                    .simulate('click');
                table.find('th a')
                    .last()
                    .simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Ascending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('description', 'sortedBy[0].field');
            });
        });
    });

    describe('property', () => {
        const cssClass = {
            name: 'class0',
            styles: 'content: \'value0\';'
        };

        describe('body', () => {
            it('className', () => {
                const table = Enzyme.mount(
                    <Table autoBind={true} dataSource={new ClientDataSource([{}])}>
                        <Column body={{ className: 'class0' }} field="title" title="Title" />
                    </Table>
                );

                expect(table.find(`tbody td.class0`).length).to.equal(1);
            });
        });

        describe('header', () => {
            it('className', () => {
                let table = Enzyme.mount(
                    <Table autoBind={true} dataSource={new ClientDataSource([{}])}>
                        <Column header={{ className: 'class0' }} field="title" title="Title" />
                    </Table>
                );

                expect(table.find(`th.class0`).length).to.equal(1);
            });
        });
    });
});