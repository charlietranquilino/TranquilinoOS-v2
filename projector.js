// =========================================================
// TRANQUILINO OS v2.0
// UNIVERSAL HOLOGRAPHIC PROJECTOR
// FULL REPLACEMENT
// =========================================================


// =========================================================
// DOM REFERENCES
// =========================================================

const projectionBackground =
  document.getElementById(
    "projection-background"
  );

const projectionLayer =
  document.getElementById(
    "projection-layer"
  );

const projectionBeam =
  document.getElementById(
    "projection-beam"
  );

const projectionLabel =
  document.getElementById(
    "projection-label"
  );

const projectionTitle =
  document.getElementById(
    "projection-title"
  );

const projectionStateText =
  document.getElementById(
    "projection-state-text"
  );

const projectionBody =
  document.getElementById(
    "projection-body"
  );

const closeProjectionButton =
  document.getElementById(
    "close-projection"
  );


// =========================================================
// MOVE PROJECTOR DIRECTLY UNDER BODY
//
// Keeps fixed hologram outside transformed main-os.
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
// PROJECTOR STATE
// =========================================================

let activeProjectionCard =
  null;

let floatingProjectionCard =
  null;

let projectionOpening =
  false;

let projectionClosing =
  false;


// =========================================================
// MODULE DATA
// =========================================================

const projectorModules = {

  endpoints: {

    title:
      "Endpoint Systems",

    state:
      "ENDPOINT ONLINE"

  },


  identity: {

    title:
      "Identity + Access",

    state:
      "IDENTITY ONLINE"

  },


  infrastructure: {

    title:
      "Infrastructure",

    state:
      "INFRASTRUCTURE ONLINE"

  },


  automation: {

    title:
      "Automation",

    state:
      "AUTOMATION READY"

  }

};


// =========================================================
// BUILD DATA
// =========================================================

const projectorBuilds = {

  autopilot: {

    title:
      "Windows Autopilot Provisioning System",

    status:
      "ACTIVE DEVELOPMENT",

    objective:
      "Develop a repeatable Windows provisioning workflow that improves device consistency, reduces manual configuration, and supports scalable endpoint deployment.",

    architecture: [
      "Device Registration",
      "Windows Autopilot",
      "Intune Enrollment",
      "Identity",
      "Configuration",
      "Applications",
      "Validation"
    ],

    stack: [
      "Microsoft Intune",
      "Windows Autopilot",
      "Microsoft Entra ID",
      "PowerShell",
      "Windows 11"
    ],

    contribution: [
      "Cloud-driven Windows provisioning workflow",
      "Device registration and enrollment standardization",
      "Configuration and application deployment integration",
      "Repeatable technician deployment process"
    ]

  },


  "endpoint-architecture": {

    title:
      "Endpoint Management Architecture",

    status:
      "ACTIVE DEVELOPMENT",

    objective:
      "Establish centralized endpoint standards for Windows configuration, compliance, security, application delivery, and lifecycle management.",

    architecture: [
      "Enrollment",
      "Device Groups",
      "Configuration",
      "Compliance",
      "Security",
      "Application Delivery",
      "Lifecycle"
    ],

    stack: [
      "Microsoft Intune",
      "Windows",
      "Compliance",
      "Endpoint Security",
      "Company Portal"
    ],

    contribution: [
      "Centralized endpoint administration",
      "Configuration profile standards",
      "Compliance architecture",
      "Application management workflows"
    ]

  },


  "automation-toolkit": {

    title:
      "Endpoint Automation Toolkit",

    status:
      "ACTIVE DEVELOPMENT",

    objective:
      "Create reusable administrative tooling for discovery, provisioning, updates, validation, and endpoint readiness.",

    architecture: [
      "Discovery",
      "Inventory",
      "Validation",
      "Provisioning",
      "Drivers",
      "Updates",
      "Reporting"
    ],

    stack: [
      "PowerShell",
      "Windows",
      "Automation",
      "Intune",
      "System Discovery"
    ],

    contribution: [
      "Reusable PowerShell administration tools",
      "Device health and readiness validation",
      "Driver and update automation",
      "Technician-friendly deployment workflows"
    ]

  },


  "identity-security": {

    title:
      "Identity Security Architecture",

    status:
      "ACTIVE DEVELOPMENT",

    objective:
      "Strengthen identity security using modern authentication, MFA, Conditional Access, device state, and application access controls.",

    architecture: [
      "Identity",
      "Authentication",
      "MFA",
      "Device State",
      "Conditional Access",
      "SSO",
      "Validation"
    ],

    stack: [
      "Microsoft Entra ID",
      "MFA",
      "Conditional Access",
      "SSO",
      "Microsoft 365"
    ],

    contribution: [
      "Modern authentication planning",
      "MFA architecture",
      "Conditional Access design",
      "Application authentication standardization"
    ]

  },


  "infrastructure-standardization": {

    title:
      "Multi-Site Infrastructure Standardization",

    status:
      "ACTIVE DEVELOPMENT",

    objective:
      "Improve consistency, supportability, visibility, and resiliency across distributed business technology and site infrastructure.",

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

    stack: [
      "Networking",
      "SonicWall",
      "Windows Servers",
      "POS Systems",
      "Kiosks",
      "Voice",
      "Cameras"
    ],

    contribution: [
      "Multi-site technology assessment",
      "Firewall and network troubleshooting",
      "Server and endpoint standardization",
      "Business-critical site system support"
    ]

  },


  "application-deployment": {

    title:
      "Managed Application Deployment",

    status:
      "ACTIVE DEVELOPMENT",

    objective:
      "Develop repeatable application packaging, deployment, detection, assignment, and validation workflows for managed Windows endpoints.",

    architecture: [
      "Source",
      "Package",
      "Install Command",
      "Detection",
      "Assignment",
      "Deployment",
      "Validation"
    ],

    stack: [
      "Microsoft Intune",
      "Win32",
      "MSI",
      "EXE Packaging",
      "PowerShell"
    ],

    contribution: [
      "Win32 application packaging",
      "Detection rule design",
      "Deployment troubleshooting",
      "Managed application delivery standards"
    ]

  }

};


