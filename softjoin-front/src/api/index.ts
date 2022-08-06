import axios from 'axios';
//import * as config from '../config.json'

const api_url = "http://localhost:8080"
export default class API {

    protected route :string;
    constructor(route :string) {
        this.route = route;
    }

    async create (body: any): Promise<any> {
        return await axios.post(`${api_url}/${this.route}`, body);
    }

    async get (id: any): Promise<any> {
        return await axios.get(`${api_url}/${this.route}/${id}`);
    }

    async index (): Promise<any> {
        return await axios.get(`${api_url}/${this.route}/`);
    }

    async update (body: any): Promise<any> {
        return await axios.put(`${api_url}/${this.route}`, body);
    }

    async delete (id: any): Promise<any> {
        return await axios.delete(`${api_url}/${this.route}/${id}`);
    }

}
