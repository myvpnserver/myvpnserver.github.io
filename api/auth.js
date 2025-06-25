import { shortBaseUrl } from './config.js';
import { getStorage, setStorage } from '../utils/storage.js';

export async function getAuthToken() {
  
  console.log('Token called');
  const { token, user_id } = await getStorage(['token', 'user_id']);
  console.log('Retrieved token:', token);
  console.log('Retrieved user_id:', user_id);

  if (token && user_id) {
    console.log('Token and user_id found, returning...');
    return;
  }

  console.log('Token or user_id not found, fetching new token...');
  const res = await fetch(shortBaseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path: '/api/login', auth_type: 'chrome' })
  });

  const data = await res.json();
  console.log('Server response:', data);

  if (data.result === 'ok') {
    await setStorage({ token: data.token, user_id: data.user_id });
    console.log('New token and user_id saved');
  } else {
    console.error('Failed to get token:', data);
  }
}

