import Components from "./Components";
import {HelperOptions} from 'handlebars';
// @ts-ignore
import Handlebars from "handlebars/dist/handlebars.runtime";

// @ts-ignore
export function registerComponent(name: string, Component: typeof Components): HelperOptions {
    // @ts-ignore
    Handlebars.registerHelper(name, ({data, fn, hash}) => {
        if (!data.root.children) {
            data.root.children = {};
        }

        if (!data.root.refs) {
            data.root.refs = {};
        }

        const { children } = data.root;

        const component = new Component(hash);

        if (hash.ref) {
            data.root.refs[hash.ref] = component;
        }

        children[component.id] = component;

        // @ts-ignore
        const contents = fn ? fn(this) : '';

        return `<div data-id="id-${component.id}">${contents}</div>`;
    });
}