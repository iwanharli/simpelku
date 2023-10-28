import axios from "axios";

axios.defaults.baseURL = 'http://103.139.192.254:9016/';


axios.defaults.headers.common['Authorization']= 'Bearer ' + localStorage.getItem('token');