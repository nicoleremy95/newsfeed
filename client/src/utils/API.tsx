//axios allows for an https request from the frontend to the backend server
import axios from 'axios';
const urlPrefix = 'http://localhost:8080';

//TODO: 
const API = {
    //NEWS COLLECTION
    getAllNews: function() {
        return axios.get(`${urlPrefix}/news`)
    },
    postNews: function(news: object){
        return axios.post(`${urlPrefix}/news`, news, { withCredentials: true })
    },
    postComment: function(comment: object, newsId: string){
        return axios.post(`${urlPrefix}/comment/${newsId}`, comment, { withCredentials: true })
    },
    postReaction: function(reaction: string, newsId: string){
        return axios.post(`${urlPrefix}/reaction/${newsId}`, reaction, { withCredentials: true })
    },
    updateNews: function(news: object, newsId: string){
        return axios.put(`${urlPrefix}/news/${newsId}`, news, { withCredentials: true })
    },
    deleteNews: function(newsId: string){
        return axios.delete(`${urlPrefix}/news/${newsId}`, {withCredentials: true})
    }, 
    signup: function(user: object){
        return axios.post(`${urlPrefix}/signup`, user, { withCredentials: true })
    },
    updateAccount: function(user: object, userId: string){
        return axios.put(`${urlPrefix}/news/${userId}`, user, { withCredentials: true })
    },
    deleteAccount: function(userId: string){
        return axios.delete(`/delete/${userId}`, {withCredentials:true})
    },
    login: function(user: object){
        return axios.post(`${urlPrefix}/login`, user, { withCredentials: true })
    },
    logout: function(){
        return axios.get(`${urlPrefix}/logout`, { withCredentials: true })
    },
    getCurrentUser: function (){
        return axios.get(`${urlPrefix}/readsession`, { withCredentials: true })
    },
    getNewsById: function(newsId: string){
        return axios.get(`${urlPrefix}/news/${newsId}`)
    }
}

export default API;