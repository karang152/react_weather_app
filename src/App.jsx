import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TempAndDetails from "./components/TempAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/weatherServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
  const [query, setQuery] = useState({ q: "london" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";
    setLoading(true);
    try {
      toast.info(
        `Fetching weather data for ${capitalizeFirstLetter(cityName)}`
      );
      const data = await getFormattedWeatherData({ ...query, units });
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather(data);
    } catch (error) {
      toast.error("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  };

  const backgroundClass = formatBackground();

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${backgroundClass} transition-all duration-500 ease-in-out`}
    >
      <div
        className={`mx-auto max-w-screen-md sm:max-w-screen-lg mt-4 py-5 px-4 sm:px-8 lg:px-16 bg-gradient-to-br shadow-xl shadow-gray-400 ${backgroundClass} transition-all duration-500 ease-in-out`}
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} setUnits={setUnits} />

        {weather && (
          <div className="space-y-4 animate-fadeIn">
            <TimeAndLocation
              formattedLocalTime={weather.formattedLocalTime}
              name={weather.name}
              country={weather.country}
            />
            <TempAndDetails weather={weather} units={units} />
            <div className="space-y-4">
              <Forecast title="3 hour step forecast" data={weather.hourly} />
              <Forecast title="daily forecast" data={weather.daily} />
            </div>
          </div>
        )}

        <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
      </div>
    </div>
  );
};

export default App;
