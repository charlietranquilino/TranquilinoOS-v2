// =========================================================
// TRANQUILINO OS v2.0
// Charlie Tranquilino Edition
// Main System Controller
// =========================================================


// =========================================================
// DOM REFERENCES
// =========================================================

const startupScreen =
  document.getElementById("startup-screen");

const initializationScreen =
  document.getElementById("initialization-screen");

const mainOS =
  document.getElementById("main-os");

const initializeBtn =
  document.getElementById("initialize-btn");

const telemetryCPU =
  document.getElementById("telemetry-cpu");

const telemetryMemory =
  document.getElementById("telemetry-memory");

const initRows =
  document.querySelectorAll(".init-row");


// CORE MODULES

const moduleCards =
  document.querySelectorAll(".module-card");

const moduleWorkspace =
  document.getElementById("module-workspace");

const workspaceLabel =
  document.getElementById("workspace-label");

const workspaceTitle =
  document.getElementById("workspace-title");

const workspaceContent =
  document.getElementById("workspace-content");

const closeWorkspace =
  document.getElementById("close-workspace");


// SYSTEM BUILDS

const buildCards =
  document.querySelectorAll(".build-card");

const buildWorkspace =
  document.getElementById("build-workspace");

const buildWorkspaceLabel =
  document.getElementById("build-workspace-label");

const buildWorkspaceTitle =
  document.getElementById("build-workspace-title");

const buildWorkspaceContent =
  document.getElementById("build-workspace-content");

const closeBuild =
  document.getElementById("close-build");


// =========================================================
// IMPORTANT FIX:
// MOVE POPUP WINDOWS OUTSIDE MAIN OS
// =========================================================

// position: fixed breaks when an ancestor has transform.
// main-os uses an entrance transform animation.
//
// Moving these directly under <body> means their fixed
// positioning is ALWAYS relative to the browser viewport.

if (moduleWorkspace) {
  document.body.appendChild(moduleWorkspace);
}

if (buildWorkspace) {
  document.body.appendChild(buildWorkspace);
}


// =========================================================
// HELPERS
// =========================================================

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function randomNumber(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}


// =========================================================
// MODAL STATE
// =========================================================

let modalOpen = false;


// =========================================================
// PAGE LOCK
// =========================================================

// We don't reposition the body anymore.
// We simply prevent scrolling while a system window is open.

function lockPageScroll() {

  document.documentElement.style.overflow =
    "hidden";

  document.body.style.overflow =
    "hidden";

  modalOpen = true;
}


function unlockPageScroll() {

  document.documentElement.style.overflow =
    "";

  document.body.style.overflow =
    "";

  modalOpen = false;
}


// =========================================================
// CLOSE ALL WINDOWS
// =========================================================

function closeAllWorkspaces() {

  if (moduleWorkspace) {

    moduleWorkspace.classList.add(
      "hidden"
    );

    moduleWorkspace.classList.remove(
      "workspace-enter"
    );

  }


  if (buildWorkspace) {

    buildWorkspace.classList.add(
      "hidden"
    );

    buildWorkspace.classList.remove(
      "workspace-enter"
    );

  }


  moduleCards.forEach(card => {

    card.classList.remove(
      "module-active"
    );

  });


  buildCards.forEach(card => {

    card.classList.remove(
      "build-active"
    );

  });


  unlockPageScroll();
}


// =========================================================
// TYPE EFFECT
// =========================================================

async function typeStatus(
  element,
  text,
  minDelay,
  maxDelay
) {

  if (!element) return;


  element.textContent = "";

  let index = 0;


  while (index < text.length) {

    const chunkSize =
      Math.random() < 0.4
        ? 2
        : 1;


    element.textContent +=
      text.slice(
        index,
        index + chunkSize
      );


    index += chunkSize;


    await wait(
      randomNumber(
        minDelay,
        maxDelay
      )
    );

  }

}


// =========================================================
// FASTER INITIALIZATION STATUS CYCLE
// =========================================================

async function runStatusCycle(
  status
) {

  if (!status) {
    return;
  }


  status.classList.remove(
    "status-online"
  );


  status.classList.add(
    "status-typing"
  );


  // QUICK STANDBY

  await typeStatus(
    status,
    "STANDBY",
    10,
    20
  );


  await wait(
    90
  );


  status.textContent =
    "";


  await wait(
    40
  );


  // INITIALIZING — still slower than standby

  await typeStatus(
    status,
    "INITIALIZING",
    30,
    48
  );


  await wait(
    120
  );


  // SNAP ONLINE

  status.classList.remove(
    "status-typing"
  );


  status.classList.add(
    "status-online"
  );


  status.textContent =
    "ONLINE";

}


// =========================================================
// LIVE TELEMETRY
// =========================================================

function updateTelemetry() {

  if (telemetryCPU) {

    telemetryCPU.textContent =
      `${randomNumber(10, 28)}%`;

  }


  if (telemetryMemory) {

    telemetryMemory.textContent =
      `${randomNumber(34, 49)}%`;

  }

}


updateTelemetry();


setInterval(() => {

  if (
    startupScreen &&
    !startupScreen.classList.contains(
      "hidden"
    )
  ) {

    updateTelemetry();

  }

}, 2400);


// =========================================================
// INITIALIZATION SEQUENCE
// =========================================================

