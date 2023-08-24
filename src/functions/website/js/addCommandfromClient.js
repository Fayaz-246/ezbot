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
import { cmd } from "../../../globalCmds.js";
console.log(cmd);
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
