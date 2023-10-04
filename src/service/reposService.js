import http from '../api/githubApi.js';


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
  
}
export default new ReposSevice()