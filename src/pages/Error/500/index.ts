import template from "./error.hbs";
import Components from "../../../utils/Components";
import './error.scss';

interface Error500PageProps {

}

// @ts-ignore
export class Error500Page extends Components<Error500PageProps> {
    constructor(props: Error500PageProps = {}) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {children: this.children});
    }
}