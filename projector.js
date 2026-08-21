// =========================================================
// TRANQUILINO OS v2.0
// UNIVERSAL PROJECTOR
// =========================================================

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

const closeProjectionButton =
  document.getElementById("close-projection");


let activeProjectionCard = null;
let floatingProjectionCard = null;
let projectionClosing = false;


// =========================================================
// MODULE DATA
// =========================================================

const projectorModules = {

  endpoints: {
    title: "Endpoint Systems"
  },

  identity: {
    title: "Identity + Access"
  },

  infrastructure: {
    title: "Infrastructure"
  },

  automation: {
    title: "Automation"
  }

};


// =========================================================
// BUILD DATA
// =========================================================

const projectorBuilds = {

  autopilot: {
    title: "Windows Autopilot Provisioning System",
    status: "ACTIVE DEVELOPMENT",

    objective:
      "Standardized cloud-driven Windows provisioning designed to reduce manual configuration and create repeatable endpoint deployments.",

    architecture: [
      "DEVICE REGISTRATION",
      "WINDOWS AUTOPILOT",
      "INTUNE ENROLLMENT",
      "ENTRA ID",
      "CONFIGURATION + APPS",
      "VALIDATION"
    ],

    stack: [
      "INTUNE",
      "AUTOPILOT",
      "ENTRA ID",
      "POWERSHELL",
      "WINDOWS 11"
    ]
  },


  "endpoint-architecture": {
    title: "Endpoint Management Architecture",
    status: "ACTIVE DEVELOPMENT",

    objective:
      "Centralized Windows endpoint standards covering configuration, compliance, security, application delivery, and lifecycle management.",

    architecture: [
      "ENROLLMENT",
      "DEVICE GROUPS",
      "CONFIGURATION",
      "COMPLIANCE",
      "SECURITY",
      "APPLICATIONS"
    ],

    stack: [
      "INTUNE",
      "WINDOWS",
      "COMPLIANCE",
      "ENDPOINT SECURITY"
    ]
  },


  "automation-toolkit": {
    title: "Endpoint Automation Toolkit",
    status: "ACTIVE DEVELOPMENT",

    objective:
      "Reusable administrative workflows for discovery, validation, provisioning, updates, and endpoint readiness.",

    architecture: [
      "DISCOVER",
      "VALIDATE",
      "DECIDE",
      "EXECUTE",
      "VERIFY",
      "REPORT"
    ],

    stack: [
      "POWERSHELL",
      "WINDOWS",
      "AUTOMATION",
      "INTUNE"
    ]
  },


  "identity-security": {
    title: "Identity Security Architecture",
    status: "DESIGN",

    objective:
      "Cloud identity controls centered around authentication, MFA, Conditional Access, application access, and SSO.",

    architecture: [
      "IDENTITY",
      "AUTHENTICATION",
      "MFA",
      "CONDITIONAL ACCESS",
      "APPLICATIONS",
      "ACCESS VALIDATION"
    ],

    stack: [
      "ENTRA ID",
      "MFA",
      "CONDITIONAL ACCESS",
      "SSO",
      "MICROSOFT 365"
    ]
  },


  "infrastructure-standardization": {
    title: "Multi-Site Infrastructure Standardization",
    status: "ACTIVE DEVELOPMENT",

    objective:
      "Improving consistency, supportability, resiliency, and operational visibility across distributed site technology.",

    architecture: [
      "WAN",
      "SONICWALL",
      "SERVERS",
      "POS / XPT",
      "KIOSKS",
      "SITE SYSTEMS"
    ],

    stack: [
      "SONICWALL",
      "WINDOWS",
      "SERVERS",
      "NETWORKING",
      "POS"
    ]
  },


  "application-deployment": {
    title: "Managed Application Deployment",
    status: "ACTIVE DEVELOPMENT",

    objective:
      "Predictable managed application delivery through packaging, detection, assignment, testing, deployment, and validation.",

    architecture: [
      "SOURCE",
      "PACKAGE",
      "DETECTION",
      "ASSIGNMENT",
      "DEPLOYMENT",
      "VALIDATION"
    ],

    stack: [
      "INTUNE",
      "WIN32",
      "POWERSHELL",
      "WINDOWS"
    ]
  }

};


