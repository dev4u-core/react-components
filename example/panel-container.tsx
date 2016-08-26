import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Panel } from '../src/panel';
import { PanelContainer } from '../src/panel-container';

let dynamicPanels = [{ title: 'dynamicPanel0' }, { title: 'dynamicPanel1' }];

ReactDom.render(
    <PanelContainer dynamicPanels={dynamicPanels}>
        <Panel title="staticPanel0" />
        <Panel title="staticPanel1" />
    </PanelContainer>,
    document.getElementById('panelContainer'));