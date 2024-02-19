import axios from "axios";
import { tokenInterceptor } from "./utils/axios-helper";

axios.defaults.baseURL = process.env.REACT_APP_URL_API;
axios.interceptors.request.use(tokenInterceptor);