// =========================================================
// ENDPOINT PROJECTION
// =========================================================

function renderEndpointProjection() {

  projectionBody.innerHTML = `

    <div class="endpoint-projection-layout">

      <article class="projected-block projection-piece">

        <span class="projected-tag">
          DEVICE MANAGEMENT
        </span>

        <h3>
          Microsoft Intune
        </h3>

        <p>
          Configuration profiles, policy targeting,
          compliance, managed applications,
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


      <article class="projected-block projection-piece">

        <span class="projected-tag">
          SECURITY
        </span>

        <h3>
          Compliance + Health
        </h3>

        <p>
          Security posture, compliance requirements,
          device-health validation,
          and remediation visibility.
        </p>

      </article>


      <article class="projected-block projection-piece">

        <span class="projected-tag">
          APPLICATIONS
        </span>

        <h3>
          Managed Deployment
        </h3>

        <p>
          Win32 packaging, detection logic,
          assignments, testing,
          and managed software delivery.
        </p>

      </article>


      <article class="projected-block projection-piece">

        <span class="projected-tag">
          OPERATIONS
        </span>

        <h3>
          Endpoint Lifecycle
        </h3>

        <p>
          Provisioning, troubleshooting,
          recovery, refresh,
          and reprovisioning.
        </p>

      </article>


      <div class="endpoint-lifecycle-bar projection-piece">

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

      <article class="projected-block projection-piece">

        <span class="projected-tag">
          ADMINISTRATION
        </span>

        <h3>
          Identity Lifecycle
        </h3>

        <p>
          Users, groups, licensing,
          onboarding, access changes,
          and offboarding.
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


      <article class="projected-block projection-piece">

        <span class="projected-tag">
          AUTHENTICATION
        </span>

        <h3>
          MFA
        </h3>

        <p>
          Authentication security,
          registration, recovery,
          and account protection.
        </p>

      </article>


      <article class="projected-block projection-piece">

        <span class="projected-tag">
          ACCESS CONTROL
        </span>

        <h3>
          Conditional Access
        </h3>

        <p>
          Identity and device-aware
          access controls for cloud resources.
        </p>

      </article>


      <article class="projected-block projection-piece">

        <span class="projected-tag">
          APPLICATION ACCESS
        </span>

        <h3>
          Single Sign-On
        </h3>

        <p>
          Centralized authentication across
          Microsoft 365 and business systems.
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

      <article class="projected-block projection-piece">

        <span class="projected-tag">
          COMPUTE
        </span>

        <h3>
          Servers
        </h3>

        <p>
          Physical infrastructure,
          resiliency, backup,
          recovery, and lifecycle.
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
            REMOTE
          </div>

        </div>

      </section>


      <article class="projected-block projection-piece">

        <span class="projected-tag">
          NETWORKING
        </span>

        <h3>
          Multi-Site Connectivity
        </h3>

        <p>
          Site connectivity,
          firewall dependencies,
          troubleshooting, and uptime.
        </p>

      </article>


      <article class="projected-block projection-piece">

        <span class="projected-tag">
          BUSINESS SYSTEMS
        </span>

        <h3>
          POS + XPT
        </h3>

        <p>
          Business-critical systems,
          workstation profiles,
          and operational readiness.
        </p>

      </article>


      <article class="projected-block projection-piece">

        <span class="projected-tag">
          SITE TECHNOLOGY
        </span>

        <h3>
          Kiosks + Cameras + Voice
        </h3>

        <p>
          Specialized endpoints,
          cameras, tablets,
          voice, and remote support.
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
          <span>01 // DISCOVER</span>
          <span>SYSTEM STATE</span>
        </div>

        <div class="automation-pipeline-step">
          <span>02 // VALIDATE</span>
          <span>READINESS</span>
        </div>

        <div class="automation-pipeline-step">
          <span>03 // DECIDE</span>
          <span>CONDITIONS</span>
        </div>

        <div class="automation-pipeline-step">
          <span>04 // EXECUTE</span>
          <span>WORKFLOW</span>
        </div>

        <div class="automation-pipeline-step">
          <span>05 // VERIFY</span>
          <span>OUTCOME</span>
        </div>

        <div class="automation-pipeline-step">
          <span>06 // REPORT</span>
          <span>RESULTS</span>
        </div>

      </section>


      <section class="automation-projection-side">

        <article class="projected-block projection-piece">

          <span class="projected-tag">
            SCRIPTING
          </span>

          <h3>
            PowerShell
          </h3>

          <p>
            Administrative automation,
            discovery, validation,
            and endpoint tooling.
          </p>

        </article>


        <article class="projected-block projection-piece">

          <span class="projected-tag">
            PROVISIONING
          </span>

          <h3>
            Deployment Workflows
          </h3>

          <p>
            Device preparation,
            enrollment, drivers,
            and validation.
          </p>

        </article>


        <article class="projected-block projection-piece">

          <span class="projected-tag">
            STANDARDIZATION
          </span>

          <h3>
            Repeatable Operations
          </h3>

          <p>
            Turning manual tasks into
            reusable tools,
            workflows, and SOPs.
          </p>

        </article>

      </section>

    </div>

  `;

}