// =========================================================
// HEADER
// =========================================================

function setProjectionHeader(
  label,
  title,
  state
) {

  if (projectionLabel) {
    projectionLabel.textContent =
      label;
  }

  if (projectionTitle) {
    projectionTitle.textContent =
      title;
  }

  if (projectionStateText) {
    projectionStateText.textContent =
      state;
  }

}


// =========================================================
// INDEX PROJECTED ELEMENTS
// =========================================================

function indexProjectionPieces() {

  if (!projectionBody) {
    return;
  }

  const pieces =
    projectionBody.querySelectorAll(
      ".projection-piece"
    );

  pieces.forEach(
    (
      piece,
      index
    ) => {

      piece.style.setProperty(
        "--projection-index",
        index
      );

    }
  );

}


// =========================================================
// ENDPOINT SYSTEMS
// =========================================================

function renderEndpointProjection() {

  setProjectionHeader(
    "CORE MODULE // ARCHITECTURE VIEW",
    "Endpoint Systems",
    "ENDPOINT ONLINE"
  );


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
          Centralized endpoint enrollment,
          configuration profiles,
          compliance,
          policy targeting,
          managed applications,
          and device administration.
        </p>

      </article>


      <section
        class="
          endpoint-projection-center
          projection-piece
        "
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
            USER READY
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
          Compliance + Health
        </h3>

        <p>
          Device posture,
          compliance requirements,
          health validation,
          and remediation visibility.
        </p>

      </article>


      <article
        class="projected-block projection-piece"
      >

        <span class="projected-tag">
          APPLICATIONS
        </span>

        <h3>
          Managed Deployment
        </h3>

        <p>
          Win32 packaging,
          detection logic,
          assignments,
          testing,
          and managed software delivery.
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
          Provisioning,
          troubleshooting,
          recovery,
          refresh,
          and reprovisioning.
        </p>

      </article>


      <div
        class="
          endpoint-lifecycle-bar
          projection-piece
        "
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


  indexProjectionPieces();

}


// =========================================================
// IDENTITY + ACCESS
// =========================================================

