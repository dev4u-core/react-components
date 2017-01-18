import * as Enzyme from 'enzyme';
import { expect } from 'chai';
import * as React from 'react';
import { Grid } from '../../src/components/grid';
import { GridColumn } from '../../src/components/grid-column';
import { ClientDataSource, DataSource, SortDirection } from '../../src/infrastructure/data-source';

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
                        <GridColumn field="title" title="Title" />
                        <GridColumn field="description" title="Description" />
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
                grid.find('th a')
                    .first()
                    .simulate('click')
                    .simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Descending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('title', 'sortedBy[0].field');
            });
            it('three click on first column', () => {
                grid.find('th a')
                    .first()
                    .simulate('click')
                    .simulate('click')
                    .simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(0, 'sortedBy.length');
            });
            it('two click on first column and one click on last column', () => {
                grid.find('th a')
                    .first()
                    .simulate('click')
                    .simulate('click');
                grid.find('th a')
                    .last()
                    .simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Ascending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].field).to.equal('description', 'sortedBy[0].field');
            });
        });
    });
    describe('property', () => {
        let style = {
            className: 'class0',
            content: 'display: none'
        };

        describe('body', () => {
            it('styleTemplate', () => {
                let grid = Enzyme.mount(
                    <Grid autoBind={true} dataSource={new ClientDataSource([{}])}>
                        <GridColumn body={{ styleTemplate: () => style }} field="title" title="Title" />
                    </Grid>
                );

                expect(grid.find(`tbody td.${style.className}`).length).to.equal(1);
                expect(grid.find('style').html()).to.equal(`<style>.${style.className} {${style.content}}</style>`);
            });
        });
        describe('header', () => {
            it('styleTemplate', () => {
                let grid = Enzyme.mount(
                    <Grid autoBind={true} dataSource={new ClientDataSource([{}])}>
                        <GridColumn header={{ styleTemplate: () => style }} field="title" title="Title" />
                    </Grid>
                );

                expect(grid.find(`th.${style.className}`).length).to.equal(1);
                expect(grid.find('style').html()).to.equal(`<style>.${style.className} {${style.content}}</style>`);
            });
        });
    });
});