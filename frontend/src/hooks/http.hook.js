import { useState, useCallback } from "react";
import axios from "axios";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        setLoading(false);

        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const requestWithFiles = useCallback(
    async (url, method = "GET", body = null, files = null, headers = {}) => {
      setLoading(true);
      try {
        const formData = new FormData();
        if (body) {
          body = JSON.stringify(body);
          formData.append("clothesData", body);
        }
        if (files) {
          for (let i = 0; i < files.length; i++) {
            formData.append("pic", files[i]);
            //   console.log(!!formData.entries().next().value);
            //   console.log(formData.get("pic"));
          }
        }
        axios.defaults.headers = headers;
        const response = await axios.post(url, formData);
        const data = response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);
  return { loading, request, error, clearError, requestWithFiles };
};
