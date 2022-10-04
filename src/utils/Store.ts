import {set} from './helpers';
import {EventBus} from './EventBus';
import Components from './Components';

export enum StoreEvents {
    Updated = 'updated'
}

export class Store extends EventBus {
    private state: any = {};

    public set(keypath: string, data: unknown) {
        set(this.state, keypath, data);

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }
}

const store = new Store();

// @ts-ignore
window.store = store;

export function withStore(mapStateToProps) {
    return function wrap(Component: typeof Components) {
        return class WithStore extends Component {

            constructor(props: any) {
                let previousState = mapStateToProps(store.getState());

                super({...props, ...previousState});

                store.on(StoreEvents.Updated, () => {
                    const stateProps = mapStateToProps(store.getState());

                    previousState = stateProps;

                    this.setProps({...stateProps});
                });
            }
        };
    };
}

export default store;
