import EventBus from './EventBus';

import {nanoid} from 'nanoid';

class Components<T = any> {
    public static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
        FLOW_ADD_EVENTS: 'flow:add-events',
    };

    id = nanoid(6);
    children: Record<string, Components>;
    refs: Record<string, Components> = {};

    _element: HTMLElement | null = null;
    _meta: { props: any };
    _eventBus: () => EventBus;
    props: Record<string, any>;

    static componentName: string | undefined;

    constructor(propsAndChildren: object = {}) {
        const eventBus = new EventBus();
        const {children, props} = this._getChildren(propsAndChildren);

        this.children = children;

        this._meta = {
            props,
        };

        this.props = this._makePropsProxy(props);

        this._eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Components.EVENTS.INIT);
    }

    getContent() {
        return this.element;
    }

    init() {
        this._eventBus().emit(Components.EVENTS.FLOW_RENDER);
        this._eventBus().emit(Components.EVENTS.FLOW_ADD_EVENTS);
    }

    compile(template: (context: any) => string, context: any) {
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
                content.append(...stub.childNodes);
            }
        });

        return tempFragment.content;
    }

    componentDidMount() {
        return true;
    }

    dispatchComponentDidMount() {
        this._eventBus().emit(Components.EVENTS.FLOW_CDM);
    }

    componentDidUpdate(oldProps, newProps) {
        return JSON.stringify(oldProps) === JSON.stringify(newProps);
    }

    setProps = (nextProps) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    render(): DocumentFragment {
        return new DocumentFragment();
    }

    _render() {
        const fragment = this.render();

        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element) {
            this._removeEvents();
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();
    }

    _registerEvents(eventBus) {
        eventBus.on(Components.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Components.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Components.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Components.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Components.EVENTS.FLOW_ADD_EVENTS, this._addEvents.bind(this));
    }

    _getChildren(propsAndChildren) {
        const children: Record<string, Components> = {};
        const props: Record<string, any> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Components) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {children, props};
    }

    _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    _componentDidUpdate(oldProps: any, newProps: any) {
        if (!this.componentDidUpdate(oldProps, newProps)) {
            this._eventBus().emit(Components.EVENTS.FLOW_RENDER);
        }
    }

    _makePropsProxy(props: Record<string, any>) {
        const self = this;

        return new Proxy(props, {
            get(target: Record<string, any>, p: string) {
                const value = target[p];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: Record<string, any>, p: string, value) {
                const oldProps = {...target};
                target[p] = value;

                self._eventBus().emit(Components.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error('нет доступа');
            },
        });
    }

    _addEvents() {
        const {events = {}} = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if (!events || !this._element) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.removeEventListener(event, listener);
        });
    }
}

export default Components;
