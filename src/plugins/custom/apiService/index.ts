import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_SERVICE_URL

export default {
	async get(url: string, config?: any):Promise<any> {
		return axios.get(url, config)
			.then((response: any) => response.data)
			.catch((error: any) => error)
	},

	async post(url: string, parameters: any | null, config?: any):Promise<any> {
		return axios.post(url, parameters, config)
			.then((response: any) => response.data)
			.catch((error: any) => error)
	},

	async put(url: string, parameters: any | null, config?: any):Promise<any> {
		return axios.put(url, parameters, config)
			.then((response: any) => response.data)
			.catch((error: any) => error)
	},

	async delete(url: string, config?: any):Promise<any> {
		return axios.put(url, config)
			.then((response: any) => response.data)
			.catch((error: any) => error)
	}
}