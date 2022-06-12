import { useEffect, useState } from "react";

const Time = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const makeRequest = () => {
      setIsLoading(true);
      fetch("http://localhost:3000/time", {
        headers: {
          Authorization: "mysecrettoken",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoading(false);
            setResponse(result);
          },

          (error) => {
            setIsLoading(false);
            setError(error);
          }
        );
    };

    // Make initial request then every 30 seconds continually make another request.
    makeRequest();
    const id = setInterval(makeRequest, 30000);
    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      let timeDifference = Date.now() / 1000 - response.epoch;

      let seconds = Math.floor(timeDifference % 60);
      let minutes = Math.floor(timeDifference / 60) % 60;
      let hours = Math.floor(timeDifference / 3600);
      setFormattedTime(`${hours} : ${minutes} : ${seconds}`);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [response]);

  return (
    <div className="Time">
      <h1>Time</h1>
      {isLoading ? (
        <div className="Loading">LOADING</div>
      ) : (
        <div className="Timer">{formattedTime}</div>
      )}
    </div>
  );
};

export default Time;
