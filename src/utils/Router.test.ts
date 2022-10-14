import Router from './Router';
import {expect} from 'chai';
import sinon from 'sinon';
import Components from './Components';

describe('Router', () => {
    global.window.history.back = () => {
        if (typeof window.onpopstate === 'function') {
            window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
        }
    };
    global.window.history.forward = () => {
        if (typeof window.onpopstate === 'function') {
            window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
        }
    };

    const getContentFake = sinon.fake.returns(document.createElement('div'));

    const ComponentsMock = class {
        getContent = getContentFake;
    } as unknown as typeof Components;

    it('use() должна вернуть экземпляр Router', () => {
        const result = Router.use('/', ComponentsMock);

        expect(result).to.eq(Router);
    });

    describe('.back()', () => {
        it('должна отображаться страница в истории обратного действия', () => {
            Router
                .use('/', ComponentsMock)
                .start();

            Router.back();

            expect(getContentFake.callCount).to.eq(3);
        });
    });

    it('должна отображаться страница при запуске', () => {
        Router
            .use('/', ComponentsMock)
            .start();

        expect(getContentFake.callCount).to.eq(1);
    });
});
