const Forecast = ({ title, data }) => {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white animate-slideIn">
        {data.map((item) => (
          <div key={item.title} className="flex flex-col items-center justify-center space-y-2">
            <p className="text-sm">{item.title}</p>
            <img src={item.icon} alt="weather icon" className="w-12 my-1" />
            <p className="text-sm">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
