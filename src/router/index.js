import { createRouter, createWebHistory } from 'vue-router';
import { isLogin, isPatient } from '@/util/index';

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue'),
  },
  {
    path: '/solicitud/nueva/:id',
    name: 'Solicitudes',
    meta: {
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Servicios.vue'),
  },
  {
    path: '/solicitud/resumen',
    name: 'ResumenServicio',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/ResumenServicio.vue'),
  },
  {
    path: '/perfil/completar',
    name: 'CompletarDatosPerfil',
    component: () => import(/* webpackChunkName: "about" */ '../views/CompletarDatos.vue'),
  },
  {
    path: '/solicitud/completa',
    name: 'SolicitudCompleta',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/ConfirmacionSolicitud.vue'),
  },
  {
    path: '/mis-solicitudes/:id',
    name: 'MisSolicitudes',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/SolicitudDetalle.vue'),
  },
  {
    path: '/confirmacion/correo/:correo',
    name: 'ConfirmacionCorreo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ConfirmacionCorreo.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isLogin()) {
      if (!isPatient()) {
        router.push({ name: 'CompletarDatosPerfil' });
      } else {
        next();
      }
    } else {
      router.push({ name: 'Login' });
    }
  } else {
    next();
  }
});

export default router;
