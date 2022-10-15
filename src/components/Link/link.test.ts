import Link from './index';
import {expect} from 'chai';
import Router from '../../utils/Router';
import sinon from 'sinon';

describe('Link', () => {
    it('ожидаем рендер', () => {
        new Link({to: '/'});
    });

    it('от element ожидаем возврат <a>', () => {
        const link = new Link({to: '/'});
        const element = link.element;

        expect(element).to.be.instanceof(window.HTMLAnchorElement);
    });

    it('ожидаем переход по событию click', () => {
        const link = new Link({to: '/'});
        const spy = sinon.spy(Router, 'go');
        const element = link.element as HTMLAnchorElement;

        element.click();

        expect(spy.calledOnce).to.eq(true);
    });
});
