// =========================================================
// TRANQUILINO OS v2.0
// Charlie Tranquilino Edition
// Main Interface Controller
// =========================================================


// =========================================================
// DOM ELEMENTS
// =========================================================

const startupScreen = document.getElementById("startup-screen");
const initializationScreen = document.getElementById("initialization-screen");
const mainOS = document.getElementById("main-os");

const initializeBtn = document.getElementById("initialize-btn");

const telemetryCPU = document.getElementById("telemetry-cpu");
const telemetryMemory = document.getElementById("telemetry-memory");

const initRows = document.querySelectorAll(".init-row");

const moduleCards = document.querySelectorAll(".module-card");

const moduleWorkspace = document.getElementById("module-workspace");
const workspaceLabel = document.getElementById("workspace-label");
const workspaceTitle = document.getElementById("workspace-title");
const workspaceContent = document.getElementById("workspace-content");

const closeWorkspace = document.getElementById("close-workspace");


// =========================================================
// HELPERS
// =========================================================

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// =========================================================
// LIVE STARTUP TELEMETRY
// =========================================================

function updateTelemetry() {

  if (telemetryCPU) {
    const cpu = Math.floor(Math.random() * 18) + 10;

    telemetryCPU.textContent = `${cpu}%`;
  }

  if (telemetryMemory) {
    const memory = Math.floor(Math.random() * 15) + 34;

    telemetryMemory.textContent = `${memory}%`;
  }
}


// initial telemetry values
updateTelemetry();


// update telemetry every few seconds
setInterval(() => {

  if (
    startupScreen &&
    !startupScreen.classList.contains("hidden")
  ) {
    updateTelemetry();
  }

}, 2600);


// =========================================================
// INITIALIZATION SEQUENCE
// =========================================================

async function runInitialization() {

  // stop repeat clicks
  initializeBtn.disabled = true;

  const buttonText =
    initializeBtn.querySelector(".button-text");

  const buttonArrow =
    initializeBtn.querySelector(".button-arrow");


  if (buttonText) {
    buttonText.textContent = "INITIALIZING";
  }

  if (buttonArrow) {
    buttonArrow.textContent = "•••";
  }


  // allow button state to be visible
  await wait(650);


  // fade startup screen
  startupScreen.classList.add("startup-exit");

  await wait(650);


  // completely remove startup
  startupScreen.classList.add("hidden");


  // show initialization environment
  initializationScreen.classList.remove("hidden");


  await wait(350);


  // activate each subsystem one at a time
  for (let i = 0; i < initRows.length; i++) {

    const row = initRows[i];

    row.classList.add("init-active");

    await wait(320);

    row.classList.add("init-complete");

    await wait(120);
  }


  await wait(500);


  // show final ready state
  initializationScreen.classList.add(
    "initialization-complete"
  );


  await wait(700);


  // hide initialization
  initializationScreen.classList.add("hidden");


  // reveal OS
  mainOS.classList.remove("hidden");

  mainOS.classList.add("os-enter");


  showNotification(
    "SYSTEM ONLINE",
    "TranquilinoOS environment initialized"
  );
}


// =========================================================
// INITIALIZE BUTTON
// =========================================================

if (initializeBtn) {

  initializeBtn.addEventListener("click", () => {

    runInitialization();

  });

}


// =========================================================
// MODULE DATA
// =========================================================

