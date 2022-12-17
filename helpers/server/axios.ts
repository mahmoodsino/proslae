import axios from "axios";
const apiWorker = axios.create();
apiWorker.interceptors.response.use(
    function (response) {
      if (response.data && response.data.ok == false) {
        //error
      }
      return response;
    },
    function (error) {
      if (error.response.status == 401) {
        localStorage.removeItem("email")
        localStorage.removeItem("type")
        localStorage.removeItem("id")
        localStorage.removeItem("token")
        window.location.href="/";
      }    
      return Promise.reject(error);
    }
  );
  export default apiWorker;
  