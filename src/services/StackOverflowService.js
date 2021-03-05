import axios from "axios";

export default {
  getQuestions(tag) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://api.stackexchange.com/2.2/search?fromdate=1614211200&todate=1614816000&order=desc&sort=activity&tagged=${tag}&site=stackoverflow`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}