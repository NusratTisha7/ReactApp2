import UserCreate from './views/UserCreate';
import UserList from './views/UserList'

const dashboardRoutes = [

  {
    path: "/createUser",
    name: "User Create",
    icon: "nc-icon nc-chart-pie-35",
    component: UserCreate,
    layout: "/admin",
  },
  {
    path: "/userList",
    name: "User List",
    icon: "nc-icon nc-chart-pie-35",
    component: UserList,
    layout: "/admin",
  }
];

export default dashboardRoutes;