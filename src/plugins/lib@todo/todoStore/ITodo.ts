// export interface IToDoList {
// 	createdAt: Date,
// 	title: string,
// 	id: string,
// 	'todo-listId': string,
// }

export interface IToDo {
	is_created: number,
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
	created_at: number,
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

export interface ICreateNewToDoForm extends ICreateNewToDoListForm {
	created_at: number,
	text: string,
	deadlineDate?: string,
	deadlineTime?: string,
	deadline: number,
	is_completed: boolean,
	is_edited: boolean,
	is_removed: boolean,
}

export enum EFilterTypes {
	mostRecent = 'Most recent',
	alphabetical = 'Alphabetical',
	deadline = 'Deadline',
	is_completed = 'Completed',
	is_edited = 'Edited',
	is_removed = 'Removed',
}