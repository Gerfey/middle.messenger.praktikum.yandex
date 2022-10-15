import template from './link.hbs';
import {WithRouterProps} from '../../utils/Router';
import Components from '../../utils/Components';

interface LinkProps extends WithRouterProps {
    to: string;
    className: string;
}

export class Link extends Components {
    static componentName = 'Link';

    constructor({to, className, router}: LinkProps) {
        super({
            to,
            className,
            events: {
                click: (e: MouseEvent) => {
                    e.preventDefault();

                    // @ts-ignore
                    router.go(this.props.to);
                },
            },
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}
