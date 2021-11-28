import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { cRoute } from '../custom/route'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/home',
	},

	cRoute('Homepage', '/home', () => import('@/plugins/app@home/homepage/homepage.vue')),
	cRoute('Overview', '/overview', () => import('@/plugins/lib@todo/todo-overview.vue')),
	cRoute('Todo list', '/todos', () => import('@/plugins/lib@todo/todolist.vue')),
	cRoute('Todo', '/todo/:todoId', () => import('@/plugins/lib@todo/todo.vue'))
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
