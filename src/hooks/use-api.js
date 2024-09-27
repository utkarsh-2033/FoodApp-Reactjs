import React, { useCallback, useState } from "react";

const useApi = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (request, transformData) => {
    try{
        setLoading(true);
        setError(null);
    const response = await fetch(request.url, {
      method: request.method ? request.method : "GET",
      headers: request.headers ? request.headers : {},
      body: request.body ? request.body : null,
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    // console.log(data);
    transformData(data);
    setLoading(false);
    }
    catch(err){
        setError(err.message);
    }
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useApi;
