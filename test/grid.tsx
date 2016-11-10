import * as Enzyme from 'enzyme';
import { expect } from 'chai';
import * as React from 'react';
import { ClientDataSource, DataSource, SortDirection } from '../src/data-source';
import { Grid, GridColumn } from '../src/grid';

describe('<Grid />', () => {
    describe('behaviour', () => {
        describe('sorting', () => {
            let dataSource: DataSource<any>;
            let grid;

            beforeEach(() => {
                dataSource = new ClientDataSource([]);
                dataSource.dataBind();

                grid = Enzyme.mount(
                    <Grid dataSource={dataSource}>
                        <GridColumn title="Title" field="title" />
                        <GridColumn title="Description" field="description" />
                    </Grid>
                );
            });

            it('one click on first column', () => {
                grid.find('th a').first().simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Ascending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('title', 'sortedBy[0].field');
            });
            it('one click on first column and one click by last column', () => {
                grid.find('th a').first().simulate('click');
                grid.find('th a').last().simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Ascending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('description', 'sortedBy[0].field');
            });
            it('two click on first column', () => {
                grid.find('th a').first()
                    .simulate('click')
                    .simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Descending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('title', 'sortedBy[0].field');
            });
            it('two click on first column and one click on last column', () => {
                grid.find('th a').first()
                    .simulate('click')
                    .simulate('click');
                grid.find('th a').last().simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Ascending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('description', 'sortedBy[0].field');
            });
        });
    });
    describe('events', () => {
        it('onCellDataBinding', () => {
            expect(0).to.equal(1);
        });
    });
});