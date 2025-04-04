import axios from 'axios';

const postReport = async (reportData:any) => {
  try {
    const response = await axios.post('http://localhost:5000/api', reportData);
    console.log('Report created successfully:', response.data);
    return response.data;
  } catch (error:any) {
    console.log('Error creating report:', error.response?.data || error.message);
    throw error;
  }
};

export {postReport}