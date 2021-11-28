<template>
	<div class="container">
		<div class="d-flex justify-content-center align-items-center vh-100">
			<button class="shape-outer d-flex flex-shrink-0 border-0 polygon">
				<h4
					class="shape-inner m-auto polygon text-secondary d-flex justify-content-center align-items-center"
					@click="$router.push('/overview')">
					todo lists
				</h4>
			</button>
		</div>
	</div>
</template>

<style lang="sass" scoped>
.shape-outer
	height: calc(150px + 4vw)
	width: calc(150px + 4vw)
	background-color: linear-gradient(to bottom left, white)


.shape-inner
	height: calc(130px + 4vw)
	width: calc(130px + 4vw)

.polygon
	-webkit-clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)
	clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)
</style>