import securityCameraRoutes from '@/api/constants/securityCameraRoutes.constant';
import adminRoutes from '@/api/constants/adminRoutes.constant';
import profileRoutes from '@/api/constants/profileRoutes.constant';

export default {
  Icons: {
    path: '/icons',
    name: 'Icons',
    title: 'Icons',
    component: 'common/IconsList',
  },
  Login: {
    path: '/login',
    name: 'Login',
    title: 'Login',
    component: 'Login',
  },
  Home: {
    path: '/home',
    name: 'Home',
    title: 'Home',
    component: 'Home',
    visibleInNav: true,
    icon: 'ios-home',
  },
  Admin: {
    path: '/admin',
    default: 'Admin_Users',
    title: 'Admin',
    component: 'Admin',
    children: adminRoutes,
    visibleInNav: true,
    icon: 'md-nuclear',
  },
  Profile: {
    path: '/profile',
    default: 'Profile_Components',
    title: 'Profile',
    component: 'Profile',
    children: profileRoutes,
    visibleInNav: true,
    icon: 'ios-person',
  },
  SecurityCamera: {
    path: '/security-camera',
    default: 'SecurityCamera_MovementSessions',
    title: 'Security Camera',
    component: 'securityCamera/Index',
    children: securityCameraRoutes,
    visibleInNav: true,
    isComponent: true,
    icon: 'md-eye',
  },
};
