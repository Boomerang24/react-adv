import { lazy, LazyExoticComponent } from 'react';
import { NoLazy } from '../01-lazyload/pages/NoLazy';
// import { LazyPage1, LazyPage2, LazyPage3 } from '../01-lazyload/pages';

type JSXComponent = () => JSX.Element;

interface Route {
    to: string;
    path: string;
    // Component: () => JSX.Element; // Este es el tipo de dato de un componente
    // Component: ( React.LazyExoticComponent<() => JSX.Element> ) | ( () => JSX.Element ); // ?Version larga
    Component: LazyExoticComponent<JSXComponent> | JSXComponent; // ?Version corta para declarar types de lazyLoad y regularComponents
    name: string;
}

//* Componente cargado bajo demanda
//? lazy es un metodo de react
const LazyLayout = lazy(() => import(/* webpackChunkName: "LazyLayout" */'../01-lazyload/layout/LazyLayout'));

export const routes: Route[] = [
    {
        to: '/lazyload/',
        path: 'lazyload/*',
        Component: LazyLayout,
        name: 'LazyLayout Dashboard'
    },
    {
        to: '/no-lazy',
        path: 'no-lazy',
        Component: NoLazy,
        name: 'No Lazy'
    },
]