const modules = {

  endpoints: {

    label: "CORE MODULE 01",

    title: "Endpoint Systems",

    notification: "ENDPOINT MODULE MOUNTED",

    content: `
      <div class="workspace-grid">

        <div class="workspace-block">
          <span class="workspace-tag">
            DEVICE MANAGEMENT
          </span>

          <h3>
            Microsoft Intune
          </h3>

          <p>
            Endpoint configuration, compliance,
            application deployment, device management,
            and operational standardization.
          </p>
        </div>


        <div class="workspace-block">
          <span class="workspace-tag">
            DEPLOYMENT
          </span>

          <h3>
            Windows Autopilot
          </h3>

          <p>
            Cloud-driven provisioning, device enrollment,
            deployment profiles, pre-provisioning,
            application delivery, and standardized builds.
          </p>
        </div>


        <div class="workspace-block">
          <span class="workspace-tag">
            SECURITY
          </span>

          <h3>
            Compliance
          </h3>

          <p>
            Device health, configuration standards,
            BitLocker, security posture, remediation,
            and endpoint readiness.
          </p>
        </div>


        <div class="workspace-block">
          <span class="workspace-tag">
            OPERATIONS
          </span>

          <h3>
            Lifecycle Management
          </h3>

          <p>
            Provisioning, reprovisioning, deployment,
            troubleshooting, recovery, inventory,
            and endpoint lifecycle support.
          </p>
        </div>

      </div>
    `
  },


  identity: {

    label: "CORE MODULE 02",

    title: "Identity + Access",

    notification: "IDENTITY LAYER MOUNTED",

    content: `
      <div class="workspace-grid">

        <div class="workspace-block">
          <span class="workspace-tag">
            IDENTITY
          </span>

          <h3>
            Microsoft Entra ID
          </h3>

          <p>
            User identity, account administration,
            device identities, groups, authentication,
            and cloud access management.
          </p>
        </div>


        <div class="workspace-block">
          <span class="workspace-tag">
            ACCESS
          </span>

          <h3>
            Access Administration
          </h3>

          <p>
            User provisioning, group membership,
            permissions, licensing, account lifecycle,
            and authentication support.
          </p>
        </div>


        <div class="workspace-block">
          <span class="workspace-tag">
            SECURITY
          </span>

          <h3>
            Conditional Access
          </h3>

          <p>
            Identity-driven access controls designed
            to strengthen authentication and secure
            access to organizational resources.
          </p>
        </div>


        <div class="workspace-block">
          <span class="workspace-tag">
            AUTHENTICATION
          </span>

          <h3>
            MFA
          </h3>

          <p>
            Multi-factor authentication support,
            authentication troubleshooting,
            and secure account recovery workflows.
          </p>
        </div>

      </div>
    `
  },


  infrastructure: {

    label: "CORE MODULE 03",

    title: "Infrastructure",

    notification: "INFRASTRUCTURE CONNECTED",

    content: `
      <div class="workspace-grid">

        <div class="workspace-block">
          <span class="workspace-tag">
            NETWORK
          </span>

          <h3>
            Multi-Site Networking
          </h3>

          <p>
            Supporting connectivity, network appliances,
            switches, site communication, troubleshooting,
            and infrastructure availability.
          </p>
        </div>


        <div class="workspace-block">
          <span class="workspace-tag">
            COMPUTE
          </span>

          <h3>
            Server Infrastructure
          </h3>

          <p>
            Supporting physical server environments,
            system availability, recovery planning,
            standardization, and infrastructure operations.
          </p>
        </div>


        <div class="workspace-block">
          <span class="workspace-tag">
            BUSINESS SYSTEMS
          </span>

          <h3>
            POS + Kiosk Systems
          </h3>

          <p>
            Configuration and troubleshooting of
            business-critical POS systems, kiosks,
            tablets, and specialized endpoints.
          </p>
        </div>


        <div class="workspace-block">
          <span class="workspace-tag">
            OPERATIONS
          </span>

          <h3>
            Site Technology
          </h3>

          <p>
            Supporting cameras, phones, connectivity,
            network appliances, peripherals,
            and operational technology.
          </p>
        </div>

      </div>
    `
  },


  automation: {

    label: "CORE MODULE 04",

    title: "Automation",

    notification: "AUTOMATION ENGINE READY",

    content: `
      <div class="workspace-grid">

        <div class="workspace-block">
          <span class="workspace-tag">
            SCRIPTING
          </span>

          <h3>
            PowerShell
          </h3>

          <p>
            Building scripts and utilities that reduce
            repetitive administration and improve
            endpoint provisioning workflows.
          </p>
        </div>


        <div class="workspace-block">
          <span class="workspace-tag">
            PROVISIONING
          </span>

          <h3>
            Deployment Automation
          </h3>

          <p>
            Automating device registration,
            configuration, updates, application delivery,
            and provisioning operations.
          </p>
        </div>


        <div class="workspace-block">
          <span class="workspace-tag">
            STANDARDIZATION
          </span>

          <h3>
            Repeatable Workflows
          </h3>

          <p>
            Turning manual technical procedures into
            documented, predictable, repeatable systems.
          </p>
        </div>


        <div class="workspace-block">
          <span class="workspace-tag">
            OPERATIONS
          </span>

          <h3>
            Administrative Efficiency
          </h3>

          <p>
            Identifying repetitive work and creating
            better technical workflows to improve
            consistency and reduce manual effort.
          </p>
        </div>

      </div>
    `
  },


  experience: {

    label: "EXPERIENCE INDEX",

    title: "Career Timeline",

    notification: "EXPERIENCE INDEX MOUNTED",

    content: `
      <div class="timeline">

        <div class="timeline-item">
          <span class="timeline-year">
            2026
          </span>

          <div class="timeline-content">
            <h3>
              IT Systems Administrator
            </h3>

            <p>
              Endpoint management, identity,
              infrastructure, automation,
              cloud administration, and
              multi-site IT operations.
            </p>
          </div>
        </div>


        <div class="timeline-item">
          <span class="timeline-year">
            2025
          </span>

          <div class="timeline-content">
            <h3>
              Desktop Engineer / Help Desk Analyst
            </h3>

            <p>
              Enterprise endpoint deployment,
              Intune, Autopilot, Entra ID,
              Active Directory, networking,
              collaboration technology,
              and lifecycle support.
            </p>
          </div>
        </div>


        <div class="timeline-item">
          <span class="timeline-year">
            2025
          </span>

          <div class="timeline-content">
            <h3>
              Technical Operations Lead
            </h3>

            <p>
              Technical operations, AI integration,
              documentation, Jira workflows,
              process coordination,
              and knowledge management.
            </p>
          </div>
        </div>


        <div class="timeline-item">
          <span class="timeline-year">
            2024
          </span>

          <div class="timeline-content">
            <h3>
              IT Lifecycle Refresh
            </h3>

            <p>
              Enterprise healthcare device deployment,
              imaging, ServiceNow,
              inventory management,
              asset lifecycle operations,
              and endpoint refresh.
            </p>
          </div>
        </div>

      </div>
    `
  },


  creative: {

    label: "ARCHIVE MODULE",

    title: "Creative Archive",

    notification: "CREATIVE ARCHIVE MOUNTED",

    content: `
      <div class="creative-placeholder">

        <span class="workspace-tag">
          ARCHIVE STATUS
        </span>

        <h3>
          Creative Projects Incoming
        </h3>

        <p>
          Graphic design, visual experiments,
          personal artwork, and future creative
          projects will live inside this archive.
        </p>

        <div class="archive-status">
          COLLECTION INITIALIZED
        </div>

      </div>
    `
  }

};


