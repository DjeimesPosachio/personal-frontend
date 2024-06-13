export const maskTelefone = text => {
    const cleaned = ('' + text).replace(/\D/g, '');

    if (cleaned.length > 10) {
        return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 3)} ${cleaned.substring(3, 7)}-${cleaned.substring(7, 11)}`;
    } else {
        return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6, 10)}`;
    }
};

export const formatarHora = (text) => {
    if (typeof text !== 'string') return '';

    const numericText = text.replace(/\D/g, '');

    let formattedText = numericText.slice(0, 4);
    if (formattedText.length > 2) {
        formattedText = formattedText.replace(/(\d{2})(\d{2})/, '$1:$2');
    }

    return formattedText;
}