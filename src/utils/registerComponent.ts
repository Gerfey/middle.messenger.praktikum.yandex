import Components from "./Components";
import {HelperOptions} from 'handlebars';
// @ts-ignore
import Handlebars from "handlebars/dist/handlebars.runtime";

// @ts-ignore
export function registerComponent(name: string, Component: typeof Components): HelperOptions {
    console.log(name, 'components');
    // @ts-ignore
    Handlebars.registerHelper(name, ({data, fn, hash}) => {
        const component = new Component(hash);

        if (!data.root.children) {
            data.root.children = {};
        }

        // @ts-ignore
        data.root.children[component.id] = component.getContent();

        console.log(data.root.children);

        return component.getContent()?.outerHTML;
    });
}