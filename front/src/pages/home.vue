<template>
    <Layout>

        <section>
            <AllCourses />
        </section>
    </Layout>
</template>

<script>
import AllCourses from '~/components/AllCourses';
export default {
    components: {
        AllCourses,
    },
    meta: { auth: true }
}
</script>