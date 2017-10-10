export default {
  SecurityCamera_MovementSessions: {
    path: '',
    name: 'SecurityCamera_MovementSessions',
    title: 'MovementSessions',
    component: 'securityCamera/MovementSessions',
  },
  SecurityCamera_MovementSession: {
    path: 'movement-session/:id',
    name: 'SecurityCamera_MovementSession',
    title: 'MovementSession',
    component: 'securityCamera/MovementSession',
  },
  SecurityCamera_Cameras: {
    path: 'camera',
    name: 'SecurityCamera_Cameras',
    title: 'Cameras',
    component: 'securityCamera/Cameras',
  },
  SecurityCamera_CameraCreation: {
    path: 'camera-edit',
    name: 'SecurityCamera_CameraCreation',
    title: 'Camera creation',
    component: 'securityCamera/CameraCreation',
  },
  SecurityCamera_Camera: {
    path: 'camera/:id',
    name: 'SecurityCamera_Camera',
    title: 'Camera',
    component: 'securityCamera/Camera',
  },
  SecurityCamera_CameraParameters: {
    path: 'camera/:id/parameters',
    name: 'SecurityCamera_CameraParameters',
    title: 'Camera Parameters',
    component: 'securityCamera/CameraParameters',
  },
};
