import { message } from "antd";

export function getErrorMessage(error, defaultMessage = "Ocorreu um erro inesperado.") {
    if (!error) return defaultMessage

    const { response = null } = error;
    const errorMessage = response?.data || defaultMessage;

    return message.error(errorMessage);
}