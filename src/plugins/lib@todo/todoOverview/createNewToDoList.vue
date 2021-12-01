<template>
	<form class="d-flex justify-content-center align-items-center mt-3 mb-5"
		@submit.prevent="emitCreateNewToDoList" v-if="isCreateNewToDoListFormShown">
		<input class="form-input rounded py-1 px-2" placeholder="e.g My new ToDo list title" v-model="createNewToDoListForm.title">
		<button type="submit">
			<img class="form-send-icon cursor-pointer ml-2 p-1" src="@/plugins/theme/svg/send.svg">
		</button>
	</form>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, reactive } from 'vue'
import { ICreateNewToDoListForm } from '../todoStore/ITodo'

interface IProps {
	isCreateNewToDoListFormShown: false
}

const props = withDefaults(defineProps<IProps>(), {
  isCreateNewToDoListFormShown: false
})

const emit = defineEmits<{
	(e: 'createNewToDoList', createNewToDoListForm: ICreateNewToDoListForm): void
}>()

const createNewToDoListForm = reactive<ICreateNewToDoListForm>({
	title: ''
})

const emitCreateNewToDoList = () => {
	emit('createNewToDoList', createNewToDoListForm)
	createNewToDoListForm.title = ''
}

</script>

<style lang="sass" scoped>

button
	border: 0
	background-color: transparent

.form-send-icon
	width: 30px
	height: 30px

.form-input
	border: 2px solid #efefef
</style>
