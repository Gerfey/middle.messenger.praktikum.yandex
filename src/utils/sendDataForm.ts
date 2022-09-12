import {Validator} from './Validator';

const sendDataForm = (template: any) => {
    const form = template?.querySelector('form');

    if (form !== undefined) {
        const formInputs = form?.querySelectorAll('.form-item');

        const data: Record<string, unknown> = {};

        const validator = new Validator();

        let sendForm = true;

        Array.from(formInputs).forEach((formInput) => {
            const input = formInput?.querySelector('input');

            if (input) {
                data[input.name] = input.value;

                const resultValidation = validator.validate(input.name, input.value);

                const error = formInput?.querySelector('.form-item__div');
                if (resultValidation.result === false) {
                    if (error !== undefined) {
                        error.textContent = resultValidation.message;
                    }

                    sendForm = false;
                } else {
                    error.textContent = '';
                }
            }
        });

        if (sendForm) {
            console.log(data);
        }
    }
};

export default sendDataForm;
