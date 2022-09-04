import template from "./profile.hbs";
import Components from "../../utils/Components";
import './profile.scss';

interface ProfilePageProps {

}

// @ts-ignore
export class ProfilePage extends Components<ProfilePageProps> {
    constructor(props: ProfilePageProps = {}) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {children: this.children});
    }
}