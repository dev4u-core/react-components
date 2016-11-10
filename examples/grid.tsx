import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ClientDataSource } from './../src/data-source';
import { Grid, GridColumn } from './../src/grid';

function getData(): any[] {
    let result = [];
    for (let i = 0; i < 10; i++) {
        result.push({ description: `description${i}`, title: `title${i}` })
    }
    return result;
}

let dataSource = new ClientDataSource(getData());
dataSource.dataBind();

ReactDom.render(
    <Grid dataSource={dataSource}>
        <GridColumn field="title" title="Title" />
        <GridColumn field="description" title="Description" />
        <GridColumn
            isSortable={false}
            onCellDataBinding={(sender, x) => (<a href="javascript:">{x.title}</a>)}
            title="Link" />
    </Grid>,
    document.getElementById('grid')
);