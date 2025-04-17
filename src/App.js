// App.js
import React, { useEffect, useState } from 'react';
import { loginUrl } from './auth';
import VinylPlayer from './VinylPlayer';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const _token = hash.substring(1)
        .split("&")
        .find(item => item.startsWith("access_token"))
        .split("=")[1];
      setToken(_token);
      window.location.hash = '';
    }
  }, []);

  return (
    <div>
      {!token ? (
        <a href={loginUrl}>
          <button>Login com Spotify</button>
        </a>
      ) : (
        <VinylPlayer token={token} />
      )}
    </div>
  );
};

export default App;