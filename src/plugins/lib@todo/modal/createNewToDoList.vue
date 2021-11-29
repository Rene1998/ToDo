<template>
	<div class="modal fade" id="createNewToDoList" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">
					Create new ToDo list
				</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<form class="modal-body">
				<div class="mb-3">
					<label class="form-label">
						Title
					</label>
					<input class="form-control" placeholder="My new ToDo list" v-model="createNewToDoListForm.title">
				</div>
			</form>
      <div class="modal-footer d-flex justify-content-center">
				<span class="cursor-pointer" @click="emitCreateNewToDoList">
					<img src="@/plugins/theme/svg/plus-lg.svg">
				</span>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { reactive, defineEmits } from 'vue'
import { ICreateNewToDoListForm } from '../todoStore/ITodo'

const emit = defineEmits<{
	(e: 'createNewToDoList', createNewToDoListForm: ICreateNewToDoListForm): void
}>()

const createNewToDoListForm = reactive<ICreateNewToDoListForm>({
	title: ''
})

const emitCreateNewToDoList = () => {
	emit('createNewToDoList', createNewToDoListForm)
}

</script>

<style lang="sass" scoped>
	img
		opacity: 1
		color: white
</style>
