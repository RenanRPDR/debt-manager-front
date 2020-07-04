class DebtsApi {
  host = 'http://localhost:4444'
  
  create = (payload) => {
    const request = fetch(`${this.host}/debts`, {
      method:'POST',
      headers: {'Content-Type': 'application/json'
    },
      body: JSON.stringify(payload)}    
  );
    return request;
  };
  
  listDebts = async () => {
    const request = await fetch(`${this.host}/debts`);
    return await request.json();
  };

  update = (payload) => {
    const request = fetch(`${this.host}/debts/${payload.id}`, {
      method:'POST',
      headers: {'Content-Type': 'application/json'
    },
      body: JSON.stringify(payload)}    
  );
    return request;
  };

  delete = (payload) => {
    const request = fetch(`${this.host}/debts/${payload.id}`, {
      method:'DELETE',
      headers: {'Content-Type': 'application/json'
    },
      body: JSON.stringify(payload)}    
  );
    return request;
  };
};
  
export default DebtsApi;