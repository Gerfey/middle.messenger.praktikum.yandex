import template from "./chat.hbs";
import Components from "../../utils/Components";
import './chat.scss';

interface ChatPageProps {

}

// @ts-ignore
export class ChatPage extends Components<ChatPageProps> {
    constructor(props: ChatPageProps = {}) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {children: this.children});
    }
}