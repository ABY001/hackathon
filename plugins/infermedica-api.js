export default class InfermedicaApi {
  constructor(
    appId = "ba8fb6fd",
    appKey = "72c66ff75aa2657e346c424e15df3cad",
    // apiModel = "infermedica-en",
    apiUrl = "https://api.infermedica.com/v3/"
  ) {
    this.appId = appId;
    this.appKey = appKey;

    this.apiUrl = apiUrl;
  }

  request(method, url, data) {
    const headers = new Headers();
    headers.append("App-Id", this.appId);
    headers.append("App-Key", this.appKey);
    headers.append("Content-Type", "application/json");

    return fetch(this.apiUrl + url, {
      method,
      headers,
      body: data
    }).then(response => {
      return response.json();
    });
  }

  get(url) {
    return this.request("GET", url);
  }

  post(url, data) {
    return this.request("POST", url, data);
  }

  getSymptoms() {
    return this.get("symptoms");
  }

  getRiskFactors() {
    return this.get("risk_factors");
  }

  parse(text) {
    return this.post("parse", JSON.stringify({ text }));
  }

  getSuggestedSymptoms(data) {
    return this.post("suggest", JSON.stringify(data));
  }

  diagnosis(data) {
    return this.post("diagnosis", JSON.stringify(data));
  }

  explain(data) {
    return this.post("explain", JSON.stringify(data));
  }
};
