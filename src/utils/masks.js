export const maskTelefone = text => {
    const cleaned = ('' + text).replace(/\D/g, '');

    if (cleaned.length > 10) {
        return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 3)} ${cleaned.substring(3, 7)}-${cleaned.substring(7, 11)}`;
    } else {
        return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6, 10)}`;
    }
};
