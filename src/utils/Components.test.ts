import proxyquire from 'proxyquire';
import {expect} from 'chai';
import sinon from 'sinon';
import ComponentsType from './Components';

const eventBusMock = {
    on: sinon.fake(),
    emit: sinon.fake(),
};

const {default: Components} = proxyquire('./Components', {
    './EventBus': {
        EventBus: class {
            emit = eventBusMock.emit;
            on = eventBusMock.on;
        }
    }
}) as { default: typeof ComponentsType };

describe('Components', () => {
    class ComponentMock extends Components {}

    it('ожидаем вызов init события при инициализации', () => {
        new ComponentMock({});

        expect(eventBusMock.emit.calledWith('init')).to.eq(true);
    });
});
