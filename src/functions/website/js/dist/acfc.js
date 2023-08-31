(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
const div = document.getElementById("container");
div.innerHTML += `<div class="accordion accordion-flush mt-2" id="test">
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingOne">
              <span class="badge badge-vip rounded-pill"
                ><i class="far fa-crown"></i></span
              >&nbsp; /causeyeye &nbsp;
              <span class="command-descreption"
                >- pls work istg</span
              >
          </h2>
          <div
            id="fslowmode"
            class="accordion-collapse collapse"
            data-bs-parent="#slowmode"
          >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
const { cmd } = require("../../../globalCmds");
for (const command of cmd) {
  div.innerHTML += `<div class="accordion accordion-flush mt-2" id="test">
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingOne">
              <span class="badge badge-vip rounded-pill"
                ><i class="far fa-crown"></i></span
              >&nbsp; /${command.name}&nbsp;
              <span class="command-descreption"
                >- ${command.descripton}</span
              >
          </h2>
          <div
            id="fslowmode"
            class="accordion-collapse collapse"
            data-bs-parent="#slowmode"
          >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

},{"../../../globalCmds":3}],3:[function(require,module,exports){
const fs = require("fs");
let array = [];

const commandFolders = fs.readdirSync(`./src/commands`);
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./src/commands/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`../../commands/${folder}/${file}`);
    if ("data" in command && "execute" in command) {
      array.push({
        name: `${command.data.name}`,
        description: `${command.data.description}`,
      });
    } else {
      console.log(`No command data`);
    }
  }
}

module.exports = { array };

},{"fs":1}]},{},[2]);