function renderIdentityProjection() {

  setProjectionHeader(
    "CORE MODULE // ARCHITECTURE VIEW",
    "Identity + Access",
    "IDENTITY ONLINE"
  );


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
          Users,
          groups,
          licensing,
          onboarding,
          access changes,
          administration,
          and offboarding.
        </p>

      </article>


      <section
        class="
          identity-projection-core
          projection-piece
        "
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
          MFA
        </h3>

        <p>
          Authentication security,
          registration,
          recovery,
          troubleshooting,
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
          Identity and device-aware access
          decisions across cloud resources.
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
          Centralized authentication across
          supported business applications
          and Microsoft 365.
        </p>

      </article>


    </div>

  `;


  indexProjectionPieces();

}


// =========================================================
// INFRASTRUCTURE
// =========================================================

function renderInfrastructureProjection() {

  setProjectionHeader(
    "CORE MODULE // ARCHITECTURE VIEW",
    "Infrastructure",
    "INFRASTRUCTURE ONLINE"
  );


  projectionBody.innerHTML = `

    <div class="infrastructure-projection-layout">


      <article
        class="projected-block projection-piece"
      >

        <span class="projected-tag">
          COMPUTE
        </span>

        <h3>
          Servers
        </h3>

        <p>
          Physical infrastructure,
          lifecycle,
          resiliency,
          backup,
          recovery,
          and operational support.
        </p>

      </article>


      <section
        class="
          infrastructure-network-map
          projection-piece
        "
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
            SERVERS
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
          Site connectivity,
          firewall dependencies,
          device communication,
          and network troubleshooting.
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
          Business-critical systems,
          specialized workstation profiles,
          connectivity,
          and operational readiness.
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
          tablets,
          camera systems,
          voice systems,
          and remote administration.
        </p>

      </article>


    </div>

  `;


  indexProjectionPieces();

}


// =========================================================
// AUTOMATION
// =========================================================

function renderAutomationProjection() {

  setProjectionHeader(
    "CORE MODULE // ARCHITECTURE VIEW",
    "Automation",
    "AUTOMATION READY"
  );


  projectionBody.innerHTML = `

    <div class="automation-projection-layout">


      <section
        class="
          automation-projection-pipeline
          projection-piece
        "
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
            Administrative automation,
            discovery,
            validation,
            and endpoint tooling.
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
            enrollment,
            drivers,
            configuration,
            and readiness validation.
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
            Converting manual administrative work
            into reusable tools,
            processes,
            and standardized workflows.
          </p>

        </article>


      </section>


    </div>

  `;


  indexProjectionPieces();

}


// =========================================================
// BUILD PROJECTION
// =========================================================

function renderBuildProjection(
  buildName
) {

  const build =
    projectorBuilds[
      buildName
    ];


  if (!build) {

    return false;

  }


  setProjectionHeader(
    "SYSTEM BUILD // PROJECT ARCHITECTURE",
    build.title,
    "BUILD ONLINE"
  );


  const architectureHTML =
    build.architecture
      .map(
        (
          item,
          index
        ) => `

          <div class="build-architecture-node">

            <span>
              ${
                String(
                  index + 1
                ).padStart(
                  2,
                  "0"
                )
              }
            </span>

            <strong>
              ${item}
            </strong>

          </div>

        `
      )
      .join("");


  const stackHTML =
    build.stack
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
        class="
          build-projection-objective
          projection-piece
        "
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
        class="
          build-projection-architecture
          projection-piece
        "
      >

        <span class="projected-tag">
          SYSTEM ARCHITECTURE
        </span>

        ${architectureHTML}

      </section>


      <section class="build-projection-side">


        <div
          class="
            build-projection-stack
            projection-piece
          "
        >

          <span class="projected-tag">
            TECHNOLOGY STACK
          </span>

          <div class="build-tech-stack">

            ${stackHTML}

          </div>

        </div>


        <div
          class="
            build-projection-contribution
            projection-piece
          "
        >

          <span class="projected-tag">
            ENGINEERING CONTRIBUTION
          </span>

          <ul class="build-contribution-list">

            ${contributionHTML}

          </ul>

        </div>


      </section>


    </div>

  `;


  indexProjectionPieces();

  return true;

}


// =========================================================
// MODULE ROUTER
// =========================================================

function renderModuleProjection(
  moduleName
) {

  switch (moduleName) {

    case "endpoints":

      renderEndpointProjection();

      return true;


    case "identity":

      renderIdentityProjection();

      return true;


    case "infrastructure":

      renderInfrastructureProjection();

      return true;


    case "automation":

      renderAutomationProjection();

      return true;


    default:

      return false;

  }

}


// =========================================================
// POSITION PROJECTOR BEAM
// =========================================================

