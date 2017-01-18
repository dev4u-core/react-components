import * as React from 'react';

export interface PanelProps {
    columnCount?: number;
    title?: string;

    onClosed?: (panel: Panel) => void;
    onClosing?: (panel: Panel) => boolean;
}

export class Panel extends React.Component<PanelProps, any> {
    constructor(props: PanelProps) {
        super();
        this.handleClose = this.handleClose.bind(this);
    }

    protected handleClose() {
        let shouldBeClosed = true;
        if (this.props.onClosing) {
            shouldBeClosed = this.props.onClosing(this);
        }

        if (shouldBeClosed && this.props.onClosed) this.props.onClosed(this);
    }
    protected renderBody(): any {
        return this.props.children;
    }

    public render(): JSX.Element {
        var wrapper: (panelRenderer: JSX.Element) => JSX.Element =
            this.props.columnCount
                ? panelRenderer => <div className={"col-md-" + this.props.columnCount}>{panelRenderer}</div>
                : panelRenderer => panelRenderer;

        return wrapper(
            <div className="panel panel-default">
                <div className="panel-heading">
                    {this.props.title}
                    <button className="close" onClick={this.handleClose} type="button">
                        <span>&times;</span>
                    </button>
                </div>
                <div className="panel-body">{this.renderBody()}</div>
            </div>
        );
    }
}