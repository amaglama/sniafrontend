export const BASESAPIS = {
    USUARIOS: "/users/",
    CONSULTANTES: "/consultants/",
    DEPARTAMENTOS: "/states/",
    EXPERIENCIAS: "/experiences/",
    DEPOSITOS: "/deposits/",
    VALIDAR: "/validate/",
    USER_RENCA: "/user-renca/",
    ANUNCIOS: "/announcements/",
}
export const APIS = {
    USUARIOS: {
        GET: BASESAPIS.USUARIOS,
        POST: BASESAPIS.USUARIOS,
        PUT: BASESAPIS.USUARIOS,
        DELETE: BASESAPIS.USUARIOS,
    },
    CONSULTANTES: {
        GET: BASESAPIS.CONSULTANTES,
        POST: BASESAPIS.CONSULTANTES,
        PUT: BASESAPIS.CONSULTANTES,
        EMAIL: '/register/',
    },
    CONSULTANTES_RENCA: {
        GET: `${BASESAPIS.CONSULTANTES}renca/`,
    },
    DEPARTAMENTOS: {
        GET: BASESAPIS.DEPARTAMENTOS,
    },
    EXPERIENCIAS:{
        POST: `${BASESAPIS.EXPERIENCIAS}bulk/create/`,
        PUT: `${BASESAPIS.EXPERIENCIAS}edit/`,
    },
    DEPOSITOS:{
        POST: `${BASESAPIS.DEPOSITOS}bulk/create/`,
        PUT: `${BASESAPIS.DEPOSITOS}edit/`,
    },
    VALIDAR: {
        POST: BASESAPIS.VALIDAR,
    },
    USER_RENCA: {
        PASSWORD: BASESAPIS.USER_RENCA
    },
    ANUNCIOS: {
        GET: `${BASESAPIS.ANUNCIOS}create`,
        POST: `${BASESAPIS.ANUNCIOS}create`,
        PUT: `${BASESAPIS.ANUNCIOS}edit/`,
        DELETE: `${BASESAPIS.ANUNCIOS}delete/`,
        LIST: `${BASESAPIS.ANUNCIOS}list/`,
    },
    MODULOS_ANUNCIO: {
        LIST: `${BASESAPIS.ANUNCIOS}moduleList`,
    },
    TIPOS_ANUNCIO: {
        LIST: `${BASESAPIS.ANUNCIOS}typeList`,
    },
};

