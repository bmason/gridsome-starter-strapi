<template>
    <Layout>
		<FormulateForm
			class="signup" 
			@submit="login"
						
		>
            <h1>Welcome Back</h1>
            <h2>Don't have an account? <g-link to="/signup">Sign&nbsp;up</g-link></h2>


		<FormulateInput
			label="Email"
			type="email"
			v-model="user.identifier"			  
			name="email"
			validation="^required|email"
			label-is-valid-class= "valid-input"
		/>	
		
		<FormulateInput
			label="Password"
			type="password"
			v-model="user.password"			  
			name="password"
			validation="^required|min:4,length|matches:/[0-9]/"
			:validation-messages="{
			matches: 'Passwords require at least one number.'
			}"
			label-is-valid-class= "valid-input"
		/>
		<div class="flex space-x-2 justify-center">
			<FormulateInput
				type="submit"
				label="Login"
			/>		
		</div>

	</FormulateForm>	  
		  
		 <label  for="formulate--login-2" class="font-medium text-sm valid-input">Password</label>

	
		
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
		console.log('login'); return
		
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
        }
    }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");


form.formulate-form h1:after,
label.valid-input:after,
form.formulate-form label#formulate--login-2_label:after {
	content: " \2713";
	color: green;
}


hr {width:100%; height:1px; background: #fff; margin-top: -12px; }

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


</style>

