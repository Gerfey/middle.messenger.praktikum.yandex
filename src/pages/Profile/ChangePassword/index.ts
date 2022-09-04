import template from "./profile.hbs";
import Components from "../../../utils/Components";
import './profile.scss';

interface ProfileChangePasswordProps {

}

// @ts-ignore
export class ProfileChangePasswordPage extends Components<ProfileChangePasswordProps> {
    constructor(props: ProfileChangePasswordProps = {}) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {children: this.children});
    }
}