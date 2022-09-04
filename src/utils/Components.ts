import EventBus from "./EventBus";
// @ts-ignore
import {v4 as makeUUID} from 'uuid';

class Components<T = any> {

    public static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
        FLOW_ADD_EVENTS: "flow:add-events",
    };

    id = null;
    children: Record<string, Components>;

    _element: HTMLElement | null = null;
    _meta: { props: any };
    _eventBus: () => EventBus;
    props: Record<string, any>;

    constructor(propsAndChildren: object = {}) {
        const {children, props} = this._getChildren(propsAndChildren);

        this.children = children;

        const eventBus = new EventBus();

        this._meta = {
            props
        };

        this.id = makeUUID();

        this.props = this._makePropsProxy({...props, __id: this.id});

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
        const contextAndStubs = {...context};

        const html = template(contextAndStubs);

        const tempFragment = document.createElement('template');

        tempFragment.innerHTML = html;

        Object.entries(this.children).forEach(([_, component]) => {
            // @ts-ignore
            const stub = tempFragment.content.querySelector(`[data-id="${component.id}"]`);

            if (!stub) {
                return;
            }

            // @ts-ignore
            stub.replaceWith(component.getContent()!);
        });

        return tempFragment.content;
    }

    componentDidMount() {
    }

    dispatchComponentDidMount() {
        this._eventBus().emit(Components.EVENTS.FLOW_CDM);
    }

    // @ts-ignore
    componentDidUpdate(oldProps, newProps) {
        return JSON.stringify(oldProps) === JSON.stringify(newProps);
    }

    // @ts-ignore
    setProps = nextProps => {
        if (!nextProps) {
            return;
        }

        // @ts-ignore
        Object.assign(this.props, nextProps);
    };

    setChildren = (element: string, value: Record<string, Components>) => {
        if (!value) {
            return;
        }

        // @ts-ignore
        this.children[element] = value;
    };

    getProps = () => {
        return this.props;
    };

    get element() {
        return this._element;
    }

    render(): DocumentFragment {
        return new DocumentFragment();
    }

    show() {
        // @ts-ignore
        this.getContent().style.display = "block";
    }

    hide() {
        // @ts-ignore
        this.getContent().style.display = "none";
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

    // @ts-ignore
    _registerEvents(eventBus) {
        eventBus.on(Components.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Components.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Components.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Components.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Components.EVENTS.FLOW_ADD_EVENTS, this._addEvents.bind(this));
    }

    // @ts-ignore
    _getChildren(propsAndChildren) {
        const children: Record<string, Components> = {};
        const props: Record<string, any> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Components) {
                // @ts-ignore
                children[key] = value;
            } else {
                // @ts-ignore
                props[key] = value;
            }
        });

        return {children, props};
    }

    _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach(child => {
            // @ts-ignore
            child.dispatchComponentDidMount();
        });
    }

    // @ts-ignore
    _componentDidUpdate(oldProps, newProps) {
        if (!this.componentDidUpdate(oldProps, newProps)) {
            this._eventBus().emit(Components.EVENTS.FLOW_RENDER);
        }
    }

    // @ts-ignore
    _makePropsProxy(props) {
        const self = this;

        return new Proxy(props, {
            get(target, p, receiver) {
                const value = target[p];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, p, value, receiver) {
                const oldProps = {...target};
                target[p] = value;

                self._eventBus().emit(Components.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty(target, p) {
                throw new Error('нет доступа');
            }
        });
    }

    _addEvents() {
        // @ts-ignore
        const {events = {}} = this.props;

        // @ts-ignore
        Object.keys(events).forEach(eventName => {
            // @ts-ignore
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