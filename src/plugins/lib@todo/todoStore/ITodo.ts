// export interface IToDoList {
// 	createdAt: Date,
// 	title: string,
// 	id: string,
// 	'todo-listId': string,
// }

export interface IToDo {
	createdAt: number,
	title: string,
	id: string,
	text?: string,
	toDoId: string,
	is_removed: boolean,
	is_edited: boolean,
	is_completed: boolean,
	deadline: Date
}

export interface IToDoList {
	createdAt: number,
	title: string,
	id: string,
	toDos: IToDo[],
}

export interface IState {
	toDoLists: IToDoList[]
}

export interface ICreateNewToDoListForm {
	title: string
}