async function runInitialization() {

  if (!initializeBtn) return;


  initializeBtn.disabled = true;


  const buttonText =
    initializeBtn.querySelector(
      ".button-text"
    );

  const buttonArrow =
    initializeBtn.querySelector(
      ".button-arrow"
    );


  if (buttonText) {

    buttonText.textContent =
      "INITIALIZING";

  }


  if (buttonArrow) {

    buttonArrow.textContent =
      "•••";

  }


  await wait(300);


  if (startupScreen) {

    startupScreen.classList.add(
      "startup-exit"
    );

  }


  await wait(350);


  if (startupScreen) {

    startupScreen.classList.add(
      "hidden"
    );

  }


  if (initializationScreen) {

    initializationScreen.classList.remove(
      "hidden"
    );

  }


  await wait(250);


  // Reset every status first

  initRows.forEach(row => {

    row.classList.remove(
      "init-active",
      "init-complete"
    );


    const status =
      row.querySelector("strong");


    if (status) {

      status.classList.remove(
        "status-online",
        "status-typing"
      );

      status.textContent = "";

    }

  });


  // Bring services online

  for (const row of initRows) {

    const status =
      row.querySelector("strong");


    row.classList.add(
      "init-active"
    );


    await runStatusCycle(
      status
    );


    row.classList.remove(
      "init-active"
    );


    row.classList.add(
      "init-complete"
    );


    await wait(90);

  }


  // Hold all ONLINE statuses
  await wait(350);


  if (initializationScreen) {

    initializationScreen.classList.add(
      "initialization-complete"
    );

  }


  await wait(400);


  if (initializationScreen) {

    initializationScreen.classList.add(
      "initialization-exit"
    );

  }


  await wait(300);


  if (initializationScreen) {

    initializationScreen.classList.add(
      "hidden"
    );

  }


  if (mainOS) {

    mainOS.classList.remove(
      "hidden"
    );

    mainOS.classList.add(
      "os-enter"
    );

  }


  showNotification(
    "SYSTEM ONLINE",
    "TranquilinoOS environment initialized"
  );

}


if (initializeBtn) {

  initializeBtn.addEventListener(
    "click",
    runInitialization
  );

}


// =========================================================
// CORE MODULE DATA
// =========================================================

