<template>
	<div v-if="isAlertShown" class="alert alert-success d-flex align-items-center justify-content-between" role="alert">
		<div class="d-flex align-items-center">
			<img src="@/plugins/theme/svg/check-circle-fill.svg">
			<div class="alert-text">
				{{ alertMessage }}
			</div>
		</div>
		<img class="cursor-pointer" src="@/plugins/theme/svg/x-lg.svg" @mousedown="emit('hideAlert')" data-bs-dismiss="alert" >
	</div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits } from 'vue'

interface IProps {
	isAlertShown: boolean,
	alertMessage: string
}

const props = withDefaults(defineProps<IProps>(), {
	isAlertShown: false,
	alertMessage: ''
})

const emit = defineEmits<{
	(e: 'hideAlert'): void
}>()
</script>