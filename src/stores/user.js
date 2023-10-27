import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async signIn(email, password) {
      const auth = JSON.stringify({ email, password });

      try {
        const response = await axios.post("http://103.139.192.254:9016/api/v1/user/login", auth, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(response.status);

        if (response.status === 200) {
          console.log("AMAN");
        } else {
          console.log("GA AMAN");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        // Handle error as needed
      }
    }
  },
});