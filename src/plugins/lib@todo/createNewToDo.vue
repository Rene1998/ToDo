<template>
	<form class="col-8 d-flex align-items-end rounded p-2" @submit.prevent="emitCreateNewToDo()">
		<div class="w-100">
			<div class="d-flex align-items-start justify-content-between">
				<div>
					<p>Title:</p>
					<input v-model="createNewToDoForm.title" />
				</div>
				<div>
					<p>Deadline:</p>
					<div>
						<input type="date" v-model="deadlineDate">
						<input type="time" v-model="deadlineTime">
					</div>
				</div>
			</div>
			<div>
				<p class="text-center">Description:</p>
				<textarea class="w-full" v-model="createNewToDoForm.text"/>
			</div>
		</div>
		<button class="form-submit rounded-circle cursor-pointer px-2 py-1" type="submit" />
	</form>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, ref, reactive } from 'vue'
import moment from 'moment'
import { _formatDeadline } from '@/plugins/custom/dateUtil/index'
import { ICreateNewToDoForm } from '../todoStore/ITodo'

interface IProps {
	isCreateNewToDoFormShown: false
}

const props = withDefaults(defineProps<IProps>(), {
  isCreateNewToDoFormShown: false
})

const emit = defineEmits<{
	(e: 'createNewToDo', createNewToDoListForm: ICreateNewToDoForm): void
}>()

const deadlineDate = ref<string>('')
const deadlineTime = ref<string>('')

const createNewToDoForm = reactive<ICreateNewToDoForm>({
	title: '',
	text: '',
	deadline: '',
	createdAt: 0
})

const emitCreateNewToDo = () => {
	createNewToDoForm.createdAt = moment().unix()
	createNewToDoForm.deadline = _formatDeadline(deadlineDate.value, deadlineTime.value)
	emit('createNewToDo', createNewToDoForm)
	createNewToDoForm.title = ''
	createNewToDoForm.text = ''
	createNewToDoForm.deadline = ''
}
</script>

<style lang="sass" scoped>
input, textarea
	outline: none
	resize: none
	border: 0
	// width: 10rem
	// border-bottom: 2px solid #efefef

p
	font-size: 0.5rem
	margin: 0
	padding: 0

form
	flex-direction: column
	border: 0.1rem #efefef solid

button
	border: 0
	background: #efefef url(../theme/svg/send.svg) no-repeat 
	width: fit-content
	width: 32px
	height: 32px
	background-position: center
</style>