import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_SERVICE_URL

export default {
	async get(url: string, config?: any) {
		return axios.get()
	}
}