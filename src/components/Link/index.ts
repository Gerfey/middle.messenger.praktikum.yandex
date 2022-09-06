import Components from "../../utils/Components";
import template from "./link.hbs";

interface LinkProps {
    to: string;
    className: string;
}

// @ts-ignore
export class Link extends Components<LinkProps> {
    constructor({to, className}: LinkProps) {
        super({
            to,
            className,
            events: {
                click: (e: MouseEvent) => {
                    e.preventDefault();

                    window.open(to, '_self');
                }
            }
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}