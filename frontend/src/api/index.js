import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const generateProcess = async (userGoal) => {
  const response = await api.post('/generate-process', { user_goal: userGoal })
  return response.data
}

export default api
