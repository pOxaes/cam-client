export default {
  Admin_Users: {
    path: '',
    name: 'Admin_Users',
    title: 'Admin - users',
    component: 'admin/Users',
  },
  Admin_UserCreate: {
    path: 'user-edit',
    name: 'Admin_UserCreate',
    title: 'Admin - user creation',
    component: 'admin/UserEdition',
  },
  Admin_UserUpdate: {
    path: 'user-edit/:id',
    name: 'Admin_UserUpdate',
    title: 'Admin - user update',
    component: 'admin/UserEdition',
  },
};
