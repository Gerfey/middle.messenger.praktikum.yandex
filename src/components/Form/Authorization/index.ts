import template from "./form_authorization.hbs";
import Components from "../../../utils/Components";
import './from_authorization.scss';

import {registerComponent} from "../../../utils/registerComponent";
import {FormAuthorizationItem} from "./Items";

registerComponent('FormAuthorizationItem', FormAuthorizationItem as any);

interface FormAuthorizationProps {

}

// @ts-ignore
export class FormAuthorization extends Components<FormAuthorizationProps> {

    constructor(props: FormAuthorizationProps = {}) {
        super(props);
    }

    protected render() {
        return this.compile(template, this.props);
    }
}