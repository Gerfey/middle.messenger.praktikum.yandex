import Button from './Button';
import Link from './Link';
import FormItem from './FormItem';
import Input from './Input';
import Error from './Error';
import ProfileItems from './Profile/Item';
import MessageButton from './Chat/MessageButton';
import {ComponentInterface} from '../utils/registerComponent';
import ProfileImage from './ImageProfile';
import ChatList from './Chat/ChatsList';
import ChatUsersDropdown from './Dropdown/ChatUsers';
import ChatMessages from './Chat/ChatMessages';
import ChatListItem from './Chat/ChatsListItem';

export const components: ComponentInterface<any>[] = [
    Button,
    MessageButton,
    Link,
    FormItem,
    Input,
    Error,
    ProfileItems,
    ProfileImage,
    ChatList,
    ChatUsersDropdown,
    ChatMessages,
    ChatListItem,
];
