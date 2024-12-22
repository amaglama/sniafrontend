export const RENOVATION = "renovation";
export const REGISTRATION = "post";
export const UPDATE = "update";

//deprecated
export const states = [
    "LA PAZ",
    "SANTA CRUZ",
    "COCHABAMBA",
    "POTOSÍ",
    "CHUQUISACA",
    "ORURO",
    "TARIJA",
    "BENI",
    "PANDO"
];

//deprecated
export const expediteds = [
    "BN",
    "CBBA",
    "CH",
    "LP",
    "OR",
    "PD",
    "PT",
    "SC", 
    "TJ",
    
];

export const type_identification_document = [
    "CI",
    "CI EXTRANJERA",
    "PASAPORTE",
];


export const consultor_types = [
    "UNIPERSONAL NACIONAL",
    "UNIPERSONAL EXTRANJERA"
];

export const business_types = [
    "EMPRESA CONSULTORA NACIONAL",
    "EMPRESA CONSULTORA EXTRANJERA",
    "UNIDAD AMBIENTAL ENTIDAD PÚBLICA",
    "UNIDAD AMBIENTAL ENTIDAD PRIVADA",
    "FUNDACIONES Y ONG'S",
];

export const categories = [
    "A",
    "B",
    "C"
];

//Bytes
export const MAX_FILE_SIZE = 512000;

export const amountsCategories = {
    "inscripcion": {
        "A": 700,
        "B": 1000,
        "C": 1300,
        "empresa_consultora": 4000,
        "sociedad_o_asociaciones": 3000,
        "unidad_ambiental": 1500,
    },
    "renovacion": {
        "A": 350,
        "B": 500,
        "C": 750,
        "empresa_consultora": 2000,
        "sociedad_o_asociaciones": 1500,
        "unidad_ambiental": 750,
    },
    //cambiar al 10%
    "actualizacion": 200,
};

export const  filesAllowed = [
    ".pdf",
    //".doc",
    //".docx",
    //".png",
    //".jpg",
    //".jpeg",
];

export const getInputsNames = () => {
    return {
        0: [
            "type_identification_document",
            "identification_document",
            "ci_complement",
            "ci_expedited",
            "identification_document_file",
            "user_name",
            "last_name",
            "second_last_name",
            "image",
            "address",
            "telephone",
            "cellphone",
            "email",
            "state",
            "consultant_type"
        ],
        1: [
            "emition_date",
            "national_certificate",
            "national_certificate_file",
            "category",
            "experiences",
            "deposits",
        ],
        2: [
            "visible_address",
            "visible_email",
            "visible_cellphone",
            "visible_telephone"
        ]
    }
};

export const getInputsBusinessNames = () => {
    return {
        0: [
            "request_code",
            "social_reason",
            "address",
            "telephone",
            "cellphone",
            "email",
            "state",
            "province",
            "municipality",
            "consultant_type",
            "image",

            "type_identification_document",
            "identification_document",
            "ci_complement",
            "ci_expedited",
            "user_name",
            "last_name",
            "second_last_name",
        ],
        1: [
            "emition_date",
            "national_certificate",
            "national_certificate_file",
            "category",
            "experiences",
            "deposits",
        ],
        2: [
            "visible_address",
            "visible_email",
            "visible_cellphone",
            "visible_telephone"
        ]
    }
};


export function getMinimunCategory(years){
    if (years >= 5){
        return "C";
    } else if (years >= 2){
        return "B";
    } else{
        return "A";
    }
}