// =========================================================
// BUILD PROJECTION
// =========================================================

function renderBuildProjection(name) {

  const build =
    projectorBuilds[name];


  if (!build) {
    return;
  }


  projectionLabel.textContent =
    "SYSTEM BUILD // PROJECT ARCHITECTURE";


  projectionTitle.textContent =
    build.title;


  projectionStateText.textContent =
    "BUILD ONLINE";


  const architecture =
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


  const stack =
    build.stack
      .map(
        item => `

          <span class="build-tech-pill">
            ${item}
          </span>

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

        ${architecture}

      </section>


      <section class="build-projection-side">


        <div
          class="build-projection-stack projection-piece"
        >

          <span class="projected-tag">
            TECHNOLOGY STACK
          </span>


          <div class="build-tech-stack">
            ${stack}
          </div>

        </div>


        <div
          class="build-projection-contribution projection-piece"
        >

          <span class="projected-tag">
            SYSTEM PURPOSE
          </span>


          <ul class="build-contribution-list">

            <li>
              Standardize repeatable administration.
            </li>

            <li>
              Reduce manual configuration.
            </li>

            <li>
              Improve operational consistency.
            </li>

            <li>
              Create portfolio-safe architecture evidence.
            </li>

          </ul>

        </div>


      </section>


    </div>

  `;

}


// =========================================================
// MODULE ROUTER
// =========================================================

function renderModuleProjection(name) {

  const module =
    projectorModules[name];


  if (!module) {
    return false;
  }


  projectionLabel.textContent =
    "CORE MODULE // ARCHITECTURE VIEW";


  projectionTitle.textContent =
    module.title;


  projectionStateText.textContent =
    "MODULE ONLINE";


  if (name === "endpoints") {
    renderEndpointProjection();
  }


  if (name === "identity") {
    renderIdentityProjection();
  }


  if (name === "infrastructure") {
    renderInfrastructureProjection();
  }


  if (name === "automation") {
    renderAutomationProjection();
  }


  return true;

}


// =========================================================
// CREATE FLOATING CARD
// =========================================================

function createFloatingProjectionCard(
  card,
  title
) {

  const rect =
    card.getBoundingClientRect();


  floatingProjectionCard =
    card.cloneNode(true);


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


  card.classList.add(
    "projection-source"
  );


  void floatingProjectionCard.offsetWidth;


  const width =
    Math.min(
      440,
      window.innerWidth * 0.76
    );


  const height =
    128;


  floatingProjectionCard.style.left =
    `${
      window.innerWidth / 2 -
      width / 2
    }px`;


  floatingProjectionCard.style.top =
    `${
      window.innerHeight -
      height -
      2
    }px`;


  floatingProjectionCard.style.width =
    `${width}px`;


  floatingProjectionCard.style.height =
    `${height}px`;


  setTimeout(() => {

    if (!floatingProjectionCard) {
      return;
    }


    floatingProjectionCard.classList.remove(
      "projection-travelling"
    );


    floatingProjectionCard.classList.add(
      "projection-docked"
    );

  }, 900);


  setTimeout(() => {

    if (!floatingProjectionCard) {
      return;
    }


    floatingProjectionCard.classList.add(
      "projection-projecting"
    );

  }, 1150);

}


// =========================================================
// OPEN PROJECTION
// =========================================================

function openUniversalProjection(card) {

  if (
    activeProjectionCard ||
    projectionClosing
  ) {

    return;

  }


  let title = "";


  const moduleName =
    card.dataset.module;


  const buildName =
    card.dataset.build;


  if (
    moduleName &&
    projectorModules[moduleName]
  ) {

    renderModuleProjection(
      moduleName
    );


    title =
      projectorModules[moduleName].title;

  }


  else if (
    buildName &&
    projectorBuilds[buildName]
  ) {

    renderBuildProjection(
      buildName
    );


    title =
      projectorBuilds[buildName].title;

  }


  else {

    return;

  }


  activeProjectionCard =
    card;


  document.documentElement.style.overflow =
    "hidden";


  document.body.style.overflow =
    "hidden";


  document.body.classList.add(
    "projection-open"
  );


  createFloatingProjectionCard(
    card,
    title
  );


  projectionBeam.style.bottom =
    "122px";


  setTimeout(() => {

    if (!projectionLayer) {
      return;
    }


    projectionLayer.classList.add(
      "projection-active"
    );


    projectionLayer.setAttribute(
      "aria-hidden",
      "false"
    );

  }, 1450);


  setTimeout(() => {

    if (floatingProjectionCard) {

      floatingProjectionCard.classList.add(
        "projector-faded"
      );

    }

  }, 3200);

}


// =========================================================
// CLOSE PROJECTION
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


  floatingProjectionCard.classList.remove(
    "projector-faded"
  );


  floatingProjectionCard.classList.add(
    "return-dissolve"
  );


  activeProjectionCard.classList.remove(
    "projection-source"
  );


  activeProjectionCard.classList.add(
    "projection-returning"
  );


  setTimeout(() => {

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

  }, 120);


  setTimeout(() => {

    activeProjectionCard.classList.add(
      "projection-return-visible"
    );

  }, 420);


  setTimeout(() => {

    document.body.classList.remove(
      "projection-open"
    );


    document.documentElement.style.overflow =
      "";


    document.body.style.overflow =
      "";

  }, 650);


  setTimeout(() => {

    floatingProjectionCard.remove();


    floatingProjectionCard =
      null;


    activeProjectionCard.classList.remove(
      "projection-returning",
      "projection-return-visible"
    );


    activeProjectionCard =
      null;


    projectionClosing =
      false;

  }, 1050);

}


// =========================================================
// INTERCEPT MODULE + BUILD CLICKS
// =========================================================

document.addEventListener(
  "click",
  event => {

    const card =
      event.target.closest(
        ".module-card, .build-card"
      );


    if (!card) {
      return;
    }


    /*
      Capture the click before the old
      script.js workspace handler gets it.
    */

    event.preventDefault();

    event.stopPropagation();

    event.stopImmediatePropagation();


    openUniversalProjection(
      card
    );

  },
  true
);


// =========================================================
// CLOSE BUTTON
// =========================================================

if (closeProjectionButton) {

  closeProjectionButton.addEventListener(
    "click",
    event => {

      event.preventDefault();

      event.stopPropagation();


      closeUniversalProjection();

    }
  );

}


// =========================================================
// ESCAPE
// =========================================================

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      activeProjectionCard
    ) {

      event.preventDefault();

      event.stopPropagation();

      event.stopImmediatePropagation();


      closeUniversalProjection();

    }

  },
  true
);


// =========================================================
// PROJECTOR STATUS
// =========================================================

console.log(
  "TranquilinoOS universal projector online."
);