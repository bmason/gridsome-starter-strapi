<template>
    <Layout>
        <!-- Learn how to use images here: https://gridsome.org/docs/images -->
        <section class="hero-section">
            <div v-if="!authStatus">
                <h1>Welcome!</h1>

                <p class="text-green-500">
                    A starter with user register/login and jwt  
                </p>

				<p>Gridsome v{{ gridVersion }} Strapi Vuex Vue v{{ vueVersion }}  Vuetify VueFormulate Tailwind</p>

            </div>

            <div v-else>
                <h2> You're logged in </h2>


            </div>

        </section>

		<h1>Issues:</h1>
		<ul>
			<li>Validation
				<p>I tried to place a checkmark after a completed field as in the <a href="https://vueformulate.com/guide/theming/customizing-classes/#class-keys">VueFormulate docs</a>.  
				See the Login.vue page.  I would be grateful for any assistance.</p>
			</li>
		</ul>

    </Layout>


</template>	
	


<script>


export default {
    metaInfo: {
        title: 'Starter',
    },
	
    computed:{
		gridVersion() {return '.7.2.3' },
		vueVersion() {return window.localStorage.getItem('vueVersion')},
        authStatus(){
            if(this.$store.getters.authStatus === 'success'){
                return true
            } else if (this.$store.getters.authStatus === 'error'){
                return false
            } else if (this.$store.getters.authStatus === ''){
                return false
            }
        }
    }

};
</script>

<style>
.home-links a {
    margin-right: 1rem;
}

.hero-section {
    background: #fff;
    color: #2f2e8b;
    padding: 1rem;
}

.oldSchool {
border-bottom-width: 4px;
}
</style>
