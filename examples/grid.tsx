import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Column } from '../src/components/grid/column';
import { DetailsColumn } from '../src/components/grid/details-column';
import { InfiniteScrollPager } from '../src/components/pager/infinite-scroll-pager';
import { Grid } from '../src/components/grid/grid';
import { ClientDataSource, DataViewMode } from '../src/infrastructure/data-source';

function getData(count: number): any[] {
    const result = [];

    for (let i = 0; i < count; i++) {
        result.push({ description: `description${i}`, title: `title${i}` })
    }

    return result;
}

const dataSource = new ClientDataSource(getData(1000), { pageSize: 50, viewMode: DataViewMode.FromFirstToCurrentPage });

ReactDom.render(
    <InfiniteScrollPager dataSource={dataSource}>
        <Grid autoBind={true} dataSource={dataSource}>
            <DetailsColumn detailsRowTemplate={(column, model, rowIndex) =>
                <Grid autoBind={true} dataSource={new ClientDataSource(model.items)}>
                    <Column field="title" title="Title" />
                </Grid>
            } />
            <Column field="title" title="Title" />
            <Column field="description" title="Description" />
            <Column
                isSortable={false}
                body={{ template: (sender, x) => (<a href="javascript:">{x.title}</a>)}}
                title="Link" />
        </Grid>
    </InfiniteScrollPager>,
    document.getElementById('grid')
);