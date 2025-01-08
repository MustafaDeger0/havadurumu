import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [backgroundGif, setBackgroundGif] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Lütfen bir şehir adı giriniz.');
      return;
    }

    const apiKey = 'bb99950f84e30765f1d57cde1a8bc32b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      setError('');
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      setBackgroundGif(getBackgroundGif(response.data.weather[0].main));
    } catch (err) {
      setError('Şehir bulunamadı veya bir hata oluştu. Lütfen tekrar deneyin.');
      setWeatherData(null);
      setBackgroundGif('');
    }
  };

  const getBackgroundGif = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
      case 'rain':
        return 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjd6Z290amdzdmx3N2Fydzh2eDlqOTMwZWo3bWI2NDR6cml3aG80biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Xaql0UKB5Dvh5el7rs/giphy.gif  '; // Hafif Yağmur
      case 'clear':
        return 'https://media.giphy.com/media/3og0ICH4dOeWmrQMqA/giphy.gif?cid=790b7611uu2y1rwamro1kv7dg8db7sytm7qf1068eian9zxv&ep=v1_gifs_search&rid=giphy.gif&ct=g'; // Güneşli
      case 'clouds':
        return 'https://media.giphy.com/media/HoUgegTjteXCw/giphy.gif?cid=790b7611ryjruiint9prh8kpftv35szxqsujwy6gv6vnh9t9&ep=v1_gifs_search&rid=giphy.gif&ct=g'; // Bulutlu
      case 'snow':
        return 'https://media.giphy.com/media/d8o9Xi8508wiQemzUv/giphy.gif?cid=790b7611qyp8v76hgztxn6vwprhdb3wkjrq8h29jxa4tn7xt&ep=v1_gifs_search&rid=giphy.gif&ct=g'; // Kar Yağışı
      case 'mist':
      case 'fog':
        return 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2RuOG4wNmEzMWN0cnNpY202NnViM3VkbW14cG9xN29ud2pmNmdiaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7rRRiaDJdsfquQyUu8/giphy.gif'; // Sis
      case 'thunderstorm':
        return 'https://media.giphy.com/media/aPlzgxciAwVj2/giphy.gif?cid=790b7611z9j72fwi6spiwmddgo02o0tlzt9vb2iajb4jxxc2&ep=v1_gifs_search&rid=giphy.gif&ct=g'; // Fırtına
      default:
        return '';
    }
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${backgroundGif})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <div className="container py-4">
        <h1 className="text-center text-white">Hava Durumu</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Şehir Adı"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={fetchWeather}>
          Hava Durumunu Göster
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {weatherData && (
          <div className="weather-info mt-4 text-center text-white">
            <h2>
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="weather-icon"
            />
            <p className="description">{weatherData.weather[0].description}</p>
            <p>Sıcaklık: {Math.floor(weatherData.main.temp)} °C</p>
            <p>Nem: {weatherData.main.humidity} %</p>
            <p>Rüzgar Hızı: {weatherData.wind.speed} m/s</p>
          </div>
        )}

        <button
          className="btn btn-secondary mt-3 w-100"
          onClick={() => alert('Mustafa Değer - 2220780009.')}
        >
          Hakkında
        </button>
      </div>
    </div>
  );
};

export default App;