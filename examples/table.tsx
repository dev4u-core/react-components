import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DetailsTableColumn } from '../src/components/table/details-table-column';
import { Table } from '../src/components/table/table';
import { TableColumn } from '../src/components/table/table-column';
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
        <DetailsTableColumn detailsRowTemplate={(column, model, rowIndex) =>
            <Table autoBind={true} dataSource={new ClientDataSource(model.items)}>
                <TableColumn field="title" title="Title" />
            </Table>
        } />
        <TableColumn field="title" title="Title" />
        <TableColumn field="description" title="Description" />
        <TableColumn
            isSortable={false}
            body={{ template: (sender, x) => (<a href="javascript:">{x.title}</a>)}}
            title="Link" />
    </Table>,
    document.getElementById('grid')
);