<template>
	<transition name="bounce">
		<div class="d-flex justify-content-center col-8 align-items-center flex-column" v-if="isCreateNewToDoFormShown">
			<form class=" d-flex align-items-end rounded p-2"
				@submit.prevent="emitCreateNewToDo()">
				<div class="w-100">
					<div class="d-flex align-items-start justify-content-between">
						<div class="col-6">
							<p>Title:</p>
							<input class="mr-5" v-model="createNewToDoForm.title"
								@focus="focusedInField = true"
								@blur="focusedInField = false"/>
						</div>
						<div class="col-3">
							<p>Deadline:</p>
							<div>
								<input type="date" v-model="createNewToDoForm.deadlineDate"
									@focus="focusedInField = true"
									@blur="focusedInField = false">
								<input type="time" v-model="createNewToDoForm.deadlineTime"
									@focus="focusedInField = true"
									@blur="focusedInField = false">
							</div>
						</div>
					</div>
					<div>
						<p class="text-center">Description:</p>
						<textarea v-model="createNewToDoForm.text"
							@focus="focusedInField = true"
							@blur="focusedInField = false"/>
					</div>
				</div>
				<button class="form-submit rounded-circle px-2 py-1" type="submit"
					:class="[{'cursor-pointer': !v.$invalid}, {'opacity-50': v.$invalid}]" :disabled="v.$invalid"/>
			</form>
			<div class="d-flex justify-content-center w-100"
				>
				<ul class="alert alert-danger d-flex align-items-center col-8 mb-2 mt-2 flex-column"
					role="alert" v-if="isCreateNewToDoFormShown && (v.$invalid && focusedInField)">
					<li class="error-message text-start" v-for="error of v.$silentErrors" :key="error.$uid">
						{{ error.$message }}
					</li>
				</ul>
			</div>
		</div>
	</transition>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, ref, reactive } from 'vue'
import moment from 'moment'
import useVuelidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
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

const focusedInField = ref<boolean>(false)
const createNewToDoForm = reactive<ICreateNewToDoForm>({
	title: '',
	text: '',
	deadlineDate: '',
	deadlineTime: '',
	createdAt: 0,
	is_removed: false,
	is_edited: false,
	is_completed: false
})
const rules = {
	title: {
		required: helpers.withMessage('You have to fill Title field!', required),
		minLength: helpers.withMessage(
			({ $params }) => `This field must have minimal length of ${$params.min} characters`,
      minLength(3)
    )
	},
	text: {
		required: helpers.withMessage('You have to fill Description field!', required),
		minLength: helpers.withMessage(
			({ $params }) => `This field must have minimal length of ${$params.min} characters`,
      minLength(12)
    )
	},
	deadlineDate: {
		required: helpers.withMessage('You have to fill deadline date field!', required)
	},
	deadlineTime: {
		required: helpers.withMessage('You have to fill deadline time field!', required)
	},
}
const v = useVuelidate(rules, createNewToDoForm)

const emitCreateNewToDo = () => {
	if (v.value.$invalid) return
	createNewToDoForm.createdAt = moment().unix()
	createNewToDoForm.deadline = _formatDeadline(createNewToDoForm.deadlineDate, createNewToDoForm.deadlineTime)
	delete createNewToDoForm.deadlineDate
	delete createNewToDoForm.deadlineTime
	emit('createNewToDo', createNewToDoForm)
	createNewToDoForm.title = ''
	createNewToDoForm.text = ''
	createNewToDoForm.deadline = ''
}
</script>

<style lang="sass" scoped>
::v-deep .alert
	padding-top: 1rem
	li
		font-size: 0.75rem !important

input, textarea
	outline: none
	resize: none
	border: 0
	background-color: #FAFAFA
	width: 100%
	border-radius: 10px

p, li
	font-size: 0.5rem
	margin: 0
	padding: 0

form
	flex-direction: column
	border: 0.1rem #efefef solid
	width: 100%

button
	border: 0
	background: #efefef url(../theme/svg/send.svg) no-repeat 
	width: fit-content
	width: 32px
	height: 32px
	background-position: center
</style>