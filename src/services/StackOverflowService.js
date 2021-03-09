import axios from "axios";

export default {
  getQuestionsByVotes(tag) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://api.stackexchange.com/2.2/search?pagesize=10&fromdate=${Math.round(Date.now() / 1000) - 604800}&todate=${Math.round(Date.now() / 1000)}&order=desc&sort=votes&tagged=${encodeURIComponent(tag)}&site=stackoverflow&filter=!)c5QMjAfN_hsS6_ATZqTJosPmF20HM-hQYW-mgXaI.tB1`)
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
        .get(`https://api.stackexchange.com/2.2/search?pagesize=10&fromdate=${Math.round(Date.now() / 1000) - 604800}&todate=${Math.round(Date.now() / 1000)}&order=desc&sort=creation&tagged=${encodeURIComponent(tag)}&site=stackoverflow&filter=!)c5QMjAfN_hsS6_ATZqTJosPmF20HM-hQYW-mgXaI.tB1`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}