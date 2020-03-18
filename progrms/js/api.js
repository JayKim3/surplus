const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: async keyword => {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/cats/search?q=${keyword}`
      );
      return generatePromise(response);
    } catch (e) {}
  },
  fetchRandomCats: async () => {
    const response = await fetch(`${API_ENDPOINT}/api/cats/random50`);
    return generatePromise(response);
  },
  fetchCatInfo: async id => {
    const response = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
    return generatePromise(response);
  }
};

const generatePromise = response => {
  const status = response.status;
  if (status >= 300 && status < 400) {
    const location = response.headers.location;
    if (!location) return;
    throw Promise.reject(makeAPIError(`redirect to ${location}`, status));
  } else if (status >= 400 && status < 500) {
    return Promise.reject(makeAPIError("잘못된 요청입니다.", status));
  } else if (status >= 500 && status < 600) {
    throw Promise.reject(makeAPIError("잠시 후 다시 시도하세요.", status));
  }
  return response.json();
};

const makeAPIError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default api;
