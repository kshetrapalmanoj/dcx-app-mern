import axios from 'axios'

const BASE_URL = "http://localhost:3127/api"
const MAIL_API_URL = "https://mailthis.to/manoj"

class DeveloperService {
  registerUser(data) {
    return axios.post(`${BASE_URL}/developer/register`, data)
  }

  getDevelopers() {
    return axios.get(`${BASE_URL}/developer/`);
  }

  login(data) {
    return axios.post(`${BASE_URL}/developer/login`, data)
  }

  submitContactForm(data) {
    return axios.post(`${BASE_URL}/contact/register`, data);
  }

  sendMail(data) {
    return axios.post(`${MAIL_API_URL}`, data)
  }
}

export default new DeveloperService();