const modules = {

  endpoints: {

    label:
      "CORE MODULE // 01",

    title:
      "Endpoint Systems",

    notification:
      "ENDPOINT MODULE MOUNTED",

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
            Centralized endpoint configuration,
            policy delivery, compliance,
            application deployment,
            and Windows device administration.
          </p>

        </div>


        <div class="workspace-block">

          <span class="workspace-tag">
            PROVISIONING
          </span>

          <h3>
            Windows Autopilot
          </h3>

          <p>
            Cloud-driven enrollment,
            deployment profiles,
            pre-provisioning,
            standardized Windows builds,
            and endpoint readiness.
          </p>

        </div>


        <div class="workspace-block">

          <span class="workspace-tag">
            SECURITY
          </span>

          <h3>
            Compliance + Configuration
          </h3>

          <p>
            Device health requirements,
            configuration standards,
            security policy enforcement,
            and endpoint remediation.
          </p>

        </div>


        <div class="workspace-block">

          <span class="workspace-tag">
            LIFECYCLE
          </span>

          <h3>
            Endpoint Operations
          </h3>

          <p>
            Provisioning,
            reprovisioning,
            deployment,
            troubleshooting,
            recovery,
            inventory,
            and lifecycle management.
          </p>

        </div>

      </div>
    `
  },


  identity: {

    label:
      "CORE MODULE // 02",

    title:
      "Identity + Access",

    notification:
      "IDENTITY LAYER MOUNTED",

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
            User identity,
            device identity,
            groups,
            cloud authentication,
            and access administration.
          </p>

        </div>


        <div class="workspace-block">

          <span class="workspace-tag">
            ACCESS CONTROL
          </span>

          <h3>
            Conditional Access
          </h3>

          <p>
            Identity-based controls designed
            to strengthen access to managed
            applications and cloud resources.
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
            Multi-factor authentication,
            secure account recovery,
            registration support,
            and authentication troubleshooting.
          </p>

        </div>


        <div class="workspace-block">

          <span class="workspace-tag">
            ADMINISTRATION
          </span>

          <h3>
            Identity Lifecycle
          </h3>

          <p>
            User provisioning,
            access changes,
            group membership,
            licensing,
            account management,
            and offboarding workflows.
          </p>

        </div>

      </div>
    `
  },


  infrastructure: {

    label:
      "CORE MODULE // 03",

    title:
      "Infrastructure",

    notification:
      "INFRASTRUCTURE CONNECTED",

    content: `
      <div class="workspace-grid">

        <div class="workspace-block">

          <span class="workspace-tag">
            NETWORKING
          </span>

          <h3>
            Multi-Site Connectivity
          </h3>

          <p>
            Supporting distributed connectivity,
            network appliances,
            site communication,
            troubleshooting,
            and operational uptime.
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
            Physical server support,
            system management,
            resiliency planning,
            backup strategy,
            and infrastructure standards.
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
            Supporting business-critical
            POS platforms,
            kiosks,
            tablets,
            and specialized endpoint environments.
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
            Cameras,
            voice systems,
            peripherals,
            remote support tools,
            network devices,
            and operational technology.
          </p>

        </div>

      </div>
    `
  },


  automation: {

    label:
      "CORE MODULE // 04",

    title:
      "Automation",

    notification:
      "AUTOMATION ENGINE READY",

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
            Administrative automation
            supporting endpoint discovery,
            validation,
            provisioning,
            updates,
            and repeatable operations.
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
            Reducing repetitive setup steps
            and creating predictable
            endpoint deployment workflows.
          </p>

        </div>


        <div class="workspace-block">

          <span class="workspace-tag">
            VALIDATION
          </span>

          <h3>
            Health + Discovery
          </h3>

          <p>
            Read-only assessment,
            configuration discovery,
            health validation,
            and troubleshooting support.
          </p>

        </div>


        <div class="workspace-block">

          <span class="workspace-tag">
            STANDARDIZATION
          </span>

          <h3>
            Repeatable Operations
          </h3>

          <p>
            Converting manual technical processes
            into documented,
            consistent,
            and reusable workflows.
          </p>

        </div>

      </div>
    `
  }

};


// =========================================================
// SYSTEM BUILD DATA
// =========================================================

const systemBuilds = {

  autopilot: {

    label:
      "SYSTEM BUILD // 01",

    title:
      "Windows Autopilot Provisioning System",

    notification:
      "BUILD 01 MOUNTED",

    status:
      "ACTIVE DEVELOPMENT",

    objective:
      "Develop a repeatable Windows provisioning workflow that improves device consistency, reduces manual configuration, and supports scalable endpoint deployment.",

    technologies: [
      "Microsoft Intune",
      "Windows Autopilot",
      "Microsoft Entra ID",
      "PowerShell",
      "Windows 11"
    ],

    architecture: [
      "Device Registration",
      "Autopilot",
      "Intune Enrollment",
      "Identity",
      "Configuration",
      "Applications",
      "Validation"
    ],

    contribution: [
      "Designed the standardized provisioning workflow",
      "Built repeatable device registration processes",
      "Implemented deployment and pre-provisioning concepts",
      "Structured policy and application delivery",
      "Developed validation and troubleshooting procedures",
      "Documented the process for repeatable technical use"
    ],

    evidence: [
      "Provisioning architecture diagram",
      "Sanitized enrollment workflow",
      "Deployment profile overview",
      "Provisioning process documentation"
    ]

  },


  "endpoint-architecture": {

    label:
      "SYSTEM BUILD // 02",

    title:
      "Endpoint Management Architecture",

    notification:
      "BUILD 02 MOUNTED",

    status:
      "ACTIVE DEVELOPMENT",

    objective:
      "Establish centralized standards for Windows endpoint configuration, compliance, security, application delivery, and device lifecycle management.",

    technologies: [
      "Microsoft Intune",
      "Microsoft Entra ID",
      "Windows 11",
      "Endpoint Security",
      "Configuration Profiles"
    ],

    architecture: [
      "Enrollment",
      "Device Groups",
      "Configuration",
      "Compliance",
      "Security",
      "Applications",
      "Reporting"
    ],

    contribution: [
      "Evaluated existing endpoint management requirements",
      "Defined standardized device management approaches",
      "Structured configuration and compliance policies",
      "Developed application assignment strategy",
      "Designed endpoint security standards",
      "Created repeatable administrative documentation"
    ],

    evidence: [
      "Endpoint architecture diagram",
      "Sanitized policy structure",
      "Configuration workflow",
      "Device management model"
    ]

  },


  "automation-toolkit": {

    label:
      "SYSTEM BUILD // 03",

    title:
      "Endpoint Automation Toolkit",

    notification:
      "BUILD 03 MOUNTED",

    status:
      "ACTIVE DEVELOPMENT",

    objective:
      "Reduce repetitive endpoint administration by creating reusable automation workflows for discovery, validation, updates, provisioning, and technical operations.",

    technologies: [
      "PowerShell",
      "Windows",
      "Microsoft Intune",
      "Automation",
      "Endpoint Management"
    ],

    architecture: [
      "Discovery",
      "Assessment",
      "Validation",
      "Updates",
      "Provisioning",
      "Reporting"
    ],

    contribution: [
      "Automated endpoint discovery and validation processes",
      "Developed system health assessment workflows",
      "Created automated update processes",
      "Reduced repetitive provisioning steps",
      "Designed reusable technical utilities",
      "Documented workflow usage and troubleshooting"
    ],

    evidence: [
      "Automation workflow diagram",
      "Sanitized example output",
      "Process architecture",
      "System health report example"
    ]

  },


  "identity-security": {

    label:
      "SYSTEM BUILD // 04",

    title:
      "Identity Security Architecture",

    notification:
      "BUILD 04 MOUNTED",

    status:
      "DESIGN + IMPLEMENTATION",

    objective:
      "Develop a modern cloud identity framework centered on authentication, access controls, user lifecycle management, and secure application access.",

    technologies: [
      "Microsoft Entra ID",
      "Conditional Access",
      "MFA",
      "Microsoft 365",
      "SSO"
    ],

    architecture: [
      "Identity",
      "Authentication",
      "MFA",
      "Conditional Access",
      "Applications",
      "Cloud Resources"
    ],

    contribution: [
      "Developed identity administration standards",
      "Evaluated authentication and access requirements",
      "Designed Conditional Access approaches",
      "Evaluated application SSO opportunities",
      "Structured user and group administration workflows",
      "Documented identity security processes"
    ],

    evidence: [
      "Identity architecture diagram",
      "Authentication flow",
      "Sanitized access policy model",
      "SSO integration concept"
    ]

  },


  "infrastructure-standardization": {

    label:
      "SYSTEM BUILD // 05",

    title:
      "Multi-Site Infrastructure Standardization",

    notification:
      "BUILD 05 MOUNTED",

    status:
      "ACTIVE DEVELOPMENT",

    objective:
      "Improve consistency, supportability, visibility, and resiliency across distributed business technology and site infrastructure.",

    technologies: [
      "Networking",
      "SonicWall",
      "Windows Servers",
      "POS Systems",
      "Kiosks",
      "VoIP",
      "Remote Support"
    ],

    architecture: [
      "Network",
      "Firewall",
      "Servers",
      "Endpoints",
      "POS",
      "Kiosks",
      "Cameras",
      "Voice"
    ],

    contribution: [
      "Evaluated existing multi-site technology",
      "Identified infrastructure inconsistencies",
      "Developed support and management standards",
      "Improved technical documentation",
      "Troubleshot site infrastructure dependencies",
      "Identified backup, recovery, and resiliency opportunities"
    ],

    evidence: [
      "Generalized site architecture",
      "Infrastructure support workflow",
      "Standardization model",
      "Sanitized environment diagram"
    ]

  },


  "application-deployment": {

    label:
      "SYSTEM BUILD // 06",

    title:
      "Managed Application Deployment",

    notification:
      "BUILD 06 MOUNTED",

    status:
      "ACTIVE DEVELOPMENT",

    objective:
      "Transform manually installed applications into predictable and manageable deployment workflows across centrally managed Windows endpoints.",

    technologies: [
      "Microsoft Intune",
      "Win32 Applications",
      "Windows",
      "Application Packaging",
      "Deployment Testing"
    ],

    architecture: [
      "Installer Analysis",
      "Packaging",
      "Detection",
      "Assignment",
      "Deployment",
      "Validation"
    ],

    contribution: [
      "Evaluated application installer behavior",
      "Defined deployment and detection requirements",
      "Built and tested managed application packages",
      "Troubleshot deployment failures",
      "Structured assignment approaches",
      "Documented repeatable application deployment workflows"
    ],

    evidence: [
      "Application deployment workflow",
      "Sanitized deployment status",
      "Packaging lifecycle diagram",
      "Testing methodology"
    ]

  }

};


// =========================================================
// RENDER BUILD
// =========================================================

function renderBuild(build) {

  const architectureHTML =
    build.architecture
      .map((item, index) => {

        const arrow =
          index <
          build.architecture.length - 1
            ? `
              <span class="flow-arrow">
                
              </span>
            `
            : "";


        return `

          <span class="flow-item">
            ${item}
          </span>

          ${arrow}

        `;

      })
      .join("");


  const technologyHTML =
    build.technologies
      .map(item => `

        <span class="technology-tag">
          ${item}
        </span>

      `)
      .join("");


  const contributionHTML =
    build.contribution
      .map(item => `

        <li>
          ${item}
        </li>

      `)
      .join("");


  const evidenceHTML =
    build.evidence
      .map((item, index) => `

        <div class="evidence-card">

          <div class="evidence-number">
            0${index + 1}
          </div>

          <span>
            PROJECT EVIDENCE
          </span>

          <strong>
            ${item}
          </strong>

          <small>
            Sanitized artifact placeholder
          </small>

        </div>

      `)
      .join("");


  return `

    <div class="build-detail">


      <div class="build-summary-grid">


        <div class="build-objective">

          <span class="workspace-tag">
            OBJECTIVE
          </span>

          <p>
            ${build.objective}
          </p>

        </div>


        <div class="build-state-panel">

          <span class="workspace-tag">
            BUILD STATE
          </span>

          <strong>
            ${build.status}
          </strong>


          <div class="build-state-line">

            <span class="status-dot"></span>

            SYSTEM INDEXED

          </div>

        </div>


      </div>



      <div class="detail-section">

        <span class="workspace-tag">
          SYSTEM FLOW
        </span>


        <div class="architecture-flow">
          ${architectureHTML}
        </div>

      </div>



      <div class="detail-section">

        <span class="workspace-tag">
          TECHNOLOGY STACK
        </span>


        <div class="technology-list">
          ${technologyHTML}
        </div>

      </div>



      <div class="detail-section">

        <span class="workspace-tag">
          MY CONTRIBUTION
        </span>


        <ul class="contribution-list">
          ${contributionHTML}
        </ul>

      </div>



      <div class="detail-section">

        <span class="workspace-tag">
          PROJECT EVIDENCE
        </span>


        <p class="privacy-note">

          Technical evidence is limited to
          sanitized diagrams, screenshots,
          workflow models, and
          non-confidential output.

          Internal source code,
          credentials,
          tenant identifiers,
          internal addresses,
          and proprietary configurations
          are excluded.

        </p>


        <div class="evidence-grid">
          ${evidenceHTML}
        </div>

      </div>


    </div>

  `;

}


// =========================================================
// UNIVERSAL PROJECTOR REFERENCES
// =========================================================

const projectionBackground =
  document.getElementById("projection-background");

const projectionLayer =
  document.getElementById("projection-layer");

const projectionBeam =
  document.getElementById("projection-beam");

const projectionLabel =
  document.getElementById("projection-label");

const projectionTitle =
  document.getElementById("projection-title");

const projectionStateText =
  document.getElementById("projection-state-text");

const projectionBody =
  document.getElementById("projection-body");

const closeProjection =
  document.getElementById("close-projection");


let activeProjectionCard =
  null;

let floatingProjectionCard =
  null;

let projectionClosing =
  false;


// =========================================================
// MOVE PROJECTOR TO BODY
// =========================================================

if (projectionBackground) {
  document.body.appendChild(
    projectionBackground
  );
}

if (projectionLayer) {
  document.body.appendChild(
    projectionLayer
  );
}


// =========================================================
// ENDPOINT MODULE PROJECTION
// =========================================================

function renderEndpointProjection() {

  projectionBody.innerHTML = `

    <div class="endpoint-projection-layout">


      <article
        class="projected-block projection-piece"
      >

        <span class="projected-tag">
          DEVICE MANAGEMENT
        </span>

        <h3>
          Microsoft Intune
        </h3>

        <p>
          Configuration profiles, policy targeting,
          managed applications, compliance,
          and centralized endpoint administration.
        </p>

      </article>



      <section
        class="endpoint-projection-center projection-piece"
      >

        <div class="endpoint-projection-flow">


          <div class="projection-flow-node">
            DEVICE REGISTRATION
          </div>

          <div class="projection-flow-arrow"></div>


          <div class="projection-flow-node">
            WINDOWS AUTOPILOT
          </div>

          <div class="projection-flow-arrow"></div>


          <div class="projection-flow-node">
            INTUNE ENROLLMENT
          </div>

          <div class="projection-flow-arrow"></div>


          <div class="projection-flow-node">
            CONFIGURATION + APPS
          </div>

          <div class="projection-flow-arrow"></div>


          <div class="projection-flow-node">
            COMPLIANT / USER READY
          </div>


        </div>

      </section>



      <article
        class="projected-block projection-piece"
      >

        <span class="projected-tag">
          SECURITY
        </span>

        <h3>
          Compliance + Device Health
        </h3>

        <p>
          Security posture, compliance requirements,
          health validation, remediation visibility,
          and managed endpoint standards.
        </p>

      </article>



      <article
        class="projected-block projection-piece"
      >

        <span class="projected-tag">
          APPLICATION DELIVERY
        </span>

        <h3>
          Managed Software
        </h3>

        <p>
          Win32 packaging, detection logic,
          assignments, testing, and standardized
          application deployment.
        </p>

      </article>



      <article
        class="projected-block projection-piece"
      >

        <span class="projected-tag">
          OPERATIONS
        </span>

        <h3>
          Endpoint Lifecycle
        </h3>

        <p>
          Provisioning, validation, troubleshooting,
          recovery, refresh, and reprovisioning.
        </p>

      </article>



      <div
        class="endpoint-lifecycle-bar projection-piece"
      >

        <div class="endpoint-lifecycle-step">
          PROVISION
        </div>

        <div class="endpoint-lifecycle-step">
          MANAGE
        </div>

        <div class="endpoint-lifecycle-step">
          VALIDATE
        </div>

        <div class="endpoint-lifecycle-step">
          RECOVER
        </div>

      </div>


    </div>

  `;

}


// =========================================================
// IDENTITY PROJECTION
// =========================================================

function renderIdentityProjection() {

  projectionBody.innerHTML = `

    <div class="identity-projection-layout">


      <article
        class="projected-block projection-piece"
      >

        <span class="projected-tag">
          ADMINISTRATION
        </span>

        <h3>
          Identity Lifecycle
        </h3>

        <p>
          User provisioning, groups, licensing,
          access changes, onboarding,
          administration, and offboarding.
        </p>

      </article>



      <section
        class="identity-projection-core projection-piece"
      >

        <div class="identity-projection-node">
          USER / DEVICE IDENTITY
        </div>


        <div class="identity-projection-branch"></div>


        <div class="identity-projection-node">
          MICROSOFT ENTRA ID
        </div>


        <div class="identity-projection-branch"></div>


        <div class="identity-projection-spokes">

          <div class="identity-projection-spoke">
            MFA
          </div>

          <div class="identity-projection-spoke">
            CONDITIONAL ACCESS
          </div>

          <div class="identity-projection-spoke">
            SSO
          </div>

        </div>


        <div class="identity-projection-branch"></div>


        <div class="identity-projection-node">
          BUSINESS APPLICATIONS
        </div>

      </section>



      <article
        class="projected-block projection-piece"
      >

        <span class="projected-tag">
          AUTHENTICATION
        </span>

        <h3>
          Multi-Factor Authentication
        </h3>

        <p>
          Secure authentication, registration,
          recovery, troubleshooting,
          and account protection.
        </p>

      </article>



      <article
        class="projected-block projection-piece"
      >

        <span class="projected-tag">
          ACCESS CONTROL
        </span>

        <h3>
          Conditional Access
        </h3>

        <p>
          Access decisions based on identity,
          authentication context, device state,
          applications, and cloud resources.
        </p>

      </article>



      <article
        class="projected-block projection-piece"
      >

        <span class="projected-tag">
          APPLICATION ACCESS
        </span>

        <h3>
          Single Sign-On
        </h3>

        <p>
          Centralized authentication
          across Microsoft 365
          and business applications.
        </p>

      </article>


    </div>

  `;

}


// =========================================================
// INFRASTRUCTURE PROJECTION
// =========================================================

function renderInfrastructureProjection() {

  projectionBody.innerHTML = `

    <div class="infrastructure-projection-layout">


      <article
        class="projected-block projection-piece"
      >

        <span class="projected-tag">
          COMPUTE
        </span>

        <h3>
          Server Infrastructure
        </h3>

        <p>
          Physical server support,
          resiliency planning, backup,
          recovery, and lifecycle standards.
        </p>

      </article>



      <section
        class="infrastructure-network-map projection-piece"
      >

        <div class="infrastructure-network-node">
          INTERNET / WAN
        </div>


        <div class="infrastructure-network-line"></div>


        <div class="infrastructure-network-node">
          SONICWALL
        </div>


        <div class="infrastructure-network-line"></div>


        <div class="infrastructure-network-branches">

          <div class="infrastructure-network-branch">
            SERVER
          </div>

          <div class="infrastructure-network-branch">
            POS / XPT
          </div>

          <div class="infrastructure-network-branch">
            KIOSKS
          </div>

        </div>


        <div class="infrastructure-network-line"></div>


        <div class="infrastructure-network-branches">

          <div class="infrastructure-network-branch">
            CAMERAS
          </div>

          <div class="infrastructure-network-branch">
            VOICE
          </div>

          <div class="infrastructure-network-branch">
            REMOTE SUPPORT
          </div>

        </div>

      </section>



      <article
        class="projected-block projection-piece"
      >

        <span class="projected-tag">
          NETWORKING
        </span>

        <h3>
          Multi-Site Connectivity
        </h3>

        <p>
          Distributed connectivity,
          firewall dependencies,
          site troubleshooting,
          and operational uptime.
        </p>

      </article>



      <article
        class="projected-block projection-piece"
      >

        <span class="projected-tag">
          BUSINESS SYSTEMS
        </span>

        <h3>
          POS + XPT
        </h3>

        <p>
          Business-critical site systems,
          workstation profiles,
          connectivity, and readiness.
        </p>

      </article>



      <article
        class="projected-block projection-piece"
      >

        <span class="projected-tag">
          SITE TECHNOLOGY
        </span>

        <h3>
          Kiosks + Cameras + Voice
        </h3>

        <p>
          Specialized endpoints,
          camera systems, VoIP,
          tablets, and remote support.
        </p>

      </article>


    </div>

  `;

}


// =========================================================
// AUTOMATION PROJECTION
// =========================================================

function renderAutomationProjection() {

  projectionBody.innerHTML = `

    <div class="automation-projection-layout">


      <section
        class="automation-projection-pipeline projection-piece"
      >


        <div class="automation-pipeline-step">

          <span>
            01 // DISCOVER
          </span>

          <span>
            SYSTEM STATE
          </span>

        </div>


        <div class="automation-pipeline-step">

          <span>
            02 // VALIDATE
          </span>

          <span>
            READINESS
          </span>

        </div>


        <div class="automation-pipeline-step">

          <span>
            03 // DECIDE
          </span>

          <span>
            CONDITIONS
          </span>

        </div>


        <div class="automation-pipeline-step">

          <span>
            04 // EXECUTE
          </span>

          <span>
            WORKFLOW
          </span>

        </div>


        <div class="automation-pipeline-step">

          <span>
            05 // VERIFY
          </span>

          <span>
            OUTCOME
          </span>

        </div>


        <div class="automation-pipeline-step">

          <span>
            06 // REPORT
          </span>

          <span>
            RESULTS
          </span>

        </div>


      </section>



      <section class="automation-projection-side">


        <article
          class="projected-block projection-piece"
        >

          <span class="projected-tag">
            SCRIPTING
          </span>

          <h3>
            PowerShell
          </h3>

          <p>
            Administrative tooling for discovery,
            validation, provisioning,
            updates, and endpoint operations.
          </p>

        </article>



        <article
          class="projected-block projection-piece"
        >

          <span class="projected-tag">
            PROVISIONING
          </span>

          <h3>
            Deployment Workflows
          </h3>

          <p>
            Device preparation,
            registration, drivers,
            enrollment, and deployment validation.
          </p>

        </article>



        <article
          class="projected-block projection-piece"
        >

          <span class="projected-tag">
            STANDARDIZATION
          </span>

          <h3>
            Repeatable Operations
          </h3>

          <p>
            Turning manual processes
            into reusable tools,
            SOPs, checks, and workflows.
          </p>

        </article>


      </section>


    </div>

  `;

}


// =========================================================
// MODULE ROUTER
// =========================================================

function renderModuleProjection(
  name
) {

  const module =
    modules[name];


  if (!module) {
    return;
  }


  projectionLabel.textContent =
    "CORE MODULE // ARCHITECTURE VIEW";


  projectionTitle.textContent =
    module.title;


  projectionStateText.textContent =
    "MODULE ONLINE";


  if (
    name === "endpoints"
  ) {

    renderEndpointProjection();

  }


  if (
    name === "identity"
  ) {

    renderIdentityProjection();

  }


  if (
    name === "infrastructure"
  ) {

    renderInfrastructureProjection();

  }


  if (
    name === "automation"
  ) {

    renderAutomationProjection();

  }

}


// =========================================================
// BUILD PROJECTION
// =========================================================

function renderBuildProjection(
  name
) {

  const build =
    systemBuilds[name];


  if (!build) {
    return;
  }


  projectionLabel.textContent =
    build.label;


  projectionTitle.textContent =
    build.title;


  projectionStateText.textContent =
    "BUILD ONLINE";


  const architectureHTML =
    build.architecture
      .map(
        (item, index) => `

          <div class="build-architecture-node">

            <span>
              ${String(index + 1).padStart(2, "0")}
            </span>

            <strong>
              ${item}
            </strong>

          </div>

        `
      )
      .join("");


  const technologyHTML =
    build.technologies
      .map(
        item => `

          <span class="build-tech-pill">
            ${item}
          </span>

        `
      )
      .join("");


  const contributionHTML =
    build.contribution
      .map(
        item => `

          <li>
            ${item}
          </li>

        `
      )
      .join("");


  projectionBody.innerHTML = `

    <div class="build-projection-layout">


      <section
        class="build-projection-objective projection-piece"
      >

        <div>

          <span class="projected-tag">
            PROJECT OBJECTIVE
          </span>

          <p>
            ${build.objective}
          </p>

        </div>


        <div class="build-projection-status">

          <span>
            STATUS
          </span>

          <strong>
            ${build.status}
          </strong>

        </div>

      </section>



      <section
        class="build-projection-architecture projection-piece"
      >

        <span class="projected-tag">
          SYSTEM ARCHITECTURE
        </span>

        ${architectureHTML}

      </section>



      <section class="build-projection-side">


        <div
          class="build-projection-stack projection-piece"
        >

          <span class="projected-tag">
            TECHNOLOGY STACK
          </span>


          <div class="build-tech-stack">

            ${technologyHTML}

          </div>

        </div>



        <div
          class="build-projection-contribution projection-piece"
        >

          <span class="projected-tag">
            MY CONTRIBUTION
          </span>


          <ul class="build-contribution-list">

            ${contributionHTML}

          </ul>

        </div>


      </section>


    </div>

  `;

}


// =========================================================
// POSITION BEAM
// =========================================================

function positionProjectionBeam() {

  if (!projectionBeam) {
    return;
  }


  const projectorHeight =
    128;


  const projectorTop =
    window.innerHeight -
    projectorHeight -
    2;


  projectionBeam.style.bottom =
    `${
      window.innerHeight -
      projectorTop -
      6
    }px`;

}


// =========================================================
// CREATE FLOATING PROJECTOR CARD
// =========================================================

function createProjectionCard(
  card,
  title
) {

  const rect =
    card.getBoundingClientRect();


  floatingProjectionCard =
    card.cloneNode(true);


  floatingProjectionCard.classList.remove(
    "module-card",
    "build-card",
    "module-active",
    "build-active",
    "projection-source",
    "projection-returning",
    "projection-return-visible"
  );


  floatingProjectionCard.classList.add(
    "floating-projection-card",
    "projection-travelling"
  );


  floatingProjectionCard.style.left =
    `${rect.left}px`;


  floatingProjectionCard.style.top =
    `${rect.top}px`;


  floatingProjectionCard.style.width =
    `${rect.width}px`;


  floatingProjectionCard.style.height =
    `${rect.height}px`;


  floatingProjectionCard.innerHTML += `

    <div class="projector-hardware">

      <div class="projector-ring"></div>

      <div class="projector-core"></div>

    </div>


    <div class="projector-card-label">
      PROJECTING // ${title}
    </div>

  `;


  document.body.appendChild(
    floatingProjectionCard
  );


  /*
    Original disappears only after
    identical clone exists above it.
  */

  card.classList.add(
    "projection-source"
  );


  void floatingProjectionCard.offsetWidth;


  const destinationWidth =
    Math.min(
      440,
      window.innerWidth * 0.76
    );


  const destinationHeight =
    128;


  const destinationLeft =
    window.innerWidth / 2 -
    destinationWidth / 2;


  const destinationTop =
    window.innerHeight -
    destinationHeight -
    2;


  floatingProjectionCard.style.left =
    `${destinationLeft}px`;


  floatingProjectionCard.style.top =
    `${destinationTop}px`;


  floatingProjectionCard.style.width =
    `${destinationWidth}px`;


  floatingProjectionCard.style.height =
    `${destinationHeight}px`;


  /*
    Card physically reaches dock.
  */

  setTimeout(
    () => {

      if (!floatingProjectionCard) {
        return;
      }


      floatingProjectionCard.classList.remove(
        "projection-travelling"
      );


      floatingProjectionCard.classList.add(
        "projection-docked"
      );

    },
    900
  );


  /*
    Card turns into projector.
  */

  setTimeout(
    () => {

      if (!floatingProjectionCard) {
        return;
      }


      floatingProjectionCard.classList.add(
        "projection-projecting"
      );

    },
    1150
  );

}


// =========================================================
// OPEN UNIVERSAL PROJECTION
// =========================================================

function openProjection(
  card
) {

  if (
    activeProjectionCard ||
    projectionClosing
  ) {

    return;

  }


  const type =
    card.dataset.projection;


  let title =
    "";


  if (
    type === "module"
  ) {

    const name =
      card.dataset.module;


    const module =
      modules[name];


    if (!module) {
      return;
    }


    title =
      module.title;


    renderModuleProjection(
      name
    );

  }


  if (
    type === "build"
  ) {

    const name =
      card.dataset.build;


    const build =
      systemBuilds[name];


    if (!build) {
      return;
    }


    title =
      build.title;


    renderBuildProjection(
      name
    );

  }


  if (!title) {
    return;
  }


  activeProjectionCard =
    card;


  lockPageScroll();


  document.body.classList.add(
    "projection-open"
  );


  createProjectionCard(
    card,
    title
  );


  positionProjectionBeam();


  /*
    Let selected card visibly dock first.
  */

  setTimeout(
    () => {

      if (
        !projectionLayer ||
        !activeProjectionCard
      ) {

        return;

      }


      projectionLayer.classList.add(
        "projection-active"
      );


      projectionLayer.setAttribute(
        "aria-hidden",
        "false"
      );

    },
    1450
  );


  /*
    Once projection is established,
    physical projector almost disappears.
  */

  setTimeout(
    () => {

      if (
        floatingProjectionCard
      ) {

        floatingProjectionCard.classList.add(
          "projector-faded"
        );

      }

    },
    3200
  );


  showNotification(
    type === "module"
      ? "MODULE PROJECTED"
      : "SYSTEM BUILD PROJECTED",

    title
  );

}


// =========================================================
// CLOSE UNIVERSAL PROJECTION
// =========================================================

function closeUniversalProjection() {

  if (
    !activeProjectionCard ||
    !floatingProjectionCard ||
    projectionClosing
  ) {

    return;

  }


  projectionClosing =
    true;


  projectionLayer.classList.remove(
    "projection-active"
  );


  projectionLayer.setAttribute(
    "aria-hidden",
    "true"
  );


  /*
    Keep returning projector ghosted.
  */

  floatingProjectionCard.classList.remove(
    "projector-faded"
  );


  floatingProjectionCard.classList.add(
    "return-dissolve"
  );


  /*
    Real card prepares underneath.
  */

  activeProjectionCard.classList.remove(
    "projection-source"
  );


  activeProjectionCard.classList.add(
    "projection-returning"
  );


  /*
    Ghost clone moves home.
  */

  setTimeout(
    () => {

      if (
        !floatingProjectionCard ||
        !activeProjectionCard
      ) {

        return;

      }


      const rect =
        activeProjectionCard
          .getBoundingClientRect();


      floatingProjectionCard.style.left =
        `${rect.left}px`;


      floatingProjectionCard.style.top =
        `${rect.top}px`;


      floatingProjectionCard.style.width =
        `${rect.width}px`;


      floatingProjectionCard.style.height =
        `${rect.height}px`;

    },
    120
  );


  /*
    Real card fades back in.
  */

  setTimeout(
    () => {

      if (
        activeProjectionCard
      ) {

        activeProjectionCard.classList.add(
          "projection-return-visible"
        );

      }

    },
    420
  );


  /*
    Restore page.
  */

  setTimeout(
    () => {

      document.body.classList.remove(
        "projection-open"
      );


      unlockPageScroll();

    },
    650
  );


  /*
    Cleanup.
  */

  setTimeout(
    () => {

      if (
        floatingProjectionCard
      ) {

        floatingProjectionCard.remove();


        floatingProjectionCard =
          null;

      }


      if (
        activeProjectionCard
      ) {

        activeProjectionCard.classList.remove(
          "projection-returning",
          "projection-return-visible"
        );

      }


      activeProjectionCard =
        null;


      projectionClosing =
        false;

    },
    1050
  );

}


// =========================================================
// ALL PROJECTABLE CARDS
// =========================================================

const projectionCards =
  document.querySelectorAll(
    '[data-projection="module"], [data-projection="build"]'
  );


projectionCards.forEach(
  card => {

    card.addEventListener(
      "click",
      () => {

        openProjection(
          card
        );

      }
    );

  }
);


// =========================================================
// CLOSE BUTTON
// =========================================================

if (
  closeProjection
) {

  closeProjection.addEventListener(
    "click",
    () => {

      closeUniversalProjection();


      showNotification(
        "SYSTEM UNMOUNTED",
        "Projection closed"
      );

    }
  );

}


// =========================================================
// RESIZE
// =========================================================

window.addEventListener(
  "resize",
  () => {

    if (
      !floatingProjectionCard ||
      !activeProjectionCard ||
      projectionClosing
    ) {

      return;

    }


    const destinationWidth =
      Math.min(
        440,
        window.innerWidth * 0.76
      );


    const destinationHeight =
      128;


    floatingProjectionCard.style.left =
      `${
        window.innerWidth / 2 -
        destinationWidth / 2
      }px`;


    floatingProjectionCard.style.top =
      `${
        window.innerHeight -
        destinationHeight -
        2
      }px`;


    floatingProjectionCard.style.width =
      `${destinationWidth}px`;


    floatingProjectionCard.style.height =
      `${destinationHeight}px`;


    positionProjectionBeam();

  }
);


// =========================================================
// WINDOW ANIMATION
// =========================================================

function restartWindowAnimation(
  element
) {

  if (!element) return;


  element.classList.remove(
    "workspace-enter"
  );


  void element.offsetWidth;


  element.classList.add(
    "workspace-enter"
  );

}


// =========================================================
// ESCAPE TO CLOSE
// =========================================================

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      modalOpen
    ) {

      closeAllWorkspaces();


      showNotification(
        "WINDOW CLOSED",
        "System workspace unmounted"
      );


      return;

    }


    const commandKey =
      event.ctrlKey ||
      event.metaKey;


    if (
      commandKey &&
      event.key.toLowerCase() === "k"
    ) {

      event.preventDefault();


      showNotification(
        "COMMAND INTERFACE",
        "Command palette reserved for future build"
      );

    }

  }
);


// =========================================================
// CURSOR LIGHTING
// =========================================================

function addCursorLighting(
  cards
) {

  cards.forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        const rect =
          card.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;


        card.style.setProperty(
          "--mouse-x",
          `${x}px`
        );


        card.style.setProperty(
          "--mouse-y",
          `${y}px`
        );

      }
    );

  });

}


addCursorLighting(
  moduleCards
);

addCursorLighting(
  buildCards
);


// =========================================================
// NOTIFICATIONS
// =========================================================

function showNotification(
  title,
  message
) {

  const existing =
    document.querySelector(
      ".system-notification"
    );


  if (existing) {
    existing.remove();
  }


  const notification =
    document.createElement("div");


  notification.className =
    "system-notification";


  notification.innerHTML = `

    <div class="notification-dot"></div>


    <div class="notification-copy">

      <strong>
        ${title}
      </strong>

      <span>
        ${message}
      </span>

    </div>

  `;


  document.body.appendChild(
    notification
  );


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

      if (
        document.body.contains(
          notification
        )
      ) {

        notification.remove();

      }

    }, 350);

  }, 2200);

}


// =========================================================
// SYSTEM CONSOLE
// =========================================================

console.log(
  "%c TRANQUILINO OS v2.0 ",
  "background:#050505;color:#d7a83d;font-size:16px;padding:8px;"
);


console.log(
  "Main system controller loaded."
);
