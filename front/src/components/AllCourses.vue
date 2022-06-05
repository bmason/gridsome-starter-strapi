<template>
	<div>
		<hr />

		<div class="course_list" v-for="course in $static.allCourse.edges" :key="course.node.id">
			<div>
				<g-image :src="course.node.course_image.data.attributes.url" alt="" class="course-image" />
			</div>

			<div class="course-content">
				<h3>{{ course.node.title }}</h3>
				<p>{{ course.node.description }}</p>
				<!-- <p class="price">Buy for ${{ course.node.price }}</p> -->

				<div v-if="disableCourse">
					<button @click="$router.push(`/course/${course.node.id}`)" class="btn">
						Start Course
					</button>
				</div>

				<div v-else>
					<button @click="logout" class="btn ">Login to start course</button>
				</div>
			</div>
		</div>
	</div>
</template>

<static-query>
    query {
      allCourse {
            edges {
                node {
                    id
                    title
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
        }
    }
</static-query>

<script>
export default {
	data() {
		return {
			courses: [],
		};
	},
	computed: {
		disableCourse() {
			if (this.$store.getters.authStatus === "success") {
				return true;
			} else if (this.$store.getters.authStatus === "error") {
				return false;
			}
		},
	},
	mounted() {
		this.courses = this.$static.allCourse.edges;
		this.courses.forEach(e=>console.log('course', e));
		
	},
	methods: {
		logout() {
			this.$store
				.dispatch("logout")
				.then(() => {
					this.$router.push("/login");
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>

<style >
.course_list {
	display: flex;
	margin-top: 2rem;
	margin-bottom: 2rem;
	/* justify-content: space-between; */
	color: #fff;
	border-bottom: 2px solid #fff;
}

.btn {
	border: none;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	cursor: pointer;
	height: 4.375em;
	border-radius: 1.5em;
	padding: 0 1.5em;
	background-color: rgb(87, 41, 178);
	color: #fff;
	font-size: 14px;
	font-weight: 600;
	font-family: "Karla";
	outline: none;
}

.course-content {
	margin-right: 5rem;
	margin-left: 5rem;
}

.price {
	font-weight: 700;
}

@media (max-width: 700px) {
	.course_list {
		display: flex;
		flex-wrap: wrap;
	}

	.course-content {
		margin: 0;
	}

	img {
		width: 100%;
	}
}
</style>
