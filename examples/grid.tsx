import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ClientDataSource } from './../src/data-source';
import { Grid } from './../src/grid';
import { DetailGridColumn, GridColumn } from './../src/grid-column';

function getData(index): any[] {
    let result = [];
    for (let i = 0; i < 10; i++) {
        let items = (index == 0) ? getData(1) : null;
        result.push({ description: `description${index}${i}`, items: items, title: `title${index}${i}` })
    }
    return result;
}

let dataSource = new ClientDataSource(getData(0));

ReactDom.render(
    <Grid autoBind={true} dataSource={dataSource}>
        <DetailGridColumn detailRowTemplate={(column, model, rowIndex) =>
            <Grid autoBind={true} dataSource={new ClientDataSource(model.items)}>
                <GridColumn field="title" title="Title" />
            </Grid>
        } />
        <GridColumn field="title" title="Title" />
        <GridColumn field="description" title="Description" />
        <GridColumn
            isSortable={false}
            bodyTemplate={(sender, x) => (<a href="javascript:">{x.title}</a>)}
            title="Link" />
    </Grid>,
    document.getElementById('grid')
);