function positionProjectionBeam() {

  if (!projectionBeam) {

    return;

  }


  const mobile =
    window.innerWidth <= 700;


  projectionBeam.style.bottom =
    mobile
      ? "102px"
      : "118px";

}


// =========================================================
// CREATE PHYSICAL PROJECTOR
// =========================================================

function createFloatingProjector(
  sourceCard,
  title
) {

  const rect =
    sourceCard.getBoundingClientRect();


  floatingProjectionCard =
    sourceCard.cloneNode(
      true
    );


  floatingProjectionCard.removeAttribute(
    "id"
  );


  // Strip original card styling.
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


  floatingProjectionCard.setAttribute(
    "aria-hidden",
    "true"
  );


  floatingProjectionCard.style.left =
    `${rect.left}px`;


  floatingProjectionCard.style.top =
    `${rect.top}px`;


  floatingProjectionCard.style.width =
    `${rect.width}px`;


  floatingProjectionCard.style.height =
    `${rect.height}px`;


  floatingProjectionCard.innerHTML = `

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


  sourceCard.classList.add(
    "projection-source"
  );


  // Force initial card position to paint.
  void floatingProjectionCard.offsetWidth;


  moveProjectorToDock();

}


// =========================================================
// MOVE PROJECTOR TO BOTTOM CENTER
// =========================================================

function moveProjectorToDock() {

  if (!floatingProjectionCard) {

    return;

  }


  const mobile =
    window.innerWidth <= 700;


  const width =
    mobile
      ? Math.min(
          335,
          window.innerWidth * 0.84
        )
      : Math.min(
          410,
          window.innerWidth * 0.72
        );


  const height =
    mobile
      ? 104
      : 118;


  const left =
    (
      window.innerWidth -
      width
    ) /
    2;


  const top =
    window.innerHeight -
    height -
    4;


  floatingProjectionCard.style.left =
    `${left}px`;


  floatingProjectionCard.style.top =
    `${top}px`;


  floatingProjectionCard.style.width =
    `${width}px`;


  floatingProjectionCard.style.height =
    `${height}px`;


  positionProjectionBeam();

}


// =========================================================
// OPEN PROJECTION
// =========================================================

function openProjection(
  card
) {

  if (
    activeProjectionCard ||
    projectionOpening ||
    projectionClosing
  ) {

    return;

  }


  if (
    !projectionLayer ||
    !projectionBody
  ) {

    console.error(
      "Projection DOM missing."
    );

    return;

  }


  let rendered =
    false;

  let projectedTitle =
    "SYSTEM";


  const type =
    card.dataset.projection;


  // =======================================================
  // MODULE
  // =======================================================

  if (
    type === "module"
  ) {

    const moduleName =
      card.dataset.module;


    const module =
      projectorModules[
        moduleName
      ];


    if (!module) {

      return;

    }


    projectedTitle =
      module.title;


    rendered =
      renderModuleProjection(
        moduleName
      );

  }


  // =======================================================
  // BUILD
  // =======================================================

  else if (
    type === "build"
  ) {

    const buildName =
      card.dataset.build;


    const build =
      projectorBuilds[
        buildName
      ];


    if (!build) {

      return;

    }


    projectedTitle =
      build.title;


    rendered =
      renderBuildProjection(
        buildName
      );

  }


  if (!rendered) {

    return;

  }


  projectionOpening =
    true;


  activeProjectionCard =
    card;


  projectionBody.scrollTop =
    0;


  document.documentElement.style.overflow =
    "hidden";


  document.body.style.overflow =
    "hidden";


  document.body.classList.add(
    "projection-open"
  );


  createFloatingProjector(
    card,
    projectedTitle
  );


  // =======================================================
  // PHASE 1
  // CARD ARRIVES AT PROJECTOR
  // =======================================================

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
    850
  );


  // =======================================================
  // PHASE 2
  // PROJECTOR POWERS ON
  // =======================================================

  setTimeout(
    () => {

      if (!floatingProjectionCard) {

        return;

      }


      floatingProjectionCard.classList.add(
        "projection-projecting"
      );

    },
    1050
  );


  // =======================================================
  // PHASE 3
  // HOLOGRAM OPENS
  // =======================================================

  setTimeout(
    () => {

      projectionLayer.classList.add(
        "projection-active"
      );


      projectionLayer.setAttribute(
        "aria-hidden",
        "false"
      );


      projectionOpening =
        false;

    },
    1280
  );


  // =======================================================
  // PHASE 4
  // HARDWARE FADES AWAY
  // =======================================================

  setTimeout(
    () => {

      if (
        floatingProjectionCard &&
        activeProjectionCard
      ) {

        floatingProjectionCard.classList.add(
          "projector-faded"
        );

      }

    },
    2450
  );

}


// =========================================================
// CLOSE PROJECTION
// =========================================================

function closeProjection() {

  if (
    !activeProjectionCard ||
    projectionClosing
  ) {

    return;

  }


  projectionClosing =
    true;


  projectionOpening =
    false;


  // =======================================================
  // COLLAPSE HOLOGRAM
  // =======================================================

  if (projectionLayer) {

    projectionLayer.classList.remove(
      "projection-active"
    );


    projectionLayer.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  // =======================================================
  // RESTORE PROJECTOR HARDWARE
  // =======================================================

  if (floatingProjectionCard) {

    floatingProjectionCard.classList.remove(
      "projector-faded",
      "projection-projecting"
    );


    floatingProjectionCard.classList.add(
      "return-dissolve"
    );

  }


  // =======================================================
  // PREP ORIGINAL CARD
  // =======================================================

  activeProjectionCard.classList.remove(
    "projection-source"
  );


  activeProjectionCard.classList.add(
    "projection-returning"
  );


  // =======================================================
  // SEND PROJECTOR BACK
  // =======================================================

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


  // =======================================================
  // ORIGINAL CARD RETURNS
  // =======================================================

  setTimeout(
    () => {

      if (!activeProjectionCard) {

        return;

      }


      activeProjectionCard.classList.add(
        "projection-return-visible"
      );

    },
    410
  );


  // =======================================================
  // UNLOCK PAGE
  // =======================================================

  setTimeout(
    () => {

      document.body.classList.remove(
        "projection-open"
      );


      document.documentElement.style.overflow =
        "";


      document.body.style.overflow =
        "";

    },
    650
  );


  // =======================================================
  // CLEANUP
  // =======================================================

  setTimeout(
    () => {

      if (floatingProjectionCard) {

        floatingProjectionCard.remove();

      }


      floatingProjectionCard =
        null;


      if (activeProjectionCard) {

        activeProjectionCard.classList.remove(
          "projection-returning",
          "projection-return-visible"
        );

      }


      activeProjectionCard =
        null;


      projectionClosing =
        false;


      if (projectionBody) {

        projectionBody.scrollTop =
          0;

      }

    },
    1000
  );

}


// =========================================================
// PROJECT CARD CLICKS
//
// Capture mode prevents other card click handlers
// from interfering with projector behavior.
// =========================================================

document.addEventListener(
  "click",
  event => {

    const card =
      event.target.closest(
        '[data-projection="module"], [data-projection="build"]'
      );


    if (!card) {

      return;

    }


    event.preventDefault();

    event.stopPropagation();

    event.stopImmediatePropagation();


    openProjection(
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

      event.stopImmediatePropagation();


      closeProjection();

    },
    true
  );

}


// =========================================================
// ESCAPE KEY
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


      closeProjection();

    }

  },
  true
);


// =========================================================
// PROJECTED BODY INTERACTION
// =========================================================

if (projectionBody) {

  projectionBody.addEventListener(
    "click",
    event => {

      event.stopPropagation();

    }
  );


  projectionBody.addEventListener(
    "wheel",
    event => {

      event.stopPropagation();

    },
    {
      passive: true
    }
  );


  projectionBody.addEventListener(
    "touchstart",
    event => {

      event.stopPropagation();

    },
    {
      passive: true
    }
  );


  projectionBody.addEventListener(
    "touchmove",
    event => {

      event.stopPropagation();

    },
    {
      passive: true
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


    moveProjectorToDock();

  }
);


// =========================================================
// READY
// =========================================================

console.log(
  "%c HOLOGRAPHIC PROJECTOR ONLINE ",
  [
    "background:#050505",
    "color:#ffe8a3",
    "padding:8px 12px",
    "border:1px solid rgba(215,168,61,.45)"
  ].join(";")
);


console.log(
  "Module projection ready."
);


console.log(
  "Build projection ready."
);


console.log(
  "Physical projector dock ready."
);
