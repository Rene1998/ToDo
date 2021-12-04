<template>
	<div class="d-flex col-8 justify-content-center w-full mb-5">
		<select name="name" class="form-control"
			v-model="selectedFilter" @change="emit('filterChanged', selectedFilter)">
			<option class="text-center" v-for="filterKey in Object.keys(EFilterTypes)"
				:key="filterKey" :value="filterKey">
				{{ EFilterTypes[filterKey] }}
			</option>
		</select>
	</div>
</template>

<script lang="ts" setup> 
import { defineEmits, ref, onMounted } from 'vue'
import { EFilterTypes } from '@/plugins/lib@todo/todoStore/ITodo'
const selectedFilter = ref<Partial<Record<keyof typeof EFilterTypes, string>>>(Object.keys(EFilterTypes)[0])

const emit = defineEmits<{
	(e: 'filterChanged', selectedFilter: Partial<Record<keyof typeof EFilterTypes, string>>): void
}>()
</script>

<style lang="sass" scoped>
select
	width: fit-content
</style>
