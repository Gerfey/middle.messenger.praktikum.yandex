import template from "./authorization.hbs";
import Components from "../../utils/Components";
import './authorization.scss';
import {FormAuthorization} from "../../components/Form/Authorization";

import {registerComponent} from "../../utils/registerComponent";

registerComponent('FormAuthorization', FormAuthorization as any);

interface AuthorizationPageProps {

}

// @ts-ignore
export class AuthorizationPage extends Components<AuthorizationPageProps> {
    constructor(props: AuthorizationPageProps = {}) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {children: this.children});
    }
}