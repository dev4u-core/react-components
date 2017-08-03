import * as React from 'react';
import { DataSource, DataSourceState } from '../../infrastructure/data-source';
import { DataSourcePager, PageType } from '../../infrastructure/data-source-pager';

function isElementVisible(element) {
    let top = element.offsetTop;
    let left = element.offsetLeft;
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    while(element.offsetParent) {
        element = element.offsetParent;
        top += element.offsetTop;
        left += element.offsetLeft;
    }

    return top >= window.pageYOffset
        && left >= window.pageXOffset
        && (top + height) <= (window.pageYOffset + window.innerHeight)
        && (left + width) <= (window.pageXOffset + window.innerWidth);
}

export interface InfiniteScrollPagerProps {
    dataSource: DataSource<any>;
}

export class InfiniteScrollPager extends React.Component<InfiniteScrollPagerProps, any> {
    private _visibilityDetector: HTMLElement;

    public constructor(props: InfiniteScrollPagerProps) {
        super(props);

        this.state = { isLoading: false };

        this.handleScroll = this.handleScroll.bind(this);
    }

    public componentDidMount() {
        document.addEventListener('scroll', this.handleScroll);
        document.addEventListener('resize', this.handleScroll);
    }

    public componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener('resize', this.handleScroll);
    }

    protected handleScroll() {
        if ((this.props.dataSource.state != DataSourceState.Binding) && isElementVisible(this._visibilityDetector)) {
            const dataSourcePager = new DataSourcePager(this.props.dataSource);

            dataSourcePager.moveToPage(PageType.Next);
        }
    }

    public render(): JSX.Element {
        return (
            <div onScroll={this.handleScroll}>
                {this.props.children}
                <div ref={x => this._visibilityDetector = x} />
            </div>
        );
    }
}