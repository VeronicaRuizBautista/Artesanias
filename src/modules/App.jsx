import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";


const Pantalla7 = lazy(() => import('./pages/pantalla7'))
const Pantalla17 = lazy(() => import("./pages/pantalla17"))
const Pantalla19 = lazy(() => import('./pages/pantalla19'))
import Carga from "./pages/Carga";
import { shoppingCartLoader } from "./pages/Shopping_Cart";
import { discountsLoader } from "./pages/Discounts_Promotions";
import { fetchWorkshopsLoader } from "./pages/Craft_Workshops";
import { tallerProductsLoader } from "./pages/WorkshopPreview";
import { favProductsLoader } from "./pages/pantalla19";
import { comprasDataLoader } from "./pages/pantalla20";
const InicioSesion = lazy(() => import('./pages/InicioSesion'))
const Entrada = lazy(() => import('./pages/Entrada'))
const Home = lazy(() => import('./pages/Home'))
const CraftWorkshops = lazy(() => import('./pages/Craft_Workshops'))
const DiscountsPromotions = lazy(() => import('./pages/Discounts_Promotions'))
const ShoppingCart = lazy(() => import('./pages/Shopping_Cart'))
const Profile = lazy(() => import('./pages/Profile'))
const EmailRecord = lazy(() => import('./pages/EmailRecord'))
const Pantalla6 = lazy(() => import('./pages/pantalla6'))
// import { TermsAndConditions } from "./pages/Terms&Conditions";
const Categories = lazy(() => import('./pages/Categories'))
const WorkshopPreview = lazy(() => import('./pages/WorkshopPreview'))
const Pantalla20 = lazy(() => import('./pages/pantalla20'))
const Pantalla21 = lazy(() => import('./pages/pantalla21'))
const Pantalla22 = lazy(() => import('./pages/pantalla22'))
const Settings = lazy(() => import('./pages/Settings'))
const AppOpinions = lazy(() => import('./pages/AppOpinions'))
const CustomerSupport = lazy(() => import('./pages/CustomerSupport'))
const Chat = lazy(() => import('./pages/ChatView'))
const InfoCraft = lazy(() => import('./pages/InfoCraft'))
const TallerCeramica = lazy(() => import('./pages/CraftInscription'))
const InicioSesionRuraq = lazy(() => import('./pages/InicioSesionRuraq'))
const Purchase = lazy(() => import('./pages/Purchase'))


async function loader() {

    let res = await fetch('http://localhost:3000/auth/check', {
        credentials: 'include', cache: "no-cache"
    })
    let data = await res.json()
    if (res.ok) {
        if (!data.authenticated) return false
        return data
    } else {
        return false
    }

}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<Carga />}><Home /></Suspense>,
        loader: loader
    },
    {
        path: "/register",
        element: <Suspense fallback={<Carga />}><Entrada /></Suspense>,
        loader: loader
    },
    {
        path: '/register/email',
        element: <Suspense fallback={<Carga />}><EmailRecord /></Suspense>,
        loader: loader
    },
    {
        path: '/register/phone',
        element: <Suspense fallback={<Carga />}><Pantalla6 /></Suspense>,
        loader: loader
    },
    {
        path: '/register/TermsAndConditions',
        element: <Suspense fallback={<Carga />}><Pantalla7 /></Suspense>,
        loader: loader
    },
    {
        path: '/login',
        element: <Suspense fallback={<Carga />}><InicioSesion /></Suspense>,
        loader: loader
    },
    {
        path: '/login/credentials',
        element: <Suspense fallback={<Carga />}><InicioSesionRuraq /></Suspense>,
        loader: loader
    },
    /* {
        path: '/home',
        element: <Suspense fallback={<Carga/>}><Home/></Suspense>,
        loader: loader
    }, */
    {
        path: '/workshops',
        element: <Suspense fallback={<Carga />}><CraftWorkshops /></Suspense>,
        loader: async () => {
            let user = await loader()
            let data = await fetchWorkshopsLoader()
            return {user, data}
        }
    },
    {
        path: '/discounts',
        element: <Suspense fallback={<Carga />}><DiscountsPromotions /></Suspense>,
        loader: async () => {
            let user = await loader()
            let data = await discountsLoader()
            return {user, data}
        }
    },
    {
        path: '/cart',
        element: <Suspense fallback={<Carga />}><ShoppingCart /></Suspense>,
        loader: async () => {
            let user = await loader()
            let data = await shoppingCartLoader()            
            return {user, data}
        }
    },
    {
        path: '/profile',
        element: <Suspense fallback={<Carga />}><Profile /></Suspense>,
        loader: loader
    },
    {
        path: '/products/:categoryName',
        element: <Suspense fallback={<Carga />}><Categories /></Suspense>,
        loader: loader
    },
    {
        path: '/workshops/related/:id',
        element: <Suspense fallback={<Carga />}><WorkshopPreview /></Suspense>,
        loader: async ({params}) => {
            let user = await loader()
            let data = await tallerProductsLoader(params)
            return {user, data}
        }
    },
    {
        path: '/product/:id',
        element: <Suspense fallback={<Carga />}><Pantalla17 /></Suspense>,
        loader: loader
    },
    {
        path: '/crafts/favorites',
        element: <Suspense fallback={<Carga />}><Pantalla19 /></Suspense>,
        loader: async () => {
            let user = await loader()
            let data = await favProductsLoader()
            return {user, data}
        }
    },
    {
        path: '/purchases/success',
        element: <Suspense fallback={<Carga />}><Pantalla20 /></Suspense>,
        loader: async () => {

            let user = await loader()
            let data = await comprasDataLoader()
            return {user, data}

        }
    },
    {
        path: '/workshops/educational',
        element: <Suspense fallback={<Carga />}><Pantalla21 /></Suspense>,
        loader: loader
    },
    {
        path: '/coupon',
        element: <Suspense fallback={<Carga />}><Pantalla22 /></Suspense>,
        loader: loader
    },
    {
        path: '/settings',
        element: <Suspense fallback={<Carga />}><Settings /></Suspense>,
        loader: loader
    },
    {
        path: '/opinions',
        element: <Suspense fallback={<Carga />}><AppOpinions /></Suspense>,
        loader: loader
    },
    {
        path: '/faq',
        element: <Suspense fallback={<Carga />}><CustomerSupport /></Suspense>,
        loader: loader
    },
    {
        path: '/chat/:name',
        element: <Suspense fallback={<Carga />}><Chat /></Suspense>,
        loader: loader
    },
    {
        path: '/workshop/info/:id',
        element: <Suspense fallback={<Carga />}><InfoCraft /></Suspense>,
        loader: loader
    },
    {
        path: '/workshop/details/:id',
        element: <Suspense fallback={<Carga />}><TallerCeramica /></Suspense>,
        loader: loader
    },
    {
        path: '/payment/success',
        element: <Suspense fallback={<Carga />}><Purchase /></Suspense>,
        loader: loader
    }
]);

export const App = () => {
    return (
        <RouterProvider router={router} />
    );
};
