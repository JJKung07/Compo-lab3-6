import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.instantwebtools.net/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getPassengers(page: number, size: number) {
    return apiClient.get(`/passenger?page=${page}&size=${size}`)
  },
  getPassenger(_id: String) {
    return apiClient.get('/passenger/' + _id);
  },
  getAirline(airlineId: String) {
    return apiClient.get('/airlines/' + airlineId);
  }
};
