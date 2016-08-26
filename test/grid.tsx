import * as Enzyme from 'enzyme';
import { expect } from 'chai';
import * as React from 'react';
import { ClientDataSource, IDataSource, SortDirection } from '../src/data-source';
import { Grid } from '../src/grid';

describe('<Grid />', () => {
    describe('behaviour', () => {
        describe('sorting', () => {
            let columns = [
                { title: 'Title', propertyName: 'title' },
                { title: 'Description', propertyName: 'description' }
            ];
            let dataSource: IDataSource<any>;
            let grid;

            beforeEach(() => {
                dataSource = new ClientDataSource([]);
                dataSource.dataBind();

                grid = Enzyme.mount(<Grid columns={columns} dataSource={dataSource} />);
            });

            it('one click on first column', () => {
                grid.find('th a').first().simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Ascending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].propertyName).to.equal('title', 'sortedBy[0].propertyName');
            });
            it('one click on first column and one click by last column', () => {
                grid.find('th a').first().simulate('click');
                grid.find('th a').last().simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Ascending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].propertyName).to.equal('description', 'sortedBy[0].propertyName');
            });
            it('two click on first column', () => {
                grid.find('th a').first()
                    .simulate('click')
                    .simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Descending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].propertyName).to.equal('title', 'sortedBy[0].propertyName');
            });
            it('two click on first column and one click on last column', () => {
                grid.find('th a').first()
                    .simulate('click')
                    .simulate('click');
                grid.find('th a').last().simulate('click');

                expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
                expect(dataSource.view.sortedBy[0].direction).to.equal(SortDirection.Ascending, 'sortedBy[0].direction');
                expect(dataSource.view.sortedBy[0].propertyName).to.equal('description', 'sortedBy[0].propertyName');
            });
        });
    });
});