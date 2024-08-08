import { createRouter, createWebHistory } from 'vue-router'
import MaintenanceRequests from '../views/MaintenanceRequests.vue';
import MaintenanceRequestDetail from '../views/MaintenanceRequestDetail.vue';
import MaintenanceRequestForm from '../components/MaintenanceRequestForm.vue';

const routes = [
  { path: '/', component: MaintenanceRequests },
  { path: '/detail/:id', component: MaintenanceRequestDetail },
  { path: '/create', component: MaintenanceRequestForm },
  { path: '/edit/:id', component: MaintenanceRequestForm }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
