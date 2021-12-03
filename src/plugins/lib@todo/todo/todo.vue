<template>
	<div class="container">
		<div class="bg-white d-flex justify-content-center align-items-center p-5 vh-100">
				<div v-if="toDo" class="mb-2 col-8 d-flex justify-content-center card"
					:class="[{'successfull-border': !toDo.is_removed && toDo.is_completed}, {'opacity-50': toDo.is_removed}]">
					<div class="card-body" v-if="editedToDo">
						<z-alert :isAlertShown="isAlertShown"
							alertMessage="You have successfully edited this toDo!"
							:message="'You have successfully updated this todo'"/>
						<h5 class="card-title" v-if="!isEditable">{{ toDo.title }}</h5>
						<input class="card-title form-input" v-model="editedToDo.title" v-else>
						<h6 class="card-subtitle mb-2 text-muted">
							Created at: {{ _created_at(toDo.created_at) }}
						</h6>
						<p class="card-text" v-if="!isEditable">{{ toDo.text }}</p>
						<textarea class="card-text" v-model="editedToDo.text" v-else/>
						<div class="d-flex justify-content-between align-items-center">
							<p class="m-0 text-danger">{{ endsIn }}</p>
							<div class="tool-bar d-flex flex-col align-items-start flex-nowrap" v-if="!toDo.is_removed">
								<a class="cursor-pointer d-flex justify-content-end"
									v-if="isEditable" @click="editToDo()">
									<img src="@/plugins/theme/svg/check2-circle.svg"
										@click="updateToDo(editedToDo, true)"/>
									Save
								</a>
								<a class="cursor-pointer d-flex justify-content-end"
									v-if="isEditable" @click="discardChanges()">
									<img src="@/plugins/theme/svg/x-circle.svg"/>
									Discard
								</a>
								<a class="cursor-pointer d-flex justify-content-end"
									v-if="!isEditable" @click="toggleComplate()">
									<img src="@/plugins/theme/svg/check-lg.svg"/>
									{{ toDo.is_completed ? 'Reopen' : 'Complete' }}
								</a>
								<a class="cursor-pointer d-flex justify-content-end"
									v-if="!isEditable" @click="isEditable = !isEditable">
									<img src="@/plugins/theme/svg/vector-pen.svg"/>
									Edit
								</a>
								<a class="cursor-pointer d-flex justify-content-end"
									v-if="!isEditable" @click="deleteToDo()">
									<img src="@/plugins/theme/svg/x-lg.svg"/>
									Remove
								</a>
							</div>
						</div>
					</div>
				</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { _endsIn, _created_at } from '@/plugins/custom/dateUtil'
import { IToDo } from '../todoStore/ITodo'
import zAlert from '../_components/z-alert.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const toDo = ref<IToDo | null>(null)
const editedToDo = ref<IToDo | null>(null)
const isEditable = ref<boolean>(false)
const isAlertShown = ref<boolean>(false)

const endsIn = ref()

setInterval(() => {
	if(!toDo.value) return
	endsIn.value = _endsIn(toDo.value.deadline)
}, 1000)

const editToDo = async () => {
	if(!toDo.value || !editedToDo.value) return
	editedToDo.value.is_edited = true
	await updateToDo(editedToDo.value)
}

const discardChanges = () => {
	if(!toDo.value || !editedToDo.value) return
	editedToDo.value.title = toDo.value?.title
	editedToDo.value.text = toDo.value?.text
	isEditable.value = false
}

const deleteToDo = async () => {
	if(!toDo.value) return
	const editedToDo = toDo.value
	editedToDo.is_removed = !editedToDo.is_removed
	await updateToDo(editedToDo)
	router.push(`/todolist/${route.params.toDoListId}`)
}

const toggleComplate = async () => {
	if(!toDo.value) return
	const editedToDo = toDo.value
	editedToDo.is_completed = !editedToDo.is_completed
	await updateToDo(editedToDo)
}

const updateToDo = async (editedToDo: IToDo, openAlert?: boolean) => await store
	.dispatch('todoStore/updateToDo', [editedToDo, route.params.toDoListId])
	.then(async () => {
		await _loadToDo()
		isEditable.value = false
		if(!openAlert) return
		isAlertShown.value = true
	})


const _loadToDo = async () => toDo.value = await store
	.dispatch('todoStore/loadToDo', [route.params.toDoListId, route.params.todoId])

onBeforeMount(async () => await _loadToDo().then(() => editedToDo.value = { ...toDo.value}))

</script>

<style lang="sass" scoped>
img 
	height: 16px

input
	font-size: 1.25rem
	font-weight: 600

input, textarea
	outline: none
	resize: none
	border: 0
	width: 100%
	border-bottom: 2px solid #efefef

.tool-bar a
	text-decoration: none
	color: black
	font-size: 0.8rem

.tool-bar
	flex-direction: column
</style>
