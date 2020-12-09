const api = {
  fetchSearchID: async () => {
    try {
      const response = await fetch('https://front-test.beta.aviasales.ru/search');
      return response.json();
    } catch {
      throw new Error('Failed to fetch searchId');
    }
  },
  fetchTickets: async () => {
    try {
      const { searchId } = await api.fetchSearchID();
      const url = ['https://front-test.beta.aviasales.ru/tickets?searchId=', searchId];
      const response = await fetch(url.join(''));
      return response.json();
    } catch {
      throw new Error('Failed to fetch tickets');
    }
  },
};

export default api;
