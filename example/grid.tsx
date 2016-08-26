import { ClientDataSource } from '../src/data-source';
import { Grid } from '../src/grid';
import * as React from 'react';
import * as ReactDom from 'react-dom';

let columns = [
    { title: 'Title', propertyName: 'title' },
    { title: 'Description', propertyName: 'description' }
];
let dataSource = new ClientDataSource([
    { title: 'title0', description: 'description0' },
    { title: 'title1', description: 'description1' },
    { title: 'title2', description: 'description2' }
]);

dataSource.dataBind();

ReactDom.render(
    <Grid columns={columns} dataSource={dataSource}>
    </Grid>,
    document.getElementById('grid'));