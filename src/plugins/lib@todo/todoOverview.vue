<template>
	<div class="container vh-100">
		<div class="row bg-white d-flex justify-content-center p-5 w-full">
			<div v-if="isAlertShown" class="alert alert-success d-flex align-items-center justify-content-between" role="alert">
				<div class="d-flex align-items-center">
					<img src="@/plugins/theme/svg/check-circle-fill.svg">
					<div class="alert-text">
						You have successfully created a new ToDo list!
					</div>
				</div>
				<img class="cursor-pointer" src="@/plugins/theme/svg/x-lg.svg" data-bs-dismiss="alert">
			</div>
			<div class="col-8 create-new-todolist-container d-flex justify-content-center align-items-center">
				<img class="circle-icon p-0 mb-2 cursor-pointer" src="@/plugins/theme/svg/plus-circle.svg"
					data-bs-toggle="modal" data-bs-target="#createNewToDoList">
			</div>
			<template v-if="toDoLists?.length">
				<div class="mb-2 col-8 d-flex justify-content-center card"
					v-for="(toDoList, i) in toDoLists.reverse()" :key="i">
					<div class="card-body">
						<h5 class="card-title">{{ toDoList.title}} </h5>
						<h6 class="card-subtitle mb-2 text-muted">
							Vytvorene: {{ _created_at(toDoList.createdAt) }}
						</h6>
						<a class="cursor-pointer d-flex justify-content-end" @click="$router.push(`/todolist/${toDoList.id}`)">
							<img src="@/plugins/theme/svg/arrow-return-right.svg" />
						</a>
					</div>
				</div>
			</template>
			<div class="my-5 d-flex justify-content-center text-muted " v-else>
				You have no ToDo lists at the time. Go a head and create one!
			</div>
		</div>
	</div>
	<createNewToDoList @createNewToDoList="_createNewToDoList"/>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { _created_at } from '../custom/dateUtil'
import { IToDoList, ICreateNewToDoListForm } from './todoStore/ITodo'
import createNewToDoList from './modal/createNewToDoList.vue'

const store = useStore()
const toDoLists = ref<IToDoList[] | null>(null)
const isAlertShown = ref(false)

const _createNewToDoList = async (createNewToDoListForm: ICreateNewToDoListForm) => {
	try {
		await store.dispatch('todoStore/createNewToDoList', createNewToDoListForm)
		toDoLists.value = await store.dispatch('todoStore/loadToDoLists')
	} catch (err) {
		console.error(err)
	}
}

onBeforeMount(async () => {
	toDoLists.value = await store.dispatch('todoStore/loadToDoLists')
	console.log(toDoLists.value)
})

</script>

<style lang="sass" scoped>
::v-deep(.modal-footer) button img
	color: white

.alert-text
	margin-left: 0.75rem

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