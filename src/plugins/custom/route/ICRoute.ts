import { Component } from 'vue'

export interface ICRoute {
	path: string,
	name: string,
	meta: {
		title: string,
	},
	component: Component,
}