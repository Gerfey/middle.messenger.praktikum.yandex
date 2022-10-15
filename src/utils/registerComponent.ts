import Components from './Components';
import {HelperOptions} from 'handlebars';
import Handlebars from 'handlebars/runtime';

const util = require('handlebars-utils');
const moment = require('moment');

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

Handlebars.registerHelper('compare', function (a: any, operator: string, b: any, options: any) {
    let result;
    switch (operator) {
        case '==':
            result = a == b;
            break;
        case '===':
            result = a === b;
            break;
        case '!=':
            result = a != b;
            break;
        case '!==':
            result = a !== b;
            break;
        case '<':
            result = a < b;
            break;
        case '>':
            result = a > b;
            break;
        case '<=':
            result = a <= b;
            break;
        case '>=':
            result = a >= b;
            break;
        case 'typeof':
            result = typeof a === b;
            break;
        default: {
            throw new Error('helper {{compare}}: invalid operator: `' + operator + '`');
        }
    }

    return util.value(result, this, options);
});

Handlebars.registerHelper('formatTime', function (date: any, format: any) {
    const mmnt = moment(date);
    return mmnt.format(format);
});

Handlebars.registerHelper('foreach', function (arr: any, options: any) {
    if (arr === undefined) {
        return options.inverse(this);
    }

    if (options.inverse && !arr.length) {
        return options.inverse(this);
    }

    return arr.map(function (item: any, index: any) {
        item.$index = index;
        item.$first = index === 0;
        item.$last = index === arr.length - 1;
        return options.fn(item);
    }).join('');
});
