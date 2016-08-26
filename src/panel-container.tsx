import * as React from 'react';
import { IPanelProps, Panel } from './panel';

enum Mode {
    DynamicAndStatic = 1 << 0,
    StaticAndDynamic = 1 << 1
}

enum Orientation
{
    Horizontal = 1 << 0,
    Vertical = 1 << 1
}

interface IProps {
    dynamicPanels?: IPanelProps[];
    mode?: Mode;
    orientation?: Orientation;

    onPanelClosed?: (panel: Panel) => void;
    onPanelClosing?: (panel: Panel) => boolean;
}

interface IRenderContext {
    defaultColumnCount: number;
    orientation: Orientation;
}

interface IState {
    dynamicPanels: IPanelProps[];
    staticPanels: IPanelProps[];
}

export class PanelContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.handleDynamicPanelClosed = this.handleDynamicPanelClosed.bind(this);
        this.handleStaticPanelClosed = this.handleStaticPanelClosed.bind(this);
        this.handlePanelClosing = this.handlePanelClosing.bind(this);

        this.state = { dynamicPanels: props.dynamicPanels || [], staticPanels: this.getStaticPanels() };
    }

    private getStaticPanels(): IPanelProps[] {
        return this.props.children
            ? React.Children.map(this.props.children, x => x as any as Panel)
                .map(x => x.props)
            : [];
    }

    protected handleDynamicPanelClosed(panel: Panel) {
        let dynamicPanelIndex = this.state.dynamicPanels.indexOf(panel);
        this.state.dynamicPanels.splice(dynamicPanelIndex, 1);

        this.forceUpdate();
    }
    protected handlePanelClosing(panel: Panel): boolean {
        return this.props.onPanelClosing ? this.props.onPanelClosing(panel) : true;
    }
    protected handleStaticPanelClosed(panel: Panel) {
        let staticPanelIndex = this.state.staticPanels.indexOf(panel);
        this.state.staticPanels.splice(staticPanelIndex, 1);

        this.forceUpdate();
    }
    protected renderDynamicPanel(renderContext: IRenderContext, panel: IPanelProps, index: number): JSX.Element {
        let columnCount = panel.columnCount || renderContext.defaultColumnCount;
        return <Panel columnCount={columnCount}
            key={`dynamic_panel_${index}`}
            title={panel.title}
            onClosed={this.handleDynamicPanelClosed}
            onClosing={this.handlePanelClosing} />;
    }
    protected renderDynamicPanels(renderContext: IRenderContext): JSX.Element[] {
        return this.state.dynamicPanels.map((x, i) => this.renderDynamicPanel(renderContext, x, i));
    }
    protected renderStaticPanel(renderContext: IRenderContext, panel: IPanelProps, index: number): JSX.Element {
        return React.cloneElement(
            panel as any,
            {
                columnCount: panel.columnCount || renderContext.defaultColumnCount,
                key: `static_panel_${index}`,
                onClosed: this.handleStaticPanelClosed,
                onClosing: this.handlePanelClosing
            });
    }
    protected renderStaticPanels(renderContext: IRenderContext): JSX.Element[] {
        var result = React.Children.map(
            this.props.children,
            (x, i) => (this.state.staticPanels.indexOf((x as any).props) !== -1) ? this.renderStaticPanel(renderContext, x as any, i) : null);
        return (result != null) ? result.filter(x => x != null) : null;
    }

    public render() {
        let mode = this.props.mode || Mode.DynamicAndStatic;
        let orientation = this.props.orientation || Orientation.Horizontal;
        let containerClassName = (orientation == Orientation.Horizontal) ? 'row' : 'panel-group';
        let renderContext = {
            defaultColumnCount: (orientation == Orientation.Horizontal)
                ? Math.floor(12 / this.state.dynamicPanels.concat(this.state.staticPanels).length)
                : null,
            orientation: orientation
        };

        return (
            <div className={containerClassName}>
                {(mode == Mode.StaticAndDynamic) ? this.renderStaticPanels(renderContext) : null}
                {this.renderDynamicPanels(renderContext)}
                {(mode == Mode.DynamicAndStatic) ? this.renderStaticPanels(renderContext) : null}
            </div>
        );
    }
}

export {
    Mode as PanelContainerMode,
    Orientation as PanelContainerOrientation,
    IRenderContext as IPanelContainerRenderContext
};