<template>
	<div class="mb-2 col-8 d-flex justify-content-center card"
		v-for="(toDo, i) in array" :key="i"
		:class="[{'successfull-border': !toDo.is_removed && toDo.is_completed}, {'opacity-50': toDo.is_removed}]">
		<div class="card-body">
			<h5 class="card-title">{{ toDo.title}} </h5>
			<h6 class="card-subtitle mb-2 text-muted">
				Created at: {{ _created_at(toDo.createdAt) }}
			</h6>
			<p class="card-text" v-if="toDo.hasOwnProperty('text')">{{ toDo.text }}</p>
			<a class="cursor-pointer d-flex justify-content-end"
				@click="$router.push(addIdAtTheEnd ? `${nestedHref}${toDo.id}` : `${nestedHref}${toDo.id}`)">
				<img src="@/plugins/theme/svg/arrow-return-right.svg" />
			</a>
		</div>
	</div>
</template>
	
<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { _created_at } from '../../custom/dateUtil'
import { IToDo, IToDoList } from '@/plugins/lib@todo/todoStore/ITodo'

const props = defineProps({
	array: Array as PropType<IToDo[] | IToDoList[]>,
	nestedHref: String,
	addIdAtTheEnd: Boolean
})
</script>