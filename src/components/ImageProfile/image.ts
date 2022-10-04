import Components from '../../utils/Components';
import template from './image.hbs';

interface ImageProfileProps {
    path: string;
    className: string;
    onClick?: () => void;
    onChange?: () => void;
}

export class ProfileImage extends Components<ImageProfileProps> {
    static componentName = 'ProfileImage';

    constructor({path, className, onClick, onChange}: ImageProfileProps) {
        super({
            path,
            className,
            events: {
                click: onClick,
                change: onChange,
            },
        });
    }

    public getInput() {
        return (this.element.querySelector('input') as HTMLInputElement);
    }

    protected render() {
        return this.compile(template, this.props);
    }
}
