import axios from 'axios';
import type { AxiosResponse, Method } from 'axios';

export async function callApi<T>(
  endpoint: string,
  requestData: any,
  method: Method = 'get'
): Promise<T> {
  try {

    endpoint = 'https://localhost:8080' + endpoint;

    const response: AxiosResponse<any> = await axios.request({
      url: endpoint,
      method: method,
      data: requestData
    });

    return response.data;
  } catch (error: Error | any) {

    if (error.response) {

      console.error('Server responded with error:', error.response.data);
      throw new Error('Server responded with error');
    } else if (error.request) {

      console.error('No response received from server:', error.request);
      throw new Error('No response received from server');
    } else {

      console.error('Error setting up the request:', error.message);
      throw new Error('Error setting up the request');
    }
  }
}

