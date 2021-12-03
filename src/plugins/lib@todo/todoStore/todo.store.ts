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
	async createNewToDo({ commit }: { commit: Commit }, [toDo, todoListId] : [toDo: IToDo, todoListId: string]):Promise<IToDo> {
		return await	apiService.post(`/todolist/${todoListId}/toDo`, toDo)
	},

	async updateToDo({ commit }: { commit: Commit }, [updatedToDo, todoListId] : [updatedToDo: IToDo, todoListId: number]):Promise<IToDo> {
		return await apiService.put(`/todolist/${todoListId}/toDo/${updatedToDo.id}`, updatedToDo)
	},

	async createNewToDoList({ commit }: { commit: Commit }, createNewToDoListForm: ICreateNewToDoListForm):Promise<void> {
		return await apiService.post('/todolist', createNewToDoListForm)
	},	

	async loadToDoLists({ commit }: { commit: Commit }):Promise<IToDoList[]> {
		const toDoLists: IToDoList[] = 	await apiService.get('todolist')
		commit('todolists_success', toDoLists)
		return toDoLists
	},
	
	async loadToDoList({ dispatch }: { dispatch: Dispatch }, toDoListId: number):Promise<IToDoList> {
		return await apiService.get(`todolist/${toDoListId}`)
	},

	async loadToDo({ commit }: { commit: Commit }, [toDoListId, todoId]: string[]):Promise<IToDo> {
		return await apiService.get(`/todolist/${toDoListId}/toDo/${todoId}`)
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
