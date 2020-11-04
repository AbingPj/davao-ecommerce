<template>
  <div class="container">
    <div>
      <h1 class="title">
        Profile Page
      </h1>
      <NuxtLink to="/login">Back To Login</NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    mounted() {
        // this.getme();
        this.letscheck();
    },
   methods: {
      ...mapActions({
         login: "auth/login",
         me: "auth/me",
         check: "auth/check",
      }),
      loggingin() {
         let formData = new FormData();
         formData.append("email", "customer@deliv.com");
        //  formData.append("email", "test@ecommerce.com");
         formData.append("password", "customer@123");
        //  formData.append("password", "123123123");

         this.login(formData)
            .then((res) => {
               console.log(res.data);
                this.getme();
            })
            .catch((err) => {
               console.log(err);
            });
      },
      getme() {
         this.me()
            .then((res) => {
               console.log(res.data);
            })
            .catch((err) => {
               console.log(err);
            });
      },
      letscheck() {
         this.check()
            .then((res) => {
               console.log(res.data);
               this.getme();
            })
            .catch((err) => {
               console.log(err);
            });
      },
   },
};
</script>

