import UserCreate from './views/UserCreate';


const dashboardRoutes = [

  {
    path: "/createUser",
    name: "User Create",
    icon: "nc-icon nc-chart-pie-35",
    component: UserCreate,
    layout: "/admin",
  }
];

export default dashboardRoutes;