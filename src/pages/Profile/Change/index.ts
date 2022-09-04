import template from "./profile.hbs";
import Components from "../../../utils/Components";
import './profile.scss';

interface ProfileChangePageProps {

}

// @ts-ignore
export class ProfileChangePage extends Components<ProfileChangePageProps> {
    constructor(props: ProfileChangePageProps = {}) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {children: this.children});
    }
}