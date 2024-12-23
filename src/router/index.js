import { createWebHistory } from 'vue-router'
import { createRouter } from 'vue-router'
import { getCookie } from '@/stores/utils/cookies'

const routes = [
  {
    meta: {
      title: 'MainMenu'
    },
    path: '/',
    name: 'MainMenu',
    component: () => import("@/views/MainPage.vue"),
    
  },
  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: () => import("@/views/users/public_pages/LoginSNIA.vue"),
    
  },
  {
    meta: {
      title: 'Usuarios',
      requiresAuth: true
    },
    path: '/usuarios',
    name: 'usuarios',
    component: () => import("@/views/users/private_pages/UsersView.vue"),
  },
  {
    meta: {
      title: '',
      requiresAuth: true
    },
    path: '/usuario-registro',
    name: 'usuario-registro',
    component: () => import("@/views/users/private_pages/UserMainForm.vue"),
  },
  {
    meta: {
      title: 'RENCA',
    },
    path: '/renca',
    name: 'renca',
    component: () => import("@/views/renca/public_pages/RencaPage.vue"),
  },
  {
    meta: {
      title: 'RENCA - unipersonales',
    },
    path: '/lista-unipersonales',
    name: 'lista-unipersonales',
    component: () => import("@/views/renca/public_pages/list_consultants/UnipersonalesView.vue"),
  },
  {
    meta: {
      title: 'RENCA - empresas',
    },
    path: '/lista-empresas',
    name: 'lista-empresas',
    component: () => import("@/views/renca/public_pages/list_consultants/EmpresasView.vue"),
  },
  {
    meta: {
      title: 'RENCA - registro',
    },
    path: '/registro-personal',
    name: 'registro-personal',
    component: () => import("@/views/renca/public_pages/formulario_inscripcion/PersonalStepperComp.vue"),
  },
  {
    meta: {
      title: 'RENCA - registro',
    },
    path: '/registro-empresas',
    name: 'registro-empresas',
    component: () => import("@/views/renca/public_pages/formulario_inscripcion/EmpresaStepperComp.vue"),
  },
  {
    meta: {
      title: 'RENCA - solicitud renovacion',
    },
    path: '/solicitud-renovacion',
    name: 'solicitud-renovacion',
    component: () => import("@/views/renca/public_pages/RenovacionForm.vue"),
  },
  {
    meta: {
      title: 'RENCA - cuentas bancarias autorizadas',
    },
    path: '/cuentas-bancarias-autorizadas',
    name: 'cuentas-bancarias-autorizadas',
    component: () => import("@/views/renca/public_pages/CuentaBancariaAutorizada.vue"),
  },
  {
    meta: {
      title: 'RENCA - lista',
      requiresAuth: true
    },
    path: '/tramites-pendientes',
    name: 'tramites-pendientes',
    component: () => import("@/views/renca/private_pages/TramitesPendientes.vue"),
  },
  {
    meta: {
      title: 'RENCA - lista',
      requiresAuth: true
    },
    path: '/tramites-renca',
    name: 'tramites-renca',
    component: () => import("@/views/renca/private_pages/TramitesRENCA.vue"),
  },
  {
    meta: {
      title: 'RENCA - registro',
      requiresAuth: true
    },
    path: '/renca-dashboard',
    name: 'renca-dashboard',
    component: () => import("@/views/renca/private_pages/InformesTramites.vue"),
  },
  {
    meta: {
      title: 'RENCA - pdf',
    },
    path: '/renca-pdf',
    name: 'renca-pdf',
    component: () => import("@/views/renca/public_pages/FormRencaPDF.vue"),
  },
  {
    meta: {
      title: 'RENCA - marco legal',
    },
    path: '/renca-marco-legal',
    name: 'renca-marco-legal',
    component: () => import("@/views/renca/public_pages/menu_pages/MarcoLegal.vue"),
  },
  {
    meta: {
      title: 'RENCA - requisitos renca',
    },
    path: '/renca-requisitos',
    name: 'renca-requisitos',
    component: () => import("@/views/renca/public_pages/menu_pages/RequisitosRenca.vue"),
    children: [
      {
        meta: {
          title: 'requerimiento inscripcion',
        },
        path: 'requerimiento-inscripcion',
        name: 'requerimiento-inscripcion',
        component: () => import("@/views/renca/public_pages/menu_pages/requirements/ActualizacionRequirements.vue"),
      },
    ],
  },
  {
    meta: {
      title: 'RENCA - biblioteca virtual',
    },
    path: '/renca-biblioteca-virtual',
    name: 'renca-biblioteca-virtual',
    component: () => import("@/views/renca/public_pages/menu_pages/BibliotecaVirtual.vue"),
  },
  {
    meta: {
      title: 'RENCA - comunicados',
    },
    path: '/renca-comunicados',
    name: 'renca-comunicados',
    component: () => import("@/views/renca/public_pages/menu_pages/Comunicados.vue"),
  },
  {
    meta: {
      title: 'RENCA - inscripcion',
    },
    path: '/renca-inscribir-usuario',
    name: 'renca-inscribir-usuario',
    component: () => import("@/views/renca/public_pages/UsuarioRENCAForm.vue"),
  },
  {
    meta: {
      title: 'RENCA - USUARIO',
      requiresAuth: true
    },
    path: '/renca-usuario',
    name: 'renca-usuario',
    component: () => import("@/views/renca/private_pages/user_pages/UserRenca.vue"),
    children: [
        {
          meta: {
            title: 'Cambiar Contraseña',
          },
          path: 'cambiar-contrasena',
          name: 'cambiar-contrasena',
          component: () => import("@/views/renca/private_pages/user_pages/ChangePassword.vue"),
        },
        {
          meta: {
            title: 'Renovación Usuario',
          },
          path: 'renovacion-usuario',
          name: 'renovacion-usuario',
          component: () => import("@/views/renca/private_pages/user_pages/RenovateForm.vue"),
        },
        {
          meta: {
            title: 'Actualizar Contraseña',
          },
          path: 'actualizar-usuario',
          name: 'actualizar-usuario',
          component: () => import("@/views/renca/private_pages/user_pages/UpdateForm.vue"),
        },
        {
          meta: {
            title: 'Recuperar Contraseña',
          },
          path: 'recuperar-contrasena',
          name: 'recuperar-contrasena',
          component: () => import("@/views/renca/private_pages/user_pages/RecoveryPassword.vue"),
        },
    ]
  },
  {
    meta: {
      title: 'RENCA - admin',
      requiresAuth: true
    },
    path: '/renca-jefe',
    name: 'renca-jefe',
    component: () => import("@/views/renca/private_pages/renca_admin/RencaBossMain.vue"),
    children:  [
  
    ]
  },
  {
    meta: {
      title: 'Red MoniCA',
    },
    path: '/pngca',
    name: 'pngca',
    component: () => import("@/views/pngca/MainPage.vue"),
  },
  {
    meta: {
      title: 'CGO',
    },
    path: '/cgo',
    name: 'cgo',
    component: () => import("@/views/cgo/MainPage.vue"),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
  {
    meta: {
      title: 'Anuncios',
      requiresAuth: false
    },
    path: '/anuncios',
    name: 'anuncios',
    component: () => import("@/views/anuncios/private_pages/AnunciosView.vue"),
  },
  {
    meta: {
      title: '',
      requiresAuth: false
    },
    path: '/anuncio-registro',
    name: 'anuncio-registro',
    component: () => import("@/views/anuncios/private_pages/AnuncioMainForm.vue"),
  },
  {
    meta: {
      title: '',
      requiresAuth: false
    },
    path: '/anuncio/:item',
    name:'anuncio-edit',
    component: () => import("@/views/anuncios/private_pages/AnuncioMainForm.vue"),
  },
  {
    meta: {
      title: 'Noticias',
      requiresAuth: false
    },
    path: '/cgo/noticias',
    name:'cgo-noticias',
    component: () => import("@/views/cgo/pages/noticias.vue"),
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  
  const permissions = getCookie('permissions');
  const alloweds = permissions ? permissions.split(",") : [];

  if (to.meta.requiresAuth && !alloweds.includes(to.name)) {
    return next('/login');
  }
  next();
  
});



export default router

