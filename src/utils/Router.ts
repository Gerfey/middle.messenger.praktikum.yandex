import Components from './Components';
import Route from './Route';

class Router {
    private static __instance: Router;
    private routes: Route[] = [];
    private history = window.history;
    private currentRoute: Route | null = null;

    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        Router.__instance = this;
    }

    public use(pathname: string, block: typeof Components) {
        const route = new Route(pathname, block, {rootQuery: '#app'});

        this.routes.push(route);

        return this;
    }

    public start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back() {
        this.history.back();
    }

    public forward() {
        this.history.forward();
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this.currentRoute) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;

        route.render();
    }


    private getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default Router;

export function withRouter(Component: typeof Components) {
    return class WithRouter extends Component {
        public static componentName = Component.name;

        constructor(props: any) {
            super({...props, router: new Router()});
        }
    };
}
