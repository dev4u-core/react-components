import { expect } from 'chai';
import * as Enzyme from 'enzyme';
import * as React from 'react';
import { Panel, PanelProps } from '../../src/components/panel';
import { PanelContainer, PanelContainerState, PanelContainerMode, PanelContainerOrientation } from '../../src/components/panel-container';

describe('<PanelContainer />', () => {
    describe('initialization', () => {
        it('"staticPanels" property should be initialized', () => {
            let panelContainer = Enzyme.mount<any, PanelContainerState>(
                <PanelContainer>
                    <Panel title="panel0" />
                    <Panel title="panel1" />
                    <Panel title="panel2" />
                </PanelContainer>
            );
            let staticPanels = panelContainer.state().staticPanels;

            expect(staticPanels.length).to.equal(3);
            expect(staticPanels[0].title).to.equal('panel0');
            expect(staticPanels[1].title).to.equal('panel1');
            expect(staticPanels[2].title).to.equal('panel2');
        });
    });

    describe('behaviour', () => {
        it('panel should be closed (dynamic with 3 panel)', () => {
            let dynamicPanels = [{ title: 'panel0' }, { title: 'panel1' }, { title: 'panel2' }];
            let panelContainer = Enzyme.mount<any, PanelContainerState>(<PanelContainer dynamicPanels={dynamicPanels} />);

            for (let i = dynamicPanels.length - 1; i > 0; i--) {
                panelContainer.find('button.close').last().simulate('click');

                expect(panelContainer.state().dynamicPanels.length).to.equal(i);
            }
        });

        it('panel should not be closed (dynamic with 3 panel)', () => {
            let dynamicPanels = [{ title: 'panel0' }, { title: 'panel1' }, { title: 'panel2' }];
            let panelContainer = Enzyme.mount<any, PanelContainerState>(<PanelContainer dynamicPanels={dynamicPanels} onPanelClosing={() => false} />);

            panelContainer.find('button.close').last().simulate('click');

            expect(panelContainer.state().dynamicPanels.length).to.equal(3);
        });

        it('panel should be closed (static with 1 panel)', () => {
            let panelContainer = Enzyme.mount<any, PanelContainerState>(<PanelContainer onPanelClosing={() => true}><Panel /></PanelContainer>);
            panelContainer.find('button.close').last().simulate('click');

            expect(panelContainer.state().staticPanels.length).to.equal(0);
        });

        it('panel should be closed (static with 2 panels)', () => {
            let panelContainer = Enzyme.mount<any, PanelContainerState>(<PanelContainer onPanelClosing={() => true}><Panel /><Panel /></PanelContainer>);
            panelContainer.find('button.close').last().simulate('click');

            expect(panelContainer.state().staticPanels.length).to.equal(1);
        });

        it('panel should not be closed (static with 1 panel)', () => {
            let panelContainer = Enzyme.mount<any, PanelContainerState>(<PanelContainer onPanelClosing={() => false}><Panel /></PanelContainer>);
            panelContainer.find('button.close').last().simulate('click');

            expect(panelContainer.state().staticPanels.length).to.equal(1);
        });

        it('panel should not be closed (static with 2 panels)', () => {
            let panelContainer = Enzyme.mount<any, PanelContainerState>(<PanelContainer onPanelClosing={() => false}><Panel /><Panel /></PanelContainer>);
            panelContainer.find('button.close').last().simulate('click');

            expect(panelContainer.state().staticPanels.length).to.equal(2);
        });
    });

    describe('property', () => {
        describe('mode', () => {
            it('mode == DynamicAndStatic (it is the same as default)', () => {
                let dynamicPanels = [{ title: 'dynamicPanel' }];
                let panelContainer = Enzyme.mount(
                    <PanelContainer dynamicPanels={dynamicPanels}>
                        <Panel title="staticPanel" />
                    </PanelContainer>
                );

                let panels = panelContainer.find(Panel);
                expect((panels.at(0).props() as PanelProps).title).to.equal('dynamicPanel');
                expect((panels.at(1).props() as PanelProps).title).to.equal('staticPanel');
            });

            it('mode == StaticAndDynamic', () => {
                let dynamicPanels = [{ title: 'dynamicPanel' }];
                let panelContainer = Enzyme.mount(
                    <PanelContainer dynamicPanels={dynamicPanels} mode={PanelContainerMode.StaticAndDynamic}>
                        <Panel title="staticPanel" />
                    </PanelContainer>
                );

                let panels = panelContainer.find(Panel);
                expect((panels.at(0).props() as PanelProps).title).to.equal('staticPanel');
                expect((panels.at(1).props() as PanelProps).title).to.equal('dynamicPanel');
            });
        });

        describe('orientation', () => {
            const columnCountsByTestCase: number[][] = [
                [12],
                [6, 6],
                [4, 4, 4],
                [3, 3, 3, 3],
                [2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2],
                [1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];

            it('orientation == Horizontal (it is the same as default)', () => {
                columnCountsByTestCase.forEach(columnCounts => {
                    let panelContainer = Enzyme.mount(<PanelContainer>{columnCounts.map(x => <Panel />)}</PanelContainer>);
                    var panels = panelContainer.find(Panel);

                    for (let i = 0; i < columnCounts.length; i++) {
                        expect((panels.at(i).props() as PanelProps).columnCount).to.equal(columnCounts[i], `panels.length = ${panels.length}`);
                    }
                });
            });

            it('orientation == Vertical', () => {
                columnCountsByTestCase.forEach(columnCounts => {
                    let panelContainer = Enzyme.mount(<PanelContainer orientation={PanelContainerOrientation.Vertical}>{columnCounts.map(x => <Panel />)}</PanelContainer>);
                    var panels = panelContainer.find(Panel);

                    for (let i = 0; i < columnCounts.length; i++) {
                        expect((panels.at(i).props() as PanelProps).columnCount).is.null;
                    }
                });
            });
        });
    });
});