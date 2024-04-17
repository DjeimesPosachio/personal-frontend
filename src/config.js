import axios from "axios";
import { tokenInterceptor } from "./utils/axios-helper";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";

axios.defaults.baseURL = process.env.REACT_APP_URL_API;
axios.interceptors.request.use(tokenInterceptor);

Form.defaultProps = {
    ...Form.defaultProps,
    mutators: {
        ...arrayMutators,
        resetFields(args, mutableState, tools) {
            Object.keys(mutableState.fields).forEach(fieldName => {
                tools.resetFieldState(fieldName);
            });
        },
    },
};