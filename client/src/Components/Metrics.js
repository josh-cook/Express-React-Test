import { useEffect, useState } from "react";

const Metrics = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const makeRequest = () => {
      setIsLoading(true);
      fetch("http://localhost:3000/metrics", {
        headers: {
          Authorization: "mysecrettoken",
        },
      })
        .then((res) => res.text())
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

    makeRequest();
    const id = setInterval(makeRequest, 30000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="Metrics">
      <h1>Metrics</h1>
      {isLoading ? (
        <div className="Loading">LOADING</div>
      ) : (
        <div className="Metrics-code">{response}</div>
      )}
    </div>
  );
};

export default Metrics;
