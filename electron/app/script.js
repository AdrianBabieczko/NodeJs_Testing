const os = require('os');

const osPlatform = document.querySelector("#osPlatform");
const osArchitecture = document.querySelector("#osArchitecture");

osPlatform.innerHTML = `Platform: <strong>${os.platform()}</strong>`;
osArchitecture.innerHTML = `Architecture: <strong>${os.arch()}</strong>`;