class DataController {

  API_URL = "http://localhost:8080";

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

  async changeAddress(data: any) {
    try {
      let header = new Headers({
        "Content-Type" : "application/json",
        'token': Math.random().toString(36).substr(2, 9)
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

  async addFund(data: any) {
    try {
      let header = new Headers({
        "Content-Type" : "application/json",
        'token': Math.random().toString(36).substr(2, 9)
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

  async switchFund(data: any) {
    try {
      let header = new Headers({
        "Content-Type" : "application/json",
        'token': Math.random().toString(36).substr(2, 9)
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

  async redeemFund(data: any) {
    try {
      let header = new Headers({
        "Content-Type" : "application/json",
        'token': Math.random().toString(36).substr(2, 9)
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
}

export const DataService = new DataController();