import template from "./error.hbs";
import Components from "../../../utils/Components";
import './error.scss';

interface Error404PageProps {

}

// @ts-ignore
export class Error404Page extends Components<Error404PageProps> {
    constructor(props: Error404PageProps = {}) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {children: this.children});
    }
}