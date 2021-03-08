import axios from "axios";

export default {
  // TODO: Update this to use current date and the week before as opposed to hard coded
  getQuestionsByVotes(tag) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://api.stackexchange.com/2.2/search?pagesize=10&fromdate=1614211200&todate=1614816000&order=desc&sort=votes&tagged=${encodeURIComponent(tag)}&site=stackoverflow`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getQuestionsByCreationDate(tag) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://api.stackexchange.com/2.2/search?pagesize=10&fromdate=1614211200&todate=1614816000&order=desc&sort=creation&tagged=${encodeURIComponent(tag)}&site=stackoverflow`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}