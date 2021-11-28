import { ICRoute } from './ICRoute'
import { TCRoute } from './TCRoute'

export const cRoute = (...[title, path, component]: TCRoute): ICRoute => ({
	path,
	name: title,
	meta: { title },
	component
})