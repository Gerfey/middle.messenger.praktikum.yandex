import template from "./profile.hbs";
import Components from "../../utils/Components";
import './profile.scss';

// @ts-ignore
export class ProfilePage extends Components {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}