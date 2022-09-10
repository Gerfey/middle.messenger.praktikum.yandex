export enum ValidationType {
	FIRST_NAME = 'first_name',
	SECOND_NAME = 'second_name',
	LOGIN = 'login',
	PASSWORD = 'password',
	EMAIL = 'email',
	PHONE = 'phone',
	MESSAGE = 'message'
}

export class Validator {
    public validate(type: string, value: string): object {
        switch (type) {
            case ValidationType.EMAIL:
                return this.isEmail(value);
            case ValidationType.LOGIN:
                return this.isLogin(value);
            case ValidationType.FIRST_NAME:
            case ValidationType.SECOND_NAME:
                return this.isName(value);
            case ValidationType.PASSWORD:
                return this.isPassword(value);
            case ValidationType.PHONE:
                return this.isPhone(value);
            case ValidationType.MESSAGE:
                return this.isMessage(value);
            default:
                return {
                    result: true,
                    message: '',
                };
        }
    }

    // латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).
    private isName(value: string): object {
        const regular = /[A-ZА-Я][a-zа-я\-]*/;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Допустим набор из букв (латиница + кириллица).',
        };
    }

    private isLogin(value: string): object {
        const regular = /(?!^\d+$)[A-Za-z0-9_\-]{3,20}/;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Допустим набор из букв и цифр (латиница).',
        };
    }

    private isPassword(value: string): object {
        const regular = /[A-Za-z0-9]{8,40}/;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Допустимы строчные и прописные латинские буквы, цифры.',
        };
    }

    private isEmail(value: string): object {
        const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Строка должна являться валидным email.',
        };
    }

    private isPhone(value: string): object {
        const regular = /\+?[0-9]{10,15}/;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Строка должна являться валидным телефоном.',
        };
    }

    private isMessage(value: string): object {
        const regular = /^\s*$/;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Строка не должна быть пустой.',
        };
    }
}
