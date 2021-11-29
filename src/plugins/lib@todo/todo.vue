<template>
	<div class="container">
		<div class="bg-white d-flex justify-content-center align-items-center p-5 vh-100">
				<div v-if="toDo" class="mb-2 col-8 d-flex justify-content-center card">
					<div class="card-body">
						<h5 class="card-title">{{ toDo.title }}</h5>
						<h6 class="card-subtitle mb-2 text-muted">
							Created at: {{ _created_at(toDo.createdAt)  }}
						</h6>
						<p class="card-text">{{ toDo.text }}</p>
						<div class="d-flex justify-content-between align-items-center">
							<p class="m-0 text-danger">Ends in: <b>{{ endsIn }}</b></p>
							<div class="d-flex">
								<a class="cursor-pointer d-flex justify-content-end">
									<img src="@/plugins/theme/svg/check-lg.svg"/>
								</a>
								<a class="cursor-pointer d-flex justify-content-end">
									<img src="@/plugins/theme/svg/vector-pen.svg"/>
								</a>
								<a class="cursor-pointer d-flex justify-content-end">
									<img src="@/plugins/theme/svg/x-lg.svg"/>
								</a>
							</div>
						</div>
					</div>
				</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import moment from 'moment'
import { _endsIn, _created_at } from '@/plugins/custom/dateUtil'
import { IToDo } from './todoStore/ITodo'

const store = useStore()
const route = useRoute()

const toDo = ref<IToDo | null>(null)
const editMode = ref<boolean>(false)

const endsIn = ref()

setInterval(() => {
	if(!toDo.value) return
	endsIn.value = _endsIn(toDo.value.deadline)
}, 1000)


// const a = computed(() => {
// 	return moment();
// })


// watchEffect(() => endsIn(toDo.value && toDo.value.deadline))

onBeforeMount(async () => {
	toDo.value = await store.dispatch('todoStore/loadToDo', [ route.params.toDoListId, route.params.todoId ])
	// console.log(toDo.value)
})

</script>

<style lang="sass" scoped>
img 
	height: 16px
</style>
