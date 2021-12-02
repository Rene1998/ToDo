<template>
	<div class="container vh-100">
		<div class="row bg-white d-flex justify-content-center p-5 w-full">
			<createNewToDoListAlert :isAlertShown="isAlertShown"
				@hideAlert="isAlertShown = false"/>
			<ZAddButton :isClosed="isCreateNewToDoListFormShown"
				@buttonClose="isCreateNewToDoListFormShown = !isCreateNewToDoListFormShown"/>
			<createNewToDoList :isCreateNewToDoListFormShown="isCreateNewToDoListFormShown"
				@createNewToDoList="_createNewToDoList"/>
			<zToDoCards v-if="toDoLists?.length" :array="toDoLists" :nestedHref="'/todolist/'" :addIdAtTheEnd="true"/>
			<div class="my-5 d-flex justify-content-center text-muted " v-else>
				You have no ToDo lists at the time. Go a head and create one!
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { IToDoList, ICreateNewToDoListForm } from '../todoStore/ITodo'
import createNewToDoList from './createNewToDoList.vue'
import createNewToDoListAlert from './createNewToDoListAlert.vue'
import ZAddButton from '../_components/zAddButton.vue'
import zToDoCards from '../_components/zToDoCards.vue'

const store = useStore()
const toDoLists = ref<IToDoList[] | null>(null)
const isAlertShown = ref(false)
const isCreateNewToDoListFormShown = ref<boolean>(false)

const _loadToDoLists = async () => {
	toDoLists.value = await store.dispatch('todoStore/loadToDoLists')
		.then((toDoLists) => toDoLists.reverse())
}

const _createNewToDoList = async (createNewToDoListForm: ICreateNewToDoListForm) => {
	try {
		await store.dispatch('todoStore/createNewToDoList', createNewToDoListForm)
		await _loadToDoLists()
		isAlertShown.value = true
	} catch (err) {
		console.error(err)
	}
}

onBeforeMount(async () => await _loadToDoLists())
</script>

<style lang="sass" scoped>
.alert-text
	margin-left: 0.75rem

.create-new-todolist-container
	padding: 0.1rem

</style>