import Components from '../../utils/Components';
import template from './link.hbs';

interface LinkProps {
	to: string;
	className: string;
}

export class Link extends Components<LinkProps> {
    static componentName = 'Link';

    constructor({to, className}: LinkProps) {
        super({
            to,
            className,
            events: {
                click: (e: MouseEvent) => {
                    e.preventDefault();

                    window.open(to, '_self');
                },
            },
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}
