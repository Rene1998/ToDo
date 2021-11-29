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
	async createNewToDoList({ commit }: { commit: Commit }, createNewToDoListForm: ICreateNewToDoListForm):Promise<void> {
		try {
			await apiService.post('todo-lists', createNewToDoListForm)
		} catch (err) {
			console.error(err)
		}
	},
	async loadToDoLists({ commit }: { commit: Commit }):Promise<IToDoList[]> {
		return await apiService.get('todo-lists').then((res) => {
			commit('todolists_success', res)
			// console.log(res)
			return res
		}).catch((err) => {
			console.error(err)
		})
	},
	async loadToDoList({ dispatch }: { dispatch: Dispatch }, toDoListId: number):Promise<void> {
		return await apiService.get(`todo-lists/${toDoListId}`).then((res) => {
			console.log(res)
			return dispatch('_loadToDos', res)
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
