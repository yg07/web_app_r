import { useState, useEffect } from "react";

const useFetch = (url, options) => {

  const [status, setStatus] = useState({
    data: undefined,
    loading: false,
    error: undefined
  });

  function fetchNow(url, options) {
    setStatus({ loading: true });
    fetch(url, options)
    .then((res) => res.json())
    .then((res) => {
      setStatus({ loading: false, data: res.data });
    })
    .catch((error) => {
      setStatus({ loading: false, error });
    });
  }
  
  useEffect(() => {
    if (url) {
      fetchNow(url, options);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...status, fetchNow };
}
    
export default useFetch

