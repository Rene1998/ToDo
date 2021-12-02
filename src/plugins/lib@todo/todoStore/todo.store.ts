import { Commit, Dispatch } from 'vuex'
import apiService from '@/plugins/custom/apiService'
import { IToDoList, IToDo, IState, ICreateNewToDoListForm } from './ITodo'

const state: IState = {
	toDoLists: [],
}

const mutations = {
	todolists_success(state: IState, data: IToDoList[]): void {
		state.toDoLists = data
	},
	todolist_success(state: IState, data: IToDoList): void {
		state.toDoLists.push(data)
	}
}

const actions = {
	// async deleteToDo({ commit }: { commit: Commit }, [todoListId, todoId] : string[]):Promise<void> {
	// 	try {
	// 		await apiService.delete(`todo-lists/${todoListId}/todolist/${todoListId}/todo/${todoId}`)
	// 	} catch (err) {
	// 		console.error(err)
	// 	}
	// },

	async createNewToDo({ commit }: { commit: Commit }, [toDo, todoListId] : [toDo: IToDo, todoListId: string]):Promise<any> {
		await	apiService.post(`/todo-lists/${todoListId}/todolist/${todoListId}/todo`, toDo)
			.then((res) => res && console.log(res))
			.catch((err) => console.error(err))
	},

	async updateToDo({ commit }: { commit: Commit }, [updatedToDo, todoListId] : [updatedToDo: IToDo, todoListId: number]):Promise<void> {
		try {
			await	apiService.put(`todo-lists/${todoListId}/todolist/${todoListId}/todo/${updatedToDo.id}`, updatedToDo)
		} catch (err) {
			console.error(err)
		}
	},

	async createNewToDoList({ commit }: { commit: Commit }, createNewToDoListForm: ICreateNewToDoListForm):Promise<void> {
		try {
			await apiService.post('/todo-lists', createNewToDoListForm)
		} catch (err) {
			console.error(err)
		}
	},

	async loadToDoLists({ commit }: { commit: Commit }):Promise<IToDoList[]> {
		return await apiService.get('todo-lists').then((res) => {
			commit('todolists_success', res)
			return res
		}).catch((err) => {
			console.error(err)
		})
	},
	
	async loadToDoList({ dispatch }: { dispatch: Dispatch }, toDoListId: number):Promise<void> {
		return await apiService.get(`todo-lists/${toDoListId}`).then((res) => {
			return res.toDos.length ? dispatch('_loadToDos', res) : res
		}).catch((err) => console.error(err))
	},

	async loadToDo({ commit }: { commit: Commit }, [toDoListId, todoId]: string[]):Promise<IToDo> {
		return await apiService.get(`todo-lists/${toDoListId}/todolist/${toDoListId}/todo/${todoId}`).then((res) => {
			return res
		}).catch((err) => console.error(err))
	},

	async _loadToDos({ commit }: { commit: Commit }, toDoList: IToDoList):Promise<IToDoList> {
		const _toDoList: IToDoList = toDoList
		try {
			_toDoList.toDos = await apiService.get(`todo-lists/${toDoList.id}/todolist/${toDoList.id}/todo/`)
			commit('todolists_success', _toDoList)
		} catch (err) {
			console.error(err)
		}
		return _toDoList
	}
}

const getters = {
	toDoLists: (state: IState) => ():IToDoList[] => state.toDoLists
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