// =========================================================
// MODULE OPENING
// =========================================================

function openModule(moduleName, card) {

  const module = modules[moduleName];

  if (!module) return;


  // remove active state from all cards
  moduleCards.forEach(item => {
    item.classList.remove("module-active");
  });


  // activate clicked card
  if (card) {
    card.classList.add("module-active");
  }


  workspaceLabel.textContent = module.label;

  workspaceTitle.textContent = module.title;

  workspaceContent.innerHTML = module.content;


  moduleWorkspace.classList.remove("hidden");

  moduleWorkspace.classList.remove("workspace-enter");


  // restart animation
  void moduleWorkspace.offsetWidth;


  moduleWorkspace.classList.add("workspace-enter");


  showNotification(
    module.notification,
    module.title
  );


  // bring workspace into view
  setTimeout(() => {

    moduleWorkspace.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }, 100);
}


// =========================================================
// MODULE BUTTON EVENTS
// =========================================================

moduleCards.forEach(card => {

  card.addEventListener("click", () => {

    const moduleName =
      card.getAttribute("data-module");

    openModule(moduleName, card);

  });

});


// =========================================================
// CLOSE MODULE WORKSPACE
// =========================================================

if (closeWorkspace) {

  closeWorkspace.addEventListener("click", () => {

    moduleWorkspace.classList.add("hidden");

    moduleCards.forEach(card => {
      card.classList.remove("module-active");
    });


    showNotification(
      "MODULE UNMOUNTED",
      "Workspace closed"
    );

  });

}


// =========================================================
// NOTIFICATION SYSTEM
// =========================================================

function showNotification(title, message) {

  const existing =
    document.querySelector(".system-notification");

  if (existing) {
    existing.remove();
  }


  const notification =
    document.createElement("div");


  notification.className =
    "system-notification";


  notification.innerHTML = `
    <div class="notification-dot"></div>

    <div>
      <strong>${title}</strong>
      <span>${message}</span>
    </div>
  `;


  document.body.appendChild(notification);


  requestAnimationFrame(() => {

    notification.classList.add(
      "notification-visible"
    );

  });


  setTimeout(() => {

    notification.classList.remove(
      "notification-visible"
    );


    setTimeout(() => {

      notification.remove();

    }, 350);

  }, 2200);
}


// =========================================================
// CARD CURSOR LIGHTING
// =========================================================

moduleCards.forEach(card => {

  card.addEventListener("mousemove", event => {

    const rect =
      card.getBoundingClientRect();


    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;


    card.style.setProperty(
      "--mouse-x",
      `${x}px`
    );


    card.style.setProperty(
      "--mouse-y",
      `${y}px`
    );

  });

});


// =========================================================
// KEYBOARD COMMAND SHORTCUT
// =========================================================

// Future command palette hook.
// Ctrl + K / Cmd + K will eventually open search.

document.addEventListener("keydown", event => {

  const commandKey =
    event.ctrlKey || event.metaKey;


  if (
    commandKey &&
    event.key.toLowerCase() === "k"
  ) {

    event.preventDefault();


    showNotification(
      "COMMAND INTERFACE",
      "Command palette module reserved for next build"
    );

  }

});


// =========================================================
// SYSTEM READY
// =========================================================

console.log(
  "%c TRANQUILINO OS v2.0 ",
  "background:#050505;color:#d7a83d;font-size:16px;padding:8px;"
);

console.log(
  "System controller loaded successfully."
);