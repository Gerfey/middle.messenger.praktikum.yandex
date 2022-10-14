import {expect} from 'chai';
import {set} from './helpers';

describe('функция set', () => {
    let obj = {};
    const path = 'test';
    const value = 'some value';

    beforeEach(() => {
        obj = {};
    });

    it('Проверяем успешную установку значения у объекта', () => {
        const result = set(obj, path, value);

        expect(result).to.haveOwnProperty(path, value);
    });

    it('возвращается оригинальный объект', () => {
        const result = set(obj, path, value);

        expect(result).to.equal(obj);
    });

    it('возвращается то что мы передаем на вход, вместо объекта', () => {
        const obj = '';

        const result = set(obj, path, value);

        expect(result).to.eq(obj);
    });
});
