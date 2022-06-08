<template>
    <Layout>
        <form class="signup" onsubmit="return false" autocomplete="off">
            <h1>Welcome Back</h1>
            <h2>Don't have an account? <g-link to="/signup">Sign up</g-link></h2>

          <v-text-field
            filled
			v-model="user.identifier"
            label="Email"
			type=email
            prepend-inner-icon="mdi-email"
          />
          <v-text-field
            filled
			v-model="user.passowrd"
            label="Password"
			type=password
            prepend-inner-icon="mdi-lock"
          />		  
		  
            <button @click="login">Sign in</button>
        </form>
		
	
		
    </Layout>
</template>

<script>
import axios from 'axios';

export default {
    data(){
            return{
                user: {
                    identifier: '',
                    password: ''
                }
            }
        },
    methods:{

        login(){
		
		let strapiApi = 'http://localhost:1337';
		
        axios.post(`${strapiApi}/api/auth/local`,  this.user)
		.then(response => {			console.log('login ok', response)
			const token = response.data.jwt
			const user = response.data.user

			if (process.isClient) {
			  localStorage.setItem('token', token)
			  localStorage.setItem('user', JSON.stringify(user))
			}
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
			const something =  axios.defaults.headers.common['Authorization']
			console.log({something})
			this.$store.commit('AUTH_SUCCESS', token, user)
			this.$router.push('/home')
			})

		.catch(err => {
			//commit('AUTH_ERROR')
			process.isClient ? localStorage.removeItem('token') : false
			console.error('login error', err)

			})		
		
		
		
		
		
		
/*            let identifier = this.user.identifier
           let password = this.user.password

           this.$store.dispatch('login', {identifier, password})
           .then((response) => {
				console.log('login response login.vue', response)
				this.$router.push('/home')
			})
           .catch((err) => {
             //this.$router.push('/')
             console.log('login error', err)
            }) */
        }
    }
}
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");



body {
  background-color: #753ff6;
  width: 100%;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}

button,
input {
  border: none;
  outline: none;
}

/****************
      FORM
*****************/
.signup {
  background-color: white;
  width: 100%;
  max-width: 500px;
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  margin: auto;

  border-radius: 20px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

h1 {
  text-align: center;
  color: #753ff6;
}
h2 {
  text-align: center;
  font-size: 1.2rem;
  font-weight: lighter;

  margin-bottom: 40px;
}

h2 span {
  text-decoration: underline;
  cursor: pointer;
  color: #753ff6;
}

/*  Field */
.signup__field {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-bottom: 50px;

}

.signup__field:before {
  content: "";
  display: inline-block;
  position: absolute;
  width: 0px;
  height: 2px;
  background: #753ff6;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.4s ease;
}

.signup__field:hover:before {
  width: 100%;
}

/*  Input */
.signup__input {
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  padding: 10px 2px 0;
  border-bottom: 2px solid #e0e0e0;
}

/*  Label */
.signup__label {
  color: #bdbdbd;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 2px;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.signup__input:focus + .signup__label,
.signup__input:valid + .signup__label {
  top: 0;
  font-size: 1rem;
  background-color: white;
}

/*  Button */
button {
  background: #753ff6;
  color: white;
  padding: 12px 0;
  font-size: 1.2rem;
  border-radius: 25px;
  cursor: pointer;
}

button:hover {
  background: #753ff6;
}

@media (max-width: 700px){
  .signup{
    padding: .4rem;
  }
}
</style>

