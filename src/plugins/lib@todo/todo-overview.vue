<template>
	<div class="container">
		<div class="row p-5 w-full">
			<div class="col" />
			<div class="col-5 d-flex justify-content-center">
				<h4 class="p-3 text-muted rounded-top">
					Add new ToDo list
				</h4>
			</div>
			<div class="col" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'

onBeforeMount(async () => {
	await this
})

</script>

<style scoped>
	h4 {
		background-color: #f0f0f0;
	}
</style>