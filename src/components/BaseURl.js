
import axios from "axios";
const BaseURl = axios.defaults.baseURL = `${process.env.REACT_APP_URL_FOR_API}`;
export default BaseURl;
