export const GENERAL_LIST = { 
    "Configuración": "/usuario-registro", 
    "Cerrar Sesión": "/login",
    "PDF Informe": "/renca-pdf"
};

export const LISTS = {
    "usuarios": {
        "Lista usuario": "/usuarios",
        "Crear usuario": "/usuario-registro",
    },
    "renca" : {
         "Trámites Pendientes": "/tramites-pendientes",
         "Trámites RENCA": "/tramites-renca",
         "Registros RENCA": "/RENCA",
         "Reportes": "/RENCA",
         "Carpetas DGMACC": "/RENCA",
         "Ir a Reportes SNIA": "/RENCA",
         "Dashboard": "/renca-dashboard",
    },
    "renca-usuario": {
        "Cambiar Contraseña": '/renca-usuario/cambiar-contrasena',
        "Formulario de solicitud de renovación": '/renca-usuario/renovacion-usuario',
        "Formulario de solicitud de actualización": '/renca-usuario/actualizar-usuario',
    },
    "renca-jefe": {
        "Delegar consultantes": '/renca-jefe',
    },
    "anuncios": {
        "Lista anuncio": "/anuncios",
        "Crear anuncio": "/anuncio-registro",
    },


};


export const LISTS_PUBLIC = {
    "renca" : {
        "Inicio": {
            "Marco Legal": "/renca-marco-legal",
            "Requisitos RENCA": "/renca-requisitos/requerimiento-inscripcion",
            "Requisitos Renovación": "/renca-requisitos/requerimiento-inscripcion",
            "Requisitos Actualización": "/renca-requisitos/requerimiento-inscripcion",
            "Biblioteca Virtual": "/renca-biblioteca-virtual",
            "Comunicados": "/"
        },
        "Lista de consultores RENCA" : {
            "Unipersonales": "/lista-unipersonales",
            "Empresas": "/lista-empresas",
        },
        "Formulario de Inscripción" : {
            "Unipersonales": "/registro-personal",
            "Empresas": "/registro-empresas",
        },
        "prueba" : {
            "stores.constants.constants.js" : "/prueba-index",
        },
        "Formulario solicitud de Renovación" : "/renca-marco-legal",
        "Cuenta Bancaria Autorizada": "/cuentas-bancarias-autorizadas",
        "Ingresar": "/renca-login",
        
    },
    "usuarios": {
    },
    "anuncios":{
    }
}