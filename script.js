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
// LIVE STARTUP TELEMETRY
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
    !startupScreen.classList.contains("hidden")
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
    initializeBtn.querySelector(".button-text");

  const buttonArrow =
    initializeBtn.querySelector(".button-arrow");


  if (buttonText) {
    buttonText.textContent =
      "INITIALIZING";
  }

  if (buttonArrow) {
    buttonArrow.textContent =
      "•••";
  }


  await wait(550);


  if (startupScreen) {
    startupScreen.classList.add(
      "startup-exit"
    );
  }


  await wait(650);


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


  await wait(300);


  for (const row of initRows) {

    const status =
      row.querySelector("strong");


    row.classList.add(
      "init-active"
    );


    if (status) {
      status.textContent =
        "INITIALIZING";
    }


    await wait(260);


    row.classList.add(
      "init-complete"
    );


    if (status) {
      status.textContent =
        "ONLINE";
    }


    await wait(110);
  }


  await wait(420);


  if (initializationScreen) {

    initializationScreen.classList.add(
      "initialization-complete"
    );

  }


  await wait(650);


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
// SYSTEM BUILDS
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
// CORE MODULE RENDERING
// =========================================================

function openModule(name, card) {

  const module =
    modules[name];


  if (
    !module ||
    !moduleWorkspace ||
    !workspaceLabel ||
    !workspaceTitle ||
    !workspaceContent
  ) {
    return;
  }


  moduleCards.forEach(item => {
    item.classList.remove(
      "module-active"
    );
  });


  if (card) {
    card.classList.add(
      "module-active"
    );
  }


  workspaceLabel.textContent =
    module.label;

  workspaceTitle.textContent =
    module.title;

  workspaceContent.innerHTML =
    module.content;


  moduleWorkspace.classList.remove(
    "hidden"
  );


  restartAnimation(
    moduleWorkspace
  );


  showNotification(
    module.notification,
    module.title
  );


  setTimeout(() => {

    moduleWorkspace.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }, 80);

}


// =========================================================
// CORE MODULE EVENTS
// =========================================================

moduleCards.forEach(card => {

  card.addEventListener(
    "click",
    () => {

      openModule(
        card.dataset.module,
        card
      );

    }
  );

});


if (closeWorkspace) {

  closeWorkspace.addEventListener(
    "click",
    () => {

      moduleWorkspace.classList.add(
        "hidden"
      );


      moduleCards.forEach(card => {

        card.classList.remove(
          "module-active"
        );

      });


      showNotification(
        "MODULE UNMOUNTED",
        "Core workspace closed"
      );

    }
  );

}


// =========================================================
// SYSTEM BUILD RENDERING
// =========================================================

function renderBuild(build) {

  const architectureHTML =
    build.architecture
      .map((item, index) => {

        const arrow =
          index < build.architecture.length - 1
            ? `<span class="flow-arrow">→</span>`
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
          Technical evidence is intentionally limited to
          sanitized diagrams, screenshots, workflow models,
          and non-confidential output. Internal source code,
          credentials, tenant identifiers, internal addresses,
          and proprietary configuration data are excluded.
        </p>

        <div class="evidence-grid">
          ${evidenceHTML}
        </div>

      </div>


    </div>
  `;

}


// =========================================================
// OPEN SYSTEM BUILD
// =========================================================

function openBuild(name, card) {

  const build =
    systemBuilds[name];


  if (
    !build ||
    !buildWorkspace ||
    !buildWorkspaceLabel ||
    !buildWorkspaceTitle ||
    !buildWorkspaceContent
  ) {
    return;
  }


  buildCards.forEach(item => {

    item.classList.remove(
      "build-active"
    );

  });


  if (card) {

    card.classList.add(
      "build-active"
    );

  }


  buildWorkspaceLabel.textContent =
    build.label;

  buildWorkspaceTitle.textContent =
    build.title;

  buildWorkspaceContent.innerHTML =
    renderBuild(build);


  buildWorkspace.classList.remove(
    "hidden"
  );


  restartAnimation(
    buildWorkspace
  );


  showNotification(
    build.notification,
    build.title
  );


  setTimeout(() => {

    buildWorkspace.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }, 80);

}


// =========================================================
// BUILD EVENTS
// =========================================================

buildCards.forEach(card => {

  card.addEventListener(
    "click",
    () => {

      openBuild(
        card.dataset.build,
        card
      );

    }
  );

});


if (closeBuild) {

  closeBuild.addEventListener(
    "click",
    () => {

      buildWorkspace.classList.add(
        "hidden"
      );


      buildCards.forEach(card => {

        card.classList.remove(
          "build-active"
        );

      });


      showNotification(
        "BUILD UNMOUNTED",
        "System build workspace closed"
      );

    }
  );

}


// =========================================================
// RESTART ELEMENT ANIMATION
// =========================================================

function restartAnimation(element) {

  element.classList.remove(
    "workspace-enter"
  );


  void element.offsetWidth;


  element.classList.add(
    "workspace-enter"
  );

}


// =========================================================
// CURSOR LIGHTING
// =========================================================

function addCursorLighting(cards) {

  cards.forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

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
// NOTIFICATION SYSTEM
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
// KEYBOARD COMMAND PLACEHOLDER
// =========================================================

document.addEventListener(
  "keydown",
  event => {

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
        "Command palette reserved for a future build"
      );

    }

  }
);


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
