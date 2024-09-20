import fs from "node:fs";
import inquirer from "inquirer";
import qr from "qr-image";


inquirer
  .prompt([
    {
      message: "Insert URL here",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr-image.png"));

    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("Stored users Url successfully");
    });
    setTimeout(function () {
      fs.readFile("URL.txt", "utf8", (err, data) => {
        if (err) throw err;
        console.log("here is the QrCode", data);
      });
    }, 3000);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
