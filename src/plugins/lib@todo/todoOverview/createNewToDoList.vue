<template>
	<transition name="bounce">
		<div v-if="isCreateNewToDoListFormShown">
			<form class="mt-3" :class="{'mb-5': !formInputFocused}"
				@submit.prevent="emitCreateNewToDoList">
				<div class="d-flex justify-content-center align-items-center ">
					<input class="form-input rounded py-1 px-2"
						placeholder="e.g My new ToDo list title"
						v-model="createNewToDoListForm.title"
						@focus="formInputFocused = true"
						@blur="formInputFocused = false">
					<button type="submit" :disabled="v.$invalid"
						:class="[{'opacity-25': v.$invalid}, {'cursor-pointer': !v.$invalid}]">
						<img class="form-send-icon ml-2 p-1" src="@/plugins/theme/svg/send.svg">
					</button>
				</div>
			</form>
			<div class="d-flex justify-content-center">
				<div class="alert alert-danger d-flex align-items-center col-8 mb-2 mt-2"
					role="alert" v-if="isCreateNewToDoListFormShown && (v.$silentErrors.length && formInputFocused)">
					<p class="error-message text-start" v-for="error of v.$silentErrors" :key="error.$uid">
						{{ error.$message }}
					</p>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, ref, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
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

const formInputFocused = ref<boolean>(false)
const createNewToDoListForm = reactive<ICreateNewToDoListForm>({
	title: ''
})
const rules = {
	title: {
		required: helpers.withMessage('You have to fill this field!', required),
		minLength: helpers.withMessage(
			({ $params }) => `This field must have minimal length of ${$params.min} characters`,
      minLength(3)
    )
	}
}
const v = useVuelidate(rules, createNewToDoListForm)

const emitCreateNewToDoList = () => {
	if (v.$invalid) return
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
