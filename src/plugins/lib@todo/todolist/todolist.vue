<template>
	<div class="container">
		<div v-if="toDoList" class="row bg-white d-flex justify-content-center p-5 w-full">
			<h2 class="mt-5 mb-3 d-flex justify-content-center">{{ toDoList.title }}</h2>
				<z-add-button :isClosed="isCreateNewToDoFormShown"
					@buttonClose="isCreateNewToDoFormShown = !isCreateNewToDoFormShown"/>
				<createNewToDo
					@createNewToDo="_createNewToDo" :isCreateNewToDoFormShown="isCreateNewToDoFormShown"/>
				<h5 class="d-flex justify-content-center text-center mt-5">
					Todos
				</h5>
				<div class="col-8">
					<input class=" w-80 form-control mt-3 mb-1" placeholder="e.g. My ToDo" v-model="searchBar" />
				</div>
				<z-filter-bar @filterChanged="selectedFilter = $event"/>
				<zToDoCards v-if="toDoList?.toDos?.length"
					:array="sortedToDos" :nestedHref="`/todolist/${toDoList.id}/todo/`"/>
				<div class="mt-4 d-flex flex-column align-items-center" v-else>
					<p class="text-center text-muted">
						You have no toDos in this todolist. Go a head and create one!
					</p>
					<img class="emoji-frown opacity-50" src="@/plugins/theme/svg/emoji-frown.svg">
				</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { IToDoList, IToDo, EFilterTypes } from '../todoStore/ITodo'
import createNewToDo from '../todo/create-new-toDo.vue'
import zFilterBar from '../_components/z-filter-bar.vue'
import ZAddButton from '../_components/z-add-button.vue'
import zToDoCards from '../_components/z-toDo-cards.vue'


const store = useStore()
const route = useRoute()

const searchBar = ref<string>('')
const toDoList = ref<IToDoList | null>(null)
const isCreateNewToDoFormShown = ref<boolean>(false)
const selectedFilter = ref<Partial<Record<keyof typeof EFilterTypes, string>>>(Object.keys(EFilterTypes)[0])

const sortedToDos = computed<IToDo[]>(() => {
	let _sortedToDos = [ ...toDoList.value?.toDos]
	const filterKey: string = selectedFilter.value
	const searchValue = searchBar.value

	switch(selectedFilter.value) {
		case 'mostRecent':
			_sortedToDos = _sortedToDos.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
				.filter((toDo: IToDo) => !toDo.is_removed)
			break
		case 'deadline':
			_sortedToDos = _sortedToDos.sort((a, b) => Number(a.deadline) - Number(b.deadline))
				.filter((toDo: IToDo) => !toDo.is_removed)
			break
		case 'alphabetical':
			_sortedToDos = _sortedToDos.sort((a, b) => a.title.localeCompare(b.title))
				.filter((toDo: IToDo) => !toDo.is_removed)
			break
		case 'is_completed':
			_sortedToDos = _sortedToDos.filter((todo) => !!todo.is_completed && !todo.is_removed)
			break
		default:
			_sortedToDos = _sortedToDos.filter((todo) => !!todo[filterKey])
			break
	}

	if(searchValue.length) {
		_sortedToDos = _sortedToDos.filter((todo: IToDo) =>
			todo.title.includes(searchValue) || todo.text.includes(searchValue))
	}

	return _sortedToDos
})

const _loadToDoList = async () => toDoList.value = await store
	.dispatch('todoStore/loadToDoList', route.params.toDoListId)

const _createNewToDo = async ($event: IToDo) => {
	await store.dispatch('todoStore/createNewToDo', [$event, route.params.toDoListId])
		.then(async () => {
			await _loadToDoList()
			isCreateNewToDoFormShown.value = false
		})
}


onBeforeMount(async () => _loadToDoList())
</script>

<style lang="sass" scoped>
.emoji-frown
	height: 5rem
	fill: red
</style>
