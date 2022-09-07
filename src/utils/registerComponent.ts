import Components from './Components';
import {HelperOptions} from 'handlebars';
import Handlebars from 'handlebars/dist/handlebars.runtime';

export interface ComponentInterface<Props extends Record<string, unknown>> {
  new(props: Props): Components;

  componentName: string;
}

export function registerComponent(name: string, Component: ComponentInterface<any>) {
    Handlebars.registerHelper(
        name,
        ({data, fn, hash}: HelperOptions) => {
            if (!data.root.children) {
                data.root.children = {};
            }

            if (!data.root.refs) {
                data.root.refs = {};
            }

            const {children} = data.root;

            const component = new Component(hash);

            if (hash.ref) {
                data.root.refs[hash.ref] = component;
            }

            children[component.id] = component;

            const contents = fn ? fn(this) : '';

            return `<div data-id="id-${component.id}">${contents}</div>`;
        });
}
