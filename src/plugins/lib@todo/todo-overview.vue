<template>
	<div class="container vh-100">
		<div class="row bg-white d-flex justify-content-center p-5 w-full">
			<div class="col-8 create-new-todolist-container d-flex justify-content-center align-items-center">
				<img class="circle-icon p-0 mb-2 cursor-pointer" src="@/plugins/theme/svg/plus-circle.svg"
					data-bs-toggle="modal" data-bs-target="#createNewToDoList">
			</div>
			<div class="mb-2 col-8 d-flex justify-content-center card">
				<div class="card-body">
					<h5 class="card-title"> Moj todo list</h5>
					<h6 class="card-subtitle mb-2 text-muted">Vytvorene 20.20.20002</h6>
					<a class="cursor-pointer d-flex justify-content-end">
						<img src="@/plugins/theme/svg/arrow-return-right.svg" />
					</a>
				</div>
			</div>
			<div class="mb-2 col-8 d-flex justify-content-center card">
				<div class="card-body">
					<h5 class="card-title"> Moj todo list</h5>
					<h6 class="card-subtitle mb-2 text-muted">Vytvorene 20.20.20002</h6>
					<a class="cursor-pointer d-flex justify-content-end">
						<img src="@/plugins/theme/svg/arrow-return-right.svg" />
					</a>
				</div>
			</div>
			<div class="mb-2 col-8 d-flex justify-content-center card">
				<div class="card-body">
					<h5 class="card-title"> Moj todo list</h5>
					<h6 class="card-subtitle mb-2 text-muted">Vytvorene 20.20.20002</h6>
					<a class="cursor-pointer d-flex justify-content-end">
						<img src="@/plugins/theme/svg/arrow-return-right.svg" />
					</a>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="createNewToDoList" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">
					Create new ToDo list
				</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				as dsdfsdf sd fsd fs df sd f
			</div>
      <div class="modal-footer">
				<span class="bg-success rounded-circle opacity-25 px-2 py-1 cursor-pointer" data-bs-dismiss="modal">
					<img class="opacity-100" src="@/plugins/theme/svg/x-lg.svg">
				</span>
				<span class="bg-danger rounded-circle opacity-25 px-2 py-1 cursor-pointer">
					<img class="opacity-100" src="@/plugins/theme/svg/plus-lg.svg">
				</span>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'

onBeforeMount(async () => {
	await this
})

</script>

<style lang="sass" scoped>
::v-deep(.modal-footer) button img
	color: white

.create-new-todolist-container
	padding: 0.1rem

.circle-icon
	fill: #6C7EAF
	color: #6C7EAF
	width: 2rem
	height: 2rem
	// width: 100px
	// height: 100px
	vertical-align: middle
	padding: 1.875rem
	
</style>