const md5 = require("md5");
const fs = require("fs");
const unirest = require("unirest");
const path = require("path");
const filePath = path.join(__dirname, "words.txt");

const getWords = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, function(err, data) {
      if (!err) {
        const words = {};
        data
          .toLowerCase()
          .split(/[ \n]+/)
          .forEach(word => {
            words[word] = true;
          });
        resolve(Object.keys(words));
      } else {
        reject(err);
      }
    });
  });
};

const getDefinitions = words => {
  return words.map(word => {
    return new Promise(resolve => {
      unirest
        .get(`https://wordsapiv1.p.mashape.com/words/${word}/definitions`)
        .header(
          "X-Mashape-Key",
          "8TqRzHIAAfmshvg51bz1jbf3pTSCp1aw3Nrjsnwtj25EE1Iclr"
        )
        .header("X-Mashape-Host", "wordsapiv1.p.mashape.com")
        .end(function(res) {
          resolve(res);
        });
    });
  });
};

const getDictionary = async () => {
  try {
    const words = await getWords(filePath);
    const items = await Promise.all(getDefinitions(words));
    const dictionary = [];
    items.forEach(item => {
      if (!item.error) {
        const { word, definitions } = item.body;
        if (definitions.length > 0) {
          dictionary.push({
            id: md5(word),
            word,
            definition: definitions[0].definition
          });
        }
      }
    });
    return dictionary;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getDictionary,
  getWords,
  getDefinitions
};
