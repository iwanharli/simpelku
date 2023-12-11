/* eslint-disable */

import axios from "axios";
import Swal from "sweetalert2"
import router from './router'

axios.defaults.baseURL = 'http://103.139.192.254:9016/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

axios.interceptors.response.use(
    response => response,
    error => {

        if (error.response && error.response.status === 401) {
            Swal.fire({
                title: "Orang lain sedang login menggunakan akun ini",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff url(/images/trees.png)",

                // backdrop: `
                //     rgba(0,0,123,0.5)
                //     url("https://media4.giphy.com/media/DtM17H86F9pOyElCtd/giphy.gif?cid=ecf05e47r8oque0hv902e8lgtfo9vjun6g1y3grpcesq9mjh&ep=v1_stickers_search&rid=giphy.gif&c")
                //     bottom right
                //     repeat
                // `,
                backdrop: `
                    rgba(0,0,123,0.9)
                    url("https://sweetalert2.github.io/images/nyan-cat.gif")
                    top left
                    no-repeat
                `,
                showCancelButton: false,
                confirmButtonText: 'Silahkan login kembali',
                preConfirm: () => {
                    localStorage.clear();
                    router.push({ name: "auth.login" });
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "429",
                text: "Too Many Request, Reload in 30 second",
                showConfirmButton: false,
                timer: 30000
            })
        }

        return Promise.reject(error);
    });
