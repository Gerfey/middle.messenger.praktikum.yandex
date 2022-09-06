export enum ValidationType {
    FirstName = 'first_name',
    SecondName = 'second_name',
    Login = 'login',
    Password = 'password',
    Email = 'email',
    Phone = 'phone',
    Message = 'message'
}

export class Validator {
    public validate(type: string, value: string): object {
        switch (type) {
            case ValidationType.Email:
                return this.isEmail(value);
            case ValidationType.Login:
                return this.isLogin(value);
            case ValidationType.FirstName:
            case ValidationType.SecondName:
                return this.isName(value);
            case ValidationType.Password:
                return this.isPassword(value);
            case ValidationType.Phone:
                return this.isPhone(value);
            case ValidationType.Message:
                return this.isMessage(value);
            default:
                return {
                    result: true,
                    message: ''
                };
        }
    }

    private isName(value: string): object {
        const regular = /[A-ZА-Я][a-zа-я\-]*/;

        let result = regular.test(value);

        return {
            result: result,
            message: 'Допустим набор из букв (латиница + кириллица).'
        };
    }

    private isLogin(value: string): object {
        const regular = /(?!^\d+$)[A-Za-z0-9_\-]{3,20}/;

        let result = regular.test(value);

        return {
            result: result,
            message: 'Допустим набор из букв и цифр (латиница).'
        };
    }

    private isPassword(value: string): object {
        const regular = /[A-Za-z0-9]{8,40}/;

        let result = regular.test(value);

        return {
            result: result,
            message: 'Допустимы строчные и прописные латинские буквы, цифры.'
        };
    }

    private isEmail(value: string): object {
        const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let result = regular.test(value);

        return {
            result: result,
            message: 'Строка должна являться валидным email.'
        };
    }

    private isPhone(value: string): object {
        const regular = /\+?[0-9]{10,15}/;

        let result = regular.test(value);

        return {
            result: result,
            message: 'Строка должна являться валидным телефоном.'
        };
    }

    private isMessage(value: string): object {
        const regular = /^\s*$/;

        let result = regular.test(value);

        return {
            result: result,
            message: 'Строка не должна быть пустой.'
        };
    }
}