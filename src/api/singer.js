import axios from 'axios';
import { HOST } from 'common/js/config';

export function getSingers() {
  const url = HOST + '/top/artists?offset=0&limit=50';
  return axios.get(url);
}
