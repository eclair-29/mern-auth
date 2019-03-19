import { Register, LogIn } from "./components/auth";
import { Profile } from "./components/pages";

const appRoutes = [
  {
    key: "log-in",
    component: LogIn,
    path: "/",
    exact: true
  },
  {
    key: "register",
    component: Register,
    path: "/register"
  },
  {
    key: "profile",
    component: Profile,
    path: "/profile"
  }
];

export default {
  appRoutes
};
