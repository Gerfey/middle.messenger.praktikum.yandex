import Components from './Components';

export default class Route {
    private pathname: string;
    private blockClass: typeof Components;
    private block: Components | null;
    private props: any;

    constructor(pathname: string, view: typeof Components, props: any) {
        this.pathname = pathname;
        this.blockClass = view;
        this.block = null;
        this.props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this.block) {
            this.block.getContent()?.remove();
        }
    }

    match(pathname: string) {
        return pathname === this.pathname;
    }

    render() {
        if (!this.block) {
            this.block = new this.blockClass({});
        }

        const root = document.querySelector(this.props);

        if (!root) {
            throw new Error('Root not found');
        }

        root.innerHTML = '';
        root.appendChild(this.block.getContent());
    }
}
