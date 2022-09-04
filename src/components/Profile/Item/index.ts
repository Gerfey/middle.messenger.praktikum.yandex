import template from "./item.hbs";
import Components from "../../../utils/Components";

interface ProfileItemsProps {
    label: string,
    events: {
        click: () => void;
    }
}

// @ts-ignore
export class ProfileItems extends Components<ProfileItemsProps> {
    constructor(props: ProfileItemsProps) {
        super(props);
    }

    protected render() {
        return this.compile(template, this.getProps());
    }
}