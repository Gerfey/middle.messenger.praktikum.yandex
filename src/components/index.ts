import Button from './Button';
import Link from './Link';
import FormItem from './FormItem';
import Input from './Input';
import Error from './Error';
import ProfileItems from './Profile/Item';
import MessageButton from './Chat/MessageButton';
import {ComponentInterface} from '../utils/registerComponent';

export const components: ComponentInterface<any>[] = [
    Button,
    MessageButton,
    Link,
    FormItem,
    Input,
    Error,
    ProfileItems
];
