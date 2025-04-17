import React, { useEffect, useState } from 'react';
import './VinylPlayer.css';

const VinylPlayer = ({ token }) => {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const newPlayer = new window.Spotify.Player({
        name: 'Vinyl 80s Player',
        getOAuthToken: cb => cb(token),
        volume: 0.5
      });

      setPlayer(newPlayer);

      newPlayer.addListener('ready', ({ device_id }) => {
        console.log('Pronto com ID:', device_id);
        setDeviceId(device_id);
        startPlayback(device_id);
      });

      newPlayer.addListener('initialization_error', ({ message }) => console.error('Erro ao iniciar', message));
      newPlayer.addListener('authentication_error', ({ message }) => console.error('Erro de autenticação', message));
      newPlayer.addListener('account_error', ({ message }) => console.error('Erro de conta', message));
      newPlayer.addListener('playback_error', ({ message }) => console.error('Erro de reprodução', message));

      newPlayer.connect();
    };
  }, [token]);

  const startPlayback = async (device_id) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: 'PUT',
        body: JSON.stringify({
          uris: ['spotify:track:3AhXZa8sUQht0UEdBJgpGc'] // Exemplo: Billie Jean
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.error('Falha ao iniciar reprodução:', await response.text());
      } else {
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Erro ao iniciar reprodução:', error);
    }
  };

  const togglePlay = () => {
    if (player) {
      player.togglePlay();
      setIsPlaying(prev => !prev);
    }
  };

  return (
    <div className="player-container">
      <div className={`vinyl ${isPlaying ? 'spin' : ''}`}>
        <img 
          src="https://i.imgur.com/QZ4D0JI.png" 
          alt="Vinyl"
          className="vinyl-image"
        />
      </div>
      <div className="controls">
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    </div>
  );
};

export default VinylPlayer;