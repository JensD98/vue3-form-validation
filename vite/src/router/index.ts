import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TextBinding from '../views/TextBinding.vue';
import ArrayBinding from '../views/ArrayBinding.vue';
import DynamicArrayForm from '../views/DynamicArrayForm.vue';
import DynamicObjectForm from '../views/DynamicObjectForm.vue';
import InitialValueBinding from '../views/InitialValueBinding.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: TextBinding
  },
  {
    path: '/array',
    component: ArrayBinding
  },
  {
    path: '/dynamic-array',
    component: DynamicArrayForm
  },
  {
    path: '/dynamic-object',
    component: DynamicObjectForm
  },
  {
    path: '/initial-values',
    component: InitialValueBinding
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
