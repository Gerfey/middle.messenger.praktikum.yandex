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
        const isEmptyString = this.isEmpty(value);

        if (isEmptyString) {
            return this.isMessage(value);
        }

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

    private isName(value: string): object {
        const regular = /^[A-ZА-ЯЁ][a-zа-яё-]*$/g;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Допустим набор из букв (латиница + кириллица)',
        };
    }

    private isLogin(value: string): object {
        const regular = /^(?!\d+$)[\da-zA-Z_-]{3,20}$/;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Допустим набор из букв и цифр (латиница)',
        };
    }

    private isPassword(value: string): object {
        const regular = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Допустимы строчные и прописные латинские буквы, цифры',
        };
    }

    private isEmail(value: string): object {
        const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Строка должна являться валидным email',
        };
    }

    private isPhone(value: string): object {
        const regular = /^((\+7|7|8)+([0-9]){10,15})$/;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Строка должна являться валидным телефоном',
        };
    }

    isMessage(value: string): object {
        return {
            result: this.isNotEmpty(value),
            message: 'Строка не должна быть пустой',
        };
    }

    private isEmpty(value: string): boolean {
        const regular = /^\s*$/;

        return regular.test(value);
    }

    private isNotEmpty(value: string): boolean {
        return !this.isEmpty(value);
    }
}
