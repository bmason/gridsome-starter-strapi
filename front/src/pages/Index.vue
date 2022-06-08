<template>
    <Layout>
        <!-- Learn how to use images here: https://gridsome.org/docs/images -->
        <section class="hero-section">
            <div v-if="!authStatus">
                <h1>Welcome!</h1>

                <p class="text-green-500">
                    Strapi is the leading open-source headless CMS. It’s 100%
                    Javascript, fully customizable and developer-first.
                </p>

                <p> <g-link to="/login"> Login </g-link> to enjoy all our courses here</p>
<p>Gridsome v{{ gridVersion }} strapi vuex Vue v{{ vueVersion }}  vuetify tailwind</p>
            </div>

            <div v-else>
                <h2> You're logged in </h2>

                <p> Continue viewing your  <g-link to="/home"> courses </g-link>  </p>
            </div>

        </section>



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
</style>
