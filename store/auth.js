import cookies from 'js-cookie';

export default{
    namespaced: true,
    state: {
        // uri: 'http://deliv-api.test/web/',
        // uri: 'http://localhost:8000/web/',
        user: [],
        token: null
    },
    getters: {
        getToken: state => {
            return state.token
        },
        getUser: state => {
            return state.user
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
          state.token = token;
        },
        REMOVE_TOKEN(state) {
          state.token = null;
        }
    },
    actions: {
        login({ commit, state }, data){
            return new Promise((resolve, reject) =>{
               this.$axios.post('auth/login', data)
                .then(res =>{
                    resolve(res)
                    this.$axios.setToken(res.data.token, 'Bearer');
                    const expiryTime = new Date(new Date().getTime() + 86400 * 1000);
                    cookies.set('x-access-token', res.data.token, {expires: expiryTime});
                    commit('SET_TOKEN', res.data.token);
                })
                .catch(err=>{
                    reject(err.response.data)
                })
            })
        },
        check({ commit, state }, data){
          let token = cookies.get('x-access-token');
          this.$axios.setToken(token, 'Bearer');
          commit('SET_TOKEN', token);
          console.log(token)
            return new Promise((resolve, reject) =>{
              if (token) {
                this.$axios.get('me', data)
                .then(res =>{
                    resolve(res)
                })
                .catch(err=>{
                    reject(err.response.data)
                })
              }else {
                reject("redirect")
              }
           })
        },
        me({ commit, state }, data){
            return new Promise((resolve, reject) =>{
                this.$axios.get('me', data)
                .then(res =>{
                    resolve(res)
                })
                .catch(err=>{
                    reject(err.response.data)
                })
           })
        },
        // setToken({commit}, {token, expiresIn}) {

        //   const expiryTime = new Date(new Date().getTime() + expiresIn * 1000);
        //   cookies.set('x-access-token', token, {expires: expiryTime});

        // },
        // async refreshToken({dispatch}) {
        //   const {token, expiresIn} = await this.$axios.$post('refresh-token');
        //   dispatch('setToken', {token, expiresIn});
        // },

        // logout({commit}) {
        //   this.$axios.setToken(false);
        //   cookies.remove('x-access-token');
        //   commit('REMOVE_TOKEN');
        // }
    }
}
