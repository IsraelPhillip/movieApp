import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DetailsPages from "../pages/DetailsPages";
import ExplorePages from "../pages/ExplorePages";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: ':explore',
                element: <ExplorePages/>
            },
            {
                path: ':explore/:id',
                element: <DetailsPages/>
            },
            {
                path: 'search',
                element: <SearchPage/>
            }
        ]
    }
])

export default router