import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        lazy: {
            Component: async () => {
                const component = await import("../pages/authentication/public/login/Login")

                return component.default
            }
        }
    },
     {
        path: "/register",
        lazy: {
            Component: async () => {
                const component = await import("../pages/authentication/public/register/Register")

                return component.default
            }
        }
    },
     {
        path: "/list-note",
        lazy: {
            Component: async () => {
                const component = await import("../pages/Notes/Note")

                return component.default
            }
        }
    },
    {
        path: "/new-note",
        lazy: {
            Component: async () => {
                const component = await import("../pages/Notes/CreateNote")

                return component.default
            }
        }
    },
    {
        path: "/update-note/:id",
        lazy: {
            Component: async () => {
                const component = await import("../pages/Notes/UpdateNote")

                return component.default
            }
        }
    },
]);

export default router;