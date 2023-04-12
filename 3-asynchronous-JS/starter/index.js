const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file");
      resolve("success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1 = superagent.get(`https://dog.ceo/api/breeds/image/random`);
    const res2 = superagent.get(`https://dog.ceo/api/breeds/image/random`);
    const res3 = superagent.get(`https://dog.ceo/api/breeds/image/random`);

    const all = await Promise.all([res1, res2, res3]);
    const imgs = all.map((elem) => elem.body.message);
    console.log(imgs);

    await writeFilePro("dog-img.txt", imgs.join("\n"));
    console.log("Random do image save to file!");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: READY";
};

(async () => {
  try {
    console.log("1: Will get dog pics!");
    const x = await getDogPic();
    console.log("3: Done getting dog pics!");
  } catch (err) {
    console.log("Error");
  }
})();

// console.log("1: Will get dog pics");
// getDogPic().then((x) => {
//   console.log(x);
//   console.log("3: Done getting dog pics");
// });

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breeds/image/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     return writeFilePro("dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("Random dog image saved to file!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
