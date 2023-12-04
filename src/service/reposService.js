import http from '../api/githubApi.js';
import axiosInstance from 'axios'


class ReposSevice { 
  
  getUsers() {
    return http.get('/users')
  }
  getReposUser(login) {
    const response = http.get(`/users/${login}/repos`)
    return response
    
  }
  getUser(login) {
    const response = http.get(`/users/${login}`)
    return response
  }
  getRepoInfoById(id) {
    const response = http.get(`/repositories/${id}`)
    return response
  }
  getLanguages(id) {
    const response = http.get(`/repositories/${id}/languages`)
    return response
  }
  async getUserRepos(login) {
    
    try {
      const response = await axiosInstance.get(`/users/${login}/repos`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch user repositories');
    }
  }
}
export default new ReposSevice()