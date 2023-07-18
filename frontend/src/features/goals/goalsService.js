import axios from "axios";

const API_URI = "/api/goals/";

const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URI, goalData, config);

  return response.data;
};

const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URI, config);

  return response.data;
};

const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URI + id.toString(), config);

  return response.data;
};

const goalsService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalsService;
