import axios from 'axios';

const apiPost = async (url: string, data: any) => {
  try {
    const headers = { 'Access-Control-Allow-Origin': '*' };
    const response = await axios.post(url, data, { headers});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiPost;