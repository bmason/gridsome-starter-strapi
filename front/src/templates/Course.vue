<template>
	<Layout>
		<h1>{{ $page.course.title }}</h1>

		<div class="course_desc">
			<div class="long">
				<p>{{ $page.course.long_description }}</p>
			</div>
			<img :src="$page.course.course_image.url" class="image" alt="" />
		</div>

		<div class="video">
			<video controls class="video-width">
				<source :src="$page.course.course_video[0].url" :type="$page.course.course_video[0].mime" />

				Sorry, your browser doesn't support embedded videos.
			</video>
		</div>
	</Layout>
</template>

<page-query> 
query ($id: ID!){
    course(id: $id) {
        id 
        title 
        long_description
        description
        course_image{
                        data {
                            attributes {
                                url
                            }
                        }
        }

    }
}

</page-query>

<style scoped>
.course_desc {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	color: #fff;
	justify-content: space-between;
}
.long {
	max-width: 50%;
	flex-basis: 50%;
}

h1 {
	color: #fff;
}
.image {
	height: 200px;
}
.video {
	margin-top: 5rem;
	margin-bottom: 5rem;
}
.video-width {
	width: 100%;
}

@media (max-width: 700px) {
	.long {
		max-width: 100%;
		flex-basis: 100%;
	}
	.image {
		width: 100%;
		height: 100%;
	}
}
</style>
