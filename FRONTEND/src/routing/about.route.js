
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree"; // You'll need to import rootRoute
import About from "../pages/aboutPage";

export const aboutRoute = createRoute({
    getParentRoute: () => rootRoute, // <-- Explicitly parent to the one true root
    path: '/about',
    component: About,
});