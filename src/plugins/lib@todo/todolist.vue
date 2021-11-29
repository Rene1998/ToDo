<template>
	<div class="container">
		<div v-if="toDoList" class="row bg-white d-flex justify-content-center p-5 w-full">
			<h2 class="my-5 d-flex justify-content-center">{{ toDoList.title }}</h2>
				<div class="d-flex justify-content-between align-items-center">
					<img src="@/plugins/theme/svg/arrow-down.svg">
					<h5 class="d-flex justify-content-center">Todos</h5>
					<img src="@/plugins/theme/svg/arrow-down.svg">
				</div>
				<div v-for="(todo, i) in toDoList.toDos" :key="i" class="mb-2 col-8 d-flex justify-content-center card">
					<div class="card-body">
						<h5 class="card-title">{{ todo.title }}</h5>
						<h6 class="card-subtitle mb-2 text-muted">
							Vytvorene: {{ _created_at(todo.createdAt) }}
						</h6>
						<p class="card-text">{{ todo.text }}</p>
						<a class="cursor-pointer d-flex justify-content-end" @click="$router.push(`/todolist/${toDoList.id}/todo/${toDoList.id}`)">
							<img src="@/plugins/theme/svg/arrow-return-right.svg" />
						</a>
					</div>
				</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { _created_at } from '@/plugins/custom/dateUtil'
import { IToDoList } from './todoStore/ITodo'

const store = useStore()
const toDoList = ref<IToDoList | null>(null)

const route = useRoute()

onBeforeMount(async () => {
	toDoList.value = await store.dispatch('todoStore/loadToDoList', route.params.toDoListId)
	console.log(toDoList.value)
})

</script>

<style lang="sass" scoped>
img 
	height: 16px
</style>
