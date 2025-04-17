// auth.js
export const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = 'SUA_CLIENT_ID_AQUI'; // Substituir por seu Client ID
const redirectUri = 'http://localhost:3000';
const scopes = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-modify-playback-state',
  'user-read-playback-state',
  'playlist-read-private',
  'user-library-read'
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;