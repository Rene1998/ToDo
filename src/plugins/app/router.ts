import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { cRoute } from '../custom/route'

const prefixRoutes = (prefix: string, routes: Array<RouteRecordRaw>) => {
	routes.map((route) => route.path = `${prefix}/${route.path}`)
	return routes
}

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/home',
	},

	cRoute('Homepage', '/home', () => import('@/plugins/app@home/homepage/homepage.vue')),
	cRoute('Overview', '/overview', () => import('@/plugins/lib@todo/todoOverview.vue')),
	...prefixRoutes('/todolist/:toDoListId', [
		cRoute('Todo list', '', () => import('@/plugins/lib@todo/todolist.vue')),
		cRoute('Todo', 'todo/:todoId', () => import('@/plugins/lib@todo/todo.vue'))
	])
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
