<template>
    <div class="layout">
        <header class="header">
            <Navbar />
        </header>

        <p style="color: #fff"> Auth Status: <span>{{authStatus}}</span> </p>
        <slot />
    </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Navbar from '~/components/Navbar';
export default {
    components: {
        Navbar,
    },
    computed: {
        authStatus(){
            return this.$store.getters.authStatus
        }
    }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');
body {
    font-family: 'Karla', sans-serif;
    margin: 0;
    padding: 0;
    background: #753ff6;
    line-height: 1.5;
}

span{
    text-transform: uppercase;
}

.layout {
    max-width: 950px;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

}

.nav__link {
    margin-left: 20px;
}

@media (max-width: 700px){
    nav{
        flex-direction: column;
        margin-bottom: 1rem;
    }
}
</style>
