<template>
  <div class="container">
    <div>
      <h1 class="title">
        davao-ecommerce Login
      </h1>
      <NuxtLink to="/profile">Profile page</NuxtLink>
       <div>

      <b-container fluid="md">
         <b-row>
    <b-col></b-col>
    <b-col cols="8">
       <b-form>
                  <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
                  >
                    <b-form-input
                      id="input-1"
                      v-model="email"
                      type="email"
                      required
                      placeholder="Enter email"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                    <b-form-input
                      id="input-2"
                      v-model="password"
                      type="password"
                      required
                      placeholder="Enter password"
                    ></b-form-input>
                  </b-form-group>


                  <b-button  @click="onSubmit" variant="primary">Submit</b-button>
                </b-form>
    </b-col>
    <b-col></b-col>
  </b-row>

      </b-container>



  </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
      return {
        password:null,
        email:null,
      }
    },
    mounted() {
        // this.loggingin();
    },
   methods: {
      ...mapActions({
         login: "auth/login",
         me: "auth/me",
      }),

      onSubmit() {
         let formData = new FormData();
         formData.append("email", this.email);
        //  formData.append("email", "customer@deliv.com");
        //  formData.append("email", "test@ecommerce.com");
         formData.append("password", this.password);
        //  formData.append("password", "customer@123");
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
   },
};
</script>

