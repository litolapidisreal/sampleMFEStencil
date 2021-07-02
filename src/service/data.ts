class DataController {

  API_URL = "http://localhost:8083";
  OAUTH_URL = "http://localhost:9091"

  async getData(jwt: string) {

    // headers JWT
    let headers = new Headers({
      "Content-Type" : "application/json",
      "Access-Control-Request-Headers": "*",
      "Access-Control-request-Method": "*",
      "Authorization": "Bearer " + jwt
    })

    try {
      const response = await fetch(`${this.API_URL}/users`, {
        method: 'GET',
        headers: headers
      });

      const json = await response.json();

      return json;
    } catch (err) {
      console.log("ERROR: ", err);
    }


  }

  async changeAddress(data: any, token: any) {
    try {
      let header = new Headers({
        "Content-Type" : "application/json",
        'Authorization': 'Bearer ' + token
      });

      const response = await fetch(`${this.API_URL}/changeAddress`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: header
      });

      return await response.json();

    } catch (err) {
      console.log("Error", err);
    }
  }

  async addFund(data: any, token: any) {
    try {
      let header = new Headers({
        "Content-Type" : "application/json",
        'Authorization': 'Bearer ' + token
      });

      const response = await fetch(`${this.API_URL}/addFund`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: header
      })

      return await response.json();
    } catch (err) {
      console.log("ERROR", err);
    }
  }

  async switchFund(data: any, token: any) {
    try {
      let header = new Headers({
        "Content-Type" : "application/json",
        'Authorization': 'Bearer ' + token
      });

      const response = await fetch(`${this.API_URL}/switchFund`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: header
      })

      return await response.json();
    } catch (err) {
      console.log("ERROR", err);
    }
  }

  async redeemFund(data: any, token: any) {
    try {
      let header = new Headers({
        "Content-Type" : "application/json",
        'Authorization': 'Bearer ' + token
      });

      const response = await fetch(`${this.API_URL}/redeemFund`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: header
      })

      return await response.json();
    } catch (err) {
      console.log("ERROR", err);
    }
  }

  async requestToken() {
    try {
      const body = new URLSearchParams({
        'grant_type': 'password',
        'username': 'admin',
        'password': 'password'
      });

      const header = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('client_id:client_secret')

      });

      const response = await fetch(`${this.OAUTH_URL}/oauth/token`, {
        method: 'POST',
        body: body,
        headers: header
      });

      return await response.json();
    } catch (err) {
      console.log("ERROR", err);
    }
  }
}

export const DataService = new DataController();
