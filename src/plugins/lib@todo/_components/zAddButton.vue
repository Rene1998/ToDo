<template>
	<div class="create-new-todolist-container d-flex justify-content-center align-items-center">
		<img class="circle-icon p-0 mb-2 cursor-pointer" src="@/plugins/theme/svg/plus-circle.svg"
			@click="emit('buttonClose')"
			:style="{ 'transform': isClosed ? 'rotate(45deg)' : 'rotate(0)' }">
	</div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits } from 'vue'

interface IProps {
	isClosed: boolean
}

const props = withDefaults(defineProps<IProps>(), {
	isClosed: false
})

const emit = defineEmits<{
	(e: 'buttonClose'): void
}>()
</script>