import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Column } from '../src/components/table/column';
import { DetailsColumn } from '../src/components/table/details-column';
import { Table } from '../src/components/table/table';
import { ClientDataSource } from '../src/infrastructure/data-source';

function getData(index): any[] {
    const result = [];

    for (let i = 0; i < 10; i++) {
        const items = (index == 0) ? getData(1) : null;

        result.push({ description: `description${index}${i}`, items: items, title: `title${index}${i}` })
    }

    return result;
}

const dataSource = new ClientDataSource(getData(0));

ReactDom.render(
    <Table autoBind={true} dataSource={dataSource}>
        <DetailsColumn detailsRowTemplate={(column, model, rowIndex) =>
            <Table autoBind={true} dataSource={new ClientDataSource(model.items)}>
                <Column field="title" title="Title" />
            </Table>
        } />
        <Column field="title" title="Title" />
        <Column field="description" title="Description" />
        <Column
            isSortable={false}
            body={{ template: (sender, x) => (<a href="javascript:">{x.title}</a>)}}
            title="Link" />
    </Table>,
    document.getElementById('grid')
);