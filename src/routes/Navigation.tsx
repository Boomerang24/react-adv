import { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { LazyPage1, LazyPage2, LazyPage3 } from '../01-lazyload/pages';

import logo from '../logo.svg';
import { routes } from './routes';

export const Navigation = () => {
  return (
    <Suspense fallback={ <span>Loading...</span> }>
        <Router>
        <div className="main-layout">
            <nav>
                <img src={ logo } alt="React Logo" />
            <ul>
                {
                    routes.map( ({ name, path }) => (
                        <li key={ name }>
                            <NavLink
                                to={ path }
                                activeClassName='nav-active' 
                                exact
                            >
                                { name }
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
            </nav>

            <Switch>
                {
                    routes.map( ({ path, Component }) => (
                        <Route 
                            key={ path }
                            path={ path }
                            render={ () => <Component /> }
                        />
                    ))
                }

                <Redirect to={ routes[0].path}  />
            </Switch>
        </div>
        </Router>
    </Suspense>
  );
}
