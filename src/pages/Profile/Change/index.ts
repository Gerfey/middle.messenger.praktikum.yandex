import template from './profile.hbs';
import Components from '../../../utils/Components';
import './profile.scss';

export class ProfileChangePage extends Components {
    constructor() {
        super({
            sendValues: () => {
                const element = this.getContent();

                const form = element?.querySelector('form');
                const inputs = form?.querySelectorAll('input');

                const data: Record<string, unknown> = {};

                Array.from(inputs).forEach((input) => {
                    data[input.name] = input.value;
                });

                console.log(data);
            },
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
