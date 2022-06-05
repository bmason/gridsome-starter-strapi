<template>
    <div class="navbar">

        <nav>
            <div>
                <h1>
                    <g-link to="/"> Strapi Learning Platform </g-link>
                </h1>
            </div>
            <ul>
                <div v-if="disableNav" class="ul">
                    <li>
                        Welcome, {{user.username}}
                    </li>
                    <li>
                        <button  class="btn btn-outline" @click="logout" > Logout </button>
                    </li>
                </div>
                <div v-else class="ul">
                    <li>
                        <g-link to="/signup"  class="btn"> Register </g-link>
                    </li>
                    <li>
                        <g-link to="/login"  class="btn btn-outline"> Login </g-link>
                    </li>


                </div>


            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data(){
        return {
            user:{}
        }
    },
    computed: {
        isLoggedIn(){
            return this.$store.getters.isLoggedIn
        },

        disableNav(){
            if(this.$store.getters.authStatus === 'success'){
                return true
            } else if (this.$store.getters.authStatus === 'error'){
                return false
            }
        }
    },

    mounted(){
        this.user = JSON.parse(localStorage.getItem('user'))
        // console.log('user', this.user.username)



    },
    methods:{
        logout(){
            this.$store.dispatch('logout')
                .then(() => {
                    console.log('I am serious')
                    this.$router.push('/login')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style scoped>
.navbar {
    width: 100%;
}
h1 a {
    color: #fff;
    text-decoration: none;
}
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

}

.ul{
    display: flex;
    align-items:baseline;
}

.btn {
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    height: 4.375em;
    border-radius: 1.5em;
    text-decoration: none;
    padding: 1.5em 1.5em;
    background-color: rgb(87, 41, 178);
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Karla';
    outline: none;
}

.btn-outline {
    background: #fff;
    border: 1px solid rgb(87, 41, 178);
    color: #000;
}

li {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    color: #fff;
}

.nav-link {
    color: #fff;
    text-decoration: none;
}

@media(max-width: 700px){
    ul{
        justify-content: space-between;
    }
}
</style>
