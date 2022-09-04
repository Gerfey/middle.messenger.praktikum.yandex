import template from "./authorization.hbs";
import Components from "../../utils/Components";
import './authorization.scss';
import {FormAuthorization} from "../../components/Form/Authorization";

interface AuthorizationPageProps {

}

// @ts-ignore
export class AuthorizationPage extends Components<AuthorizationPageProps> {
    constructor(props: AuthorizationPageProps = {}) {
        super(props);
    }

    protected render(): DocumentFragment {

        // @ts-ignore
        this.setChildren('form_authorization', new FormAuthorization());

        return this.compile(template, {children: this.children});
    }
}