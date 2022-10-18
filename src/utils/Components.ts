import {EventBus} from './EventBus';
import {nanoid} from 'nanoid';

class Components<P extends Record<string, any> = any> {
    public static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
        FLOW_ADD_EVENTS: 'flow:add-events',
    };

    public id = nanoid(6);
    public children: Record<string, Components>;
    public refs: Record<string, Components> = {};
    public props: P;

    public element: HTMLElement | null = null;
    private _eventBus: () => EventBus;

    static componentName: string | undefined;

    constructor(propsAndChildren: P) {
        const eventBus = new EventBus();

        const {children, props} = this._getChildren(propsAndChildren);

        this.children = children;
        this.props = this._makePropsProxy(props);

        this._eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Components.EVENTS.INIT);
    }

    public compile(template: (context: any) => string, context: any) {
        const html = template({...context, children: this.children, refs: this.refs});

        const tempFragment = document.createElement('template');

        tempFragment.innerHTML = html;

        Object.entries(this.children).forEach(([_, component]) => {
            const stub = tempFragment.content.querySelector(`[data-id="id-${component.id}"]`);

            if (!stub) {
                return;
            }

            const content = component.getContent()!;

            stub.replaceWith(content);

            if (stub.childNodes.length) {
                // @ts-ignore
                content.append(...stub.childNodes);
            }
        });

        return tempFragment.content;
    }

    public getContent() {
        return this.element;
    }

    protected componentDidMount() {
        return true;
    }

    protected dispatchComponentDidMount() {
        this._eventBus().emit(Components.EVENTS.FLOW_CDM);
    }

    protected componentDidUpdate(oldProps: P, newProps: P) {
        return JSON.stringify(oldProps) === JSON.stringify(newProps);
    }

    public setProps = (nextProps: P) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    private _init() {
        this.init();

        this._eventBus().emit(Components.EVENTS.FLOW_RENDER);
        this._eventBus().emit(Components.EVENTS.FLOW_ADD_EVENTS);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public init(): void {}

    private _render() {
        const fragment = this.render();

        const newElement = fragment.firstElementChild as HTMLElement;

        if (this.element) {
            this._removeEvents();
            this.element.replaceWith(newElement);
        }

        this.element = newElement;

        this._addEvents();
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Components.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Components.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Components.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Components.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Components.EVENTS.FLOW_ADD_EVENTS, this._addEvents.bind(this));
    }

    private _getChildren(propsAndChildren: P): { props: P, children: Record<string, Components> } {
        const children: Record<string, Components | Components[]> = {};
        const props: Record<string, unknown> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Components) {
                children[key as string] = value;
            } else if (Array.isArray(value) && value.length > 0 && value.every(v => (v instanceof Components))) {
                children[key as string] = value;
            } else {
                props[key] = value;
            }
        });

        return {children: children as Record<any, Components>, props: props as P};
    }

    private _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        if (!this.componentDidUpdate(oldProps, newProps)) {
            this._eventBus().emit(Components.EVENTS.FLOW_RENDER);
        }
    }

    private _makePropsProxy(props: P) {
        const self = this;

        return new Proxy(props, {
            get(target: P, p: string) {
                const value = target[p as keyof P];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: P, p: string, value) {
                const oldProps = {...target};
                target[p as keyof P] = value;

                self._eventBus().emit(Components.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error('нет доступа');
            },
        });
    }

    private _addEvents() {
        const {events = {}} = this.props;

        Object.keys(events).forEach((eventName) => {
            this.element?.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if (!events || !this.element) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this.element!.removeEventListener(event, listener);
        });
    }
}

export default Components;
