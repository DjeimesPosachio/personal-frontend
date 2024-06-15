export const enums = {

    SequenciaTreino: [
        {
            key: "A",
            label: "A",
        },
        {
            key: "B",
            label: "B",
        },
        {
            key: "C",
            label: "C",
        },
        {
            key: "D",
            label: "D",
        },
        {
            key: "E",
            label: "E",
        },
        {
            key: "F",
            label: "F",
        }
    ],
    TipoRefeicao: [
        {
            key: "CAFE_MANHA",
            label: "Café da manhã",
        },
        {
            key: "LANCHE_DA_MANHA",
            label: "Lanche da manhã",
        },
        {
            key: "ALMOCO",
            label: "Almoço",
        },
        {
            key: "CAFE_TARDE",
            label: "Café da tarde",
        },
        {
            key: "JANTAR",
            label: "Jantar",
        }
    ],
    UnidadeMedida: [
        {
            key: "UNIDADE",
            label: "unidade",
        },
        {
            key: "ML",
            label: "ml",
        },
        {
            key: "GRAMAS",
            label: "gr",
        },
        {
            key: "XICARA",
            label: "xícara",
        },
        {
            key: "PORCAO",
            label: "porção",
        }
    ],
    UserRole: [
        {
            key: "ADMIN",
            label: "Admin"
        },
        {
            key: "USUARIO",
            label: "Usuário"
        },
        {
            key: "ALUNO",
            label: "Aluno"
        }
    ],
    UserStatus: [
        {
            key: "ATIVO",
            label: "Ativo"
        },
        {
            key: "INATIVO",
            label: "Inativo"
        }
    ]
}

export function getEnumByKeyAndDomain(enumName, key) {

    return enums[enumName].find(it => it.key === key)

}

export function getEnumByDomain(enumName) {

    return enums[enumName];

}

export function getLabelEnumByKeyAndDomain(enumName, key) {

    return enums[enumName].find(it => it.key === key).label;

}

