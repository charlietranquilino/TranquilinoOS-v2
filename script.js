// =========================================================
// TRANQUILINO OS v2.0
// MAIN SYSTEM CONTROLLER
// DYNAMIC PARALLEL INITIALIZATION ENGINE
// FULL REPLACEMENT
// =========================================================


// =========================================================
// DOM REFERENCES
// =========================================================

const startupScreen =
  document.getElementById(
    "startup-screen"
  );

const initializationScreen =
  document.getElementById(
    "initialization-screen"
  );

const mainOS =
  document.getElementById(
    "main-os"
  );

const initializeButton =
  document.getElementById(
    "initialize-btn"
  );

const telemetryCPU =
  document.getElementById(
    "telemetry-cpu"
  );

const telemetryMemory =
  document.getElementById(
    "telemetry-memory"
  );


// =========================================================
// STATE
// =========================================================

let initializationRunning =
  false;

let initializationComplete =
  false;

let headerActivityTimer =
  null;

let signalActivityTimer =
  null;


// =========================================================
// HELPERS
// =========================================================

function wait(ms) {

  return new Promise(
    resolve =>
      setTimeout(
        resolve,
        ms
      )
  );

}


function clamp(
  value,
  min,
  max
) {

  return Math.min(
    Math.max(
      value,
      min
    ),
    max
  );

}


function randomBetween(
  min,
  max
) {

  return Math.floor(
    Math.random() *
    (
      max -
      min +
      1
    )
  ) + min;

}


// =========================================================
// STARTUP TELEMETRY
// =========================================================

function updateStartupTelemetry() {

  if (telemetryCPU) {

    telemetryCPU.textContent =
      `${randomBetween(
        14,
        31
      )}%`;

  }

  if (telemetryMemory) {

    telemetryMemory.textContent =
      `${randomBetween(
        38,
        52
      )}%`;

  }

}


updateStartupTelemetry();


setInterval(
  () => {

    if (
      startupScreen &&
      !startupScreen.classList.contains(
        "hidden"
      )
    ) {

      updateStartupTelemetry();

    }

  },
  1500
);


// =========================================================
// BUILD SERVICE OBJECTS
// =========================================================

function getInitializationServices() {

  if (!initializationScreen) {

    return [];

  }


  const rows =
    Array.from(
      initializationScreen.querySelectorAll(
        ".initialization-status .init-row"
      )
    );


  const keys = [
    "endpoint",
    "identity",
    "infrastructure",
    "automation",
    "security",
    "build-index"
  ];


  return rows.map(
    (
      row,
      index
    ) => {

      return {

        key:
          keys[index] ||
          `service-${index}`,

        row,

        bar:
          row.querySelector(
            ".init-progress-bar"
          ),

        status:
          row.querySelector(
            ":scope > strong"
          ),

        progress:
          0,

        speed:
          0,

        targetSpeed:
          0,

        active:
          false,

        complete:
          false,

        phase:
          "STANDBY"

      };

    }
  );

}


// =========================================================
// RESET
// =========================================================

function resetInitialization(
  services
) {

  services.forEach(
    service => {

      service.progress =
        0;

      service.speed =
        0;

      service.targetSpeed =
        0;

      service.active =
        false;

      service.complete =
        false;

      service.phase =
        "STANDBY";


      service.row.classList.remove(
        "init-active",
        "init-verifying",
        "init-complete"
      );


      if (service.bar) {

        service.bar.style.width =
          "0%";

      }


      if (service.status) {

        service.status.textContent =
          "0% STANDBY";

      }

    }
  );


  const overallPercent =
    document.getElementById(
      "init-overall-percent"
    );

  const overallBar =
    document.getElementById(
      "init-overall-bar"
    );

  const eta =
    document.getElementById(
      "init-eta"
    );

  const message =
    document.getElementById(
      "init-transfer-message"
    );


  if (overallPercent) {

    overallPercent.textContent =
      "0%";

  }


  if (overallBar) {

    overallBar.style.width =
      "0%";

  }


  if (eta) {

    eta.textContent =
      "00:06";

  }


  if (message) {

    message.textContent =
      "Preparing parallel transfer queue...";

  }


  initializationScreen.classList.remove(
    "initialization-complete"
  );

}


// =========================================================
// SERVICE PHASE
// =========================================================

function getServicePhase(
  progress
) {

  if (progress <= 0) {

    return {
      name: "STANDBY",
      className: ""
    };

  }


  if (progress < 10) {

    return {
      name: "QUEUED",
      className: "init-active"
    };

  }


  if (progress < 55) {

    return {
      name: "TRANSFERRING",
      className: "init-active"
    };

  }


  if (progress < 78) {

    return {
      name: "MOUNTING",
      className: "init-active"
    };

  }


  if (progress < 95) {

    return {
      name: "VALIDATING",
      className: "init-verifying"
    };

  }


  if (progress < 100) {

    return {
      name: "VERIFYING",
      className: "init-verifying"
    };

  }


  return {
    name: "ONLINE",
    className: "init-complete"
  };

}


// =========================================================
// ACTIVATE INITIAL SERVICES
//
// Starts multiple services almost immediately.
// =========================================================

function activateInitialServices(
  services
) {

  services.forEach(
    (
      service,
      index
    ) => {

      if (index < 3) {

        service.active =
          true;

        service.targetSpeed =
          randomBetween(
            11,
            20
          );

      }

    }
  );

}


// =========================================================
// DYNAMIC PRIORITY SHUFFLE
//
// This is the important part.
//
// Every cycle:
//
// - active services receive different target speeds
// - fastest service changes
// - slower service can suddenly become priority
// - standby services join as capacity opens
// =========================================================

function reshuffleServicePriorities(
  services
) {

  const unfinished =
    services.filter(
      service =>
        !service.complete
    );


  if (!unfinished.length) {

    return;

  }


  const active =
    unfinished.filter(
      service =>
        service.active
    );


  const standby =
    unfinished.filter(
      service =>
        !service.active
    );


  // Keep roughly 3-4 transfers alive simultaneously.

  const desiredActive =
    Math.min(
      unfinished.length,
      randomBetween(
        3,
        4
      )
    );


  while (
    active.length <
      desiredActive &&
    standby.length
  ) {

    const next =
      standby.shift();


    next.active =
      true;


    active.push(
      next
    );

  }


  // Pick one active transfer to be the temporary leader.

  const leader =
    active[
      randomBetween(
        0,
        active.length - 1
      )
    ];


  active.forEach(
    service => {

      if (
        service === leader
      ) {

        service.targetSpeed =
          randomBetween(
            24,
            34
          );

      }

      else {

        service.targetSpeed =
          randomBetween(
            8,
            23
          );

      }

    }
  );


  // Occasionally throttle one service heavily,
  // making the visual priority visibly switch.

  if (
    active.length >= 3 &&
    Math.random() < 0.55
  ) {

    const throttled =
      active[
        randomBetween(
          0,
          active.length - 1
        )
      ];


    if (
      throttled !== leader
    ) {

      throttled.targetSpeed =
        randomBetween(
          3,
          8
        );

    }

  }

}


// =========================================================
// UPDATE SERVICE UI
// =========================================================

function updateServiceUI(
  service
) {

  const phase =
    getServicePhase(
      service.progress
    );


  service.phase =
    phase.name;


  service.row.classList.remove(
    "init-active",
    "init-verifying",
    "init-complete"
  );


  if (phase.className) {

    service.row.classList.add(
      phase.className
    );

  }


  if (service.bar) {

    service.bar.style.width =
      `${service.progress}%`;

  }


  if (service.status) {

    service.status.textContent =
      service.progress >= 100
        ? "100% ONLINE"
        : `${Math.floor(
            service.progress
          )}% ${phase.name}`;

  }

}


// =========================================================
// SMOOTH SIDE SIGNALS
//
// Instead of snapping wildly,
// heights smoothly transition toward new targets.
// =========================================================

function startSmoothSideSignals() {

  const bars =
    Array.from(
      document.querySelectorAll(
        ".init-side-signal span"
      )
    );


  if (!bars.length) {

    return;

  }


  bars.forEach(
    bar => {

      bar.dataset.signalHeight =
        randomBetween(
          25,
          75
        );

      bar.style.transition =
        "height 0.55s ease, opacity 0.55s ease";

    }
  );


  signalActivityTimer =
    setInterval(
      () => {

        bars.forEach(
          bar => {

            const current =
              Number(
                bar.dataset.signalHeight ||
                50
              );


            const change =
              randomBetween(
                -22,
                22
              );


            const next =
              clamp(
                current +
                change,
                18,
                90
              );


            bar.dataset.signalHeight =
              next;


            bar.style.height =
              `${next}%`;


            bar.style.opacity =
              (
                0.45 +
                next / 200
              );

          }
        );

      },
      650
    );

}


// =========================================================
// HEADER ACTIVITY
// =========================================================

function startHeaderActivity() {

  const state =
    document.querySelector(
      ".init-header-center strong"
    );


  const label =
    document.querySelector(
      ".init-header-center span:not(.init-header-pulse)"
    );


  if (!state) {

    return;

  }


  const states = [
    [
      "DEPLOYMENT ENGINE",
      "LIVE TRANSFER"
    ],
    [
      "SYSTEM BUS",
      "THREAD SYNC"
    ],
    [
      "TRANSFER ENGINE",
      "PARALLEL I/O"
    ],
    [
      "SERVICE CONTROL",
      "MOUNT SEQUENCE"
    ],
    [
      "VALIDATION CORE",
      "DEPLOYMENT ACTIVE"
    ]
  ];


  let index =
    0;


  headerActivityTimer =
    setInterval(
      () => {

        index =
          (
            index +
            1
          ) %
          states.length;


        if (label) {

          label.textContent =
            states[index][0];

        }


        state.textContent =
          states[index][1];

      },
      850
    );

}


// =========================================================
// DEPLOYMENT SIDE PANEL
// =========================================================

function updateDeploymentSidePanel(
  services
) {

  const rows =
    Array.from(
      document.querySelectorAll(
        ".init-side-right .init-side-row"
      )
    );


  const map = [
    services[0],
    services[1],
    services[4],
    services[3]
  ];


  rows.forEach(
    (
      row,
      index
    ) => {

      const service =
        map[index];


      const strong =
        row.querySelector(
          "strong"
        );


      if (
        !service ||
        !strong
      ) {

        return;

      }


      if (
        service.progress <= 0
      ) {

        strong.textContent =
          "STANDBY";

      }

      else if (
        service.progress < 55
      ) {

        strong.textContent =
          "TRANSFER";

      }

      else if (
        service.progress < 78
      ) {

        strong.textContent =
          "MOUNT";

      }

      else if (
        service.progress < 100
      ) {

        strong.textContent =
          "VERIFY";

      }

      else {

        strong.textContent =
          "ONLINE";

      }

    }
  );

}


// =========================================================
// UPDATE SUMMARY
// =========================================================

function updateSummary(
  services,
  elapsed,
  expectedDuration
) {

  const overallPercent =
    document.getElementById(
      "init-overall-percent"
    );

  const overallBar =
    document.getElementById(
      "init-overall-bar"
    );

  const eta =
    document.getElementById(
      "init-eta"
    );

  const message =
    document.getElementById(
      "init-transfer-message"
    );


  const total =
    services.reduce(
      (
        sum,
        service
      ) =>
        sum +
        service.progress,
      0
    );


  const overall =
    Math.round(
      total /
      services.length
    );


  const active =
    services.filter(
      service =>
        service.active &&
        !service.complete
    ).length;


  const online =
    services.filter(
      service =>
        service.complete
    ).length;


  if (overallPercent) {

    overallPercent.textContent =
      `${overall}%`;

  }


  if (overallBar) {

    overallBar.style.width =
      `${overall}%`;

  }


  const remaining =
    Math.max(
      0,
      Math.ceil(
        (
          expectedDuration -
          elapsed
        ) /
        1000
      )
    );


  if (eta) {

    eta.textContent =
      `00:${String(
        remaining
      ).padStart(
        2,
        "0"
      )}`;

  }


  if (message) {

    if (
      online ===
      services.length
    ) {

      message.textContent =
        "ALL SERVICES VERIFIED // ENVIRONMENT ONLINE";

    }

    else {

      const leader =
        services
          .filter(
            service =>
              service.active &&
              !service.complete
          )
          .sort(
            (
              a,
              b
            ) =>
              b.speed -
              a.speed
          )[0];


      if (leader) {

        message.textContent =
          `${active} PARALLEL THREADS // PRIORITY ${leader.key.toUpperCase()}`;

      }

    }

  }


  updateDeploymentSidePanel(
    services
  );

}


// =========================================================
// DYNAMIC PARALLEL ENGINE
//
// ALL SIX SERVICES PARTICIPATE EARLY.
// SPEED PRIORITY ROTATES DURING THE TRANSFER.
// =========================================================

function runDynamicInitialization(
  services
) {

  return new Promise(
    resolve => {

      if (!services.length) {

        resolve();

        return;

      }


      const startTime =
        performance.now();


      let lastFrame =
        startTime;


      let lastPriorityChange =
        startTime;


      let priorityInterval =
        700;


      // ---------------------------------------------------
      // START EVERY SERVICE.
      //
      // They begin at different speeds instead of waiting
      // for earlier services to finish.
      // ---------------------------------------------------

      services.forEach(
        (
          service,
          index
        ) => {

          service.active =
            true;


          service.complete =
            false;


          // Slight initial staggering in progress,
          // but every service is active immediately.

          service.progress =
            Math.max(
              0,
              4 -
              index * 0.65
            );


          service.speed =
            0;


          service.targetSpeed =
            randomBetween(
              5,
              15
            );


          updateServiceUI(
            service
          );

        }
      );


      // Give the first few services an initial advantage,
      // without putting Security / Build Index to sleep.

      if (services[0]) {
        services[0].targetSpeed = 22;
      }

      if (services[1]) {
        services[1].targetSpeed = 18;
      }

      if (services[2]) {
        services[2].targetSpeed = 14;
      }

      if (services[3]) {
        services[3].targetSpeed = 11;
      }

      if (services[4]) {
        services[4].targetSpeed = 8;
      }

      if (services[5]) {
        services[5].targetSpeed = 6;
      }


      function changePriorities() {

        const unfinished =
          services.filter(
            service =>
              !service.complete
          );


        if (!unfinished.length) {

          return;

        }


        // -----------------------------------------------
        // EVERY SERVICE REMAINS MOVING.
        // -----------------------------------------------

        unfinished.forEach(
          service => {

            service.active =
              true;


            service.targetSpeed =
              randomBetween(
                7,
                17
              );

          }
        );


        // -----------------------------------------------
        // PICK A NEW FASTEST TRANSFER.
        // -----------------------------------------------

        const leader =
          unfinished[
            randomBetween(
              0,
              unfinished.length - 1
            )
          ];


        leader.targetSpeed =
          randomBetween(
            24,
            34
          );


        // -----------------------------------------------
        // PICK A SECOND HIGH-PRIORITY SERVICE.
        // -----------------------------------------------

        if (
          unfinished.length >
          1
        ) {

          let secondary =
            leader;


          while (
            secondary === leader
          ) {

            secondary =
              unfinished[
                randomBetween(
                  0,
                  unfinished.length - 1
                )
              ];

          }


          secondary.targetSpeed =
            randomBetween(
              18,
              25
            );

        }


        // -----------------------------------------------
        // ONE SERVICE MAY TEMPORARILY SLOW,
        // BUT NEVER STOPS.
        // -----------------------------------------------

        if (
          unfinished.length >
          2
        ) {

          const slowed =
            unfinished[
              randomBetween(
                0,
                unfinished.length - 1
              )
            ];


          if (
            slowed !== leader
          ) {

            slowed.targetSpeed =
              randomBetween(
                4,
                9
              );

          }

        }


        priorityInterval =
          randomBetween(
            620,
            900
          );

      }


      function frame(now) {

        const delta =
          Math.min(
            (
              now -
              lastFrame
            ) /
            1000,
            0.05
          );


        lastFrame =
          now;


        // -----------------------------------------------
        // PERIODIC SPEED / PRIORITY ROTATION
        // -----------------------------------------------

        if (
          now -
          lastPriorityChange >=
          priorityInterval
        ) {

          changePriorities();


          lastPriorityChange =
            now;

        }


        // -----------------------------------------------
        // UPDATE ALL SIX TRANSFERS
        // -----------------------------------------------

        services.forEach(
          service => {

            if (
              service.complete
            ) {

              return;

            }


            // Smooth acceleration/deceleration.
            // Prevents bars from jerking between speeds.

            const smoothing =
              1 -
              Math.exp(
                -3.5 *
                delta
              );


            service.speed +=
              (
                service.targetSpeed -
                service.speed
              ) *
              smoothing;


            let actualSpeed =
              service.speed;


            // -------------------------------------------
            // VALIDATION SLOWDOWN
            // -------------------------------------------

            if (
              service.progress >= 88
            ) {

              actualSpeed *=
                0.58;

            }


            if (
              service.progress >= 96
            ) {

              actualSpeed =
                Math.min(
                  actualSpeed,
                  5
                );

            }


            service.progress +=
              actualSpeed *
              delta;


            // -------------------------------------------
            // COMPLETE
            // -------------------------------------------

            if (
              service.progress >= 100
            ) {

              service.progress =
                100;


              service.complete =
                true;


              service.active =
                false;


              service.speed =
                0;


              service.targetSpeed =
                0;

            }


            updateServiceUI(
              service
            );

          }
        );


        // -----------------------------------------------
        // SUMMARY / ETA
        // -----------------------------------------------

        const elapsed =
          now -
          startTime;


        const totalProgress =
          services.reduce(
            (
              total,
              service
            ) =>
              total +
              service.progress,
            0
          );


        const overall =
          totalProgress /
          services.length;


        // Dynamic ETA based on remaining progress instead
        // of the old fixed sequence timing.

        const unfinished =
          services.filter(
            service =>
              !service.complete
          );


        const remainingProgress =
          unfinished.reduce(
            (
              total,
              service
            ) =>
              total +
              (
                100 -
                service.progress
              ),
            0
          );


        const currentRate =
          unfinished.reduce(
            (
              total,
              service
            ) =>
              total +
              Math.max(
                service.speed,
                1
              ),
            0
          );


        const estimatedSeconds =
          currentRate > 0
            ? Math.ceil(
                remainingProgress /
                currentRate
              )
            : 0;


        const overallPercent =
          document.getElementById(
            "init-overall-percent"
          );


        const overallBar =
          document.getElementById(
            "init-overall-bar"
          );


        const eta =
          document.getElementById(
            "init-eta"
          );


        const message =
          document.getElementById(
            "init-transfer-message"
          );


        if (overallPercent) {

          overallPercent.textContent =
            `${Math.round(
              overall
            )}%`;

        }


        if (overallBar) {

          overallBar.style.width =
            `${overall}%`;

        }


        if (eta) {

          eta.textContent =
            `00:${
              String(
                Math.min(
                  estimatedSeconds,
                  99
                )
              ).padStart(
                2,
                "0"
              )
            }`;

        }


        updateDeploymentSidePanel(
          services
        );


        if (message) {

          const moving =
            unfinished
              .slice()
              .sort(
                (
                  a,
                  b
                ) =>
                  b.speed -
                  a.speed
              );


          const leader =
            moving[0];


          const secondary =
            moving[1];


          if (
            unfinished.length ===
            0
          ) {

            message.textContent =
              "ALL SERVICES VERIFIED // ENVIRONMENT ONLINE";

          }


          else if (
            leader &&
            secondary
          ) {

            message.textContent =
              `${
                unfinished.length
              } ACTIVE THREADS // PRIORITY ${
                leader.key.toUpperCase()
              } + ${
                secondary.key.toUpperCase()
              }`;

          }

        }


        // -----------------------------------------------
        // FINISHED?
        // -----------------------------------------------

        if (
          services.every(
            service =>
              service.complete
          )
        ) {

          if (overallPercent) {

            overallPercent.textContent =
              "100%";

          }


          if (overallBar) {

            overallBar.style.width =
              "100%";

          }


          if (eta) {

            eta.textContent =
              "00:00";

          }


          resolve();

          return;

        }


        requestAnimationFrame(
          frame
        );

      }


      requestAnimationFrame(
        frame
      );

    }
  );

}


// =========================================================
// STOP ACTIVITY
// =========================================================

function stopInitializationActivity() {

  if (headerActivityTimer) {

    clearInterval(
      headerActivityTimer
    );

    headerActivityTimer =
      null;

  }


  if (signalActivityTimer) {

    clearInterval(
      signalActivityTimer
    );

    signalActivityTimer =
      null;

  }

}


// =========================================================
// INITIALIZE ENVIRONMENT
// =========================================================

async function initializeEnvironment() {

  if (
    initializationRunning ||
    initializationComplete
  ) {

    return;

  }


  if (
    !startupScreen ||
    !initializationScreen ||
    !mainOS
  ) {

    return;

  }


  initializationRunning =
    true;


  if (initializeButton) {

    initializeButton.disabled =
      true;


    const text =
      initializeButton.querySelector(
        ".button-text"
      );


    const arrow =
      initializeButton.querySelector(
        ".button-arrow"
      );


    if (text) {

      text.textContent =
        "INITIALIZING";

    }


    if (arrow) {

      arrow.textContent =
        "•••";

    }

  }


  await wait(
    80
  );


  startupScreen.classList.add(
    "startup-exit"
  );


  await wait(
    330
  );


  startupScreen.classList.add(
    "hidden"
  );


  initializationScreen.classList.remove(
    "hidden",
    "initialization-exit"
  );


  initializationScreen.classList.add(
    "initialization-enter"
  );


  const services =
    getInitializationServices();


  resetInitialization(
    services
  );


  startHeaderActivity();

  startSmoothSideSignals();


  await wait(
    180
  );


  await runDynamicInitialization(
    services
  );


  stopInitializationActivity();


  initializationScreen.classList.add(
    "initialization-complete"
  );


  const state =
    document.querySelector(
      ".init-header-center strong"
    );


  const label =
    document.querySelector(
      ".init-header-center span:not(.init-header-pulse)"
    );


  if (state) {

    state.textContent =
      "SYSTEM ONLINE";

  }


  if (label) {

    label.textContent =
      "DEPLOYMENT COMPLETE";

  }


  const eta =
    document.getElementById(
      "init-eta"
    );


  if (eta) {

    eta.textContent =
      "00:00";

  }


  await wait(
    450
  );


  initializationScreen.classList.add(
    "initialization-exit"
  );


  await wait(
    330
  );


  initializationScreen.classList.add(
    "hidden"
  );


  initializationScreen.classList.remove(
    "initialization-enter",
    "initialization-exit"
  );


  mainOS.classList.remove(
    "hidden"
  );


  mainOS.classList.add(
    "os-enter"
  );


  document.documentElement.style.overflow =
    "";


  document.body.style.overflow =
    "";


  initializationRunning =
    false;


  initializationComplete =
    true;


  showNotification(
    "SYSTEM ONLINE",
    "TranquilinoOS environment initialized"
  );

}


// =========================================================
// INITIALIZE BUTTON
// =========================================================

if (initializeButton) {

  initializeButton.addEventListener(
    "click",
    initializeEnvironment
  );

}


// =========================================================
// CARD LIGHT TRACKING
// =========================================================

document
  .querySelectorAll(
    ".module-card, .build-card"
  )
  .forEach(
    card => {

      card.addEventListener(
        "pointermove",
        event => {

          const rect =
            card.getBoundingClientRect();


          card.style.setProperty(
            "--mouse-x",
            `${
              event.clientX -
              rect.left
            }px`
          );


          card.style.setProperty(
            "--mouse-y",
            `${
              event.clientY -
              rect.top
            }px`
          );

        }
      );


      card.addEventListener(
        "pointerleave",
        () => {

          card.style.setProperty(
            "--mouse-x",
            "50%"
          );


          card.style.setProperty(
            "--mouse-y",
            "50%"
          );

        }
      );

    }
  );


// =========================================================
// SECTION REVEAL
// =========================================================

const revealElements =
  document.querySelectorAll(
    [
      ".hero",
      ".system-metrics",
      ".modules-section",
      ".builds-section",
      ".experience-section",
      ".creative-section",
      ".contact-section",
      ".system-footer"
    ].join(",")
  );


revealElements.forEach(
  element =>
    element.classList.add(
      "section-reveal"
    )
);


if (
  "IntersectionObserver" in window
) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            entry.target.classList.add(
              "section-visible"
            );


            observer.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold: 0.08,
        rootMargin:
          "0px 0px -35px 0px"
      }
    );


  revealElements.forEach(
    element =>
      observer.observe(
        element
      )
  );

}


// =========================================================
// NOTIFICATION
// =========================================================

function showNotification(
  title,
  message
) {

  const old =
    document.querySelector(
      ".system-notification"
    );


  if (old) {

    old.remove();

  }


  const notification =
    document.createElement(
      "div"
    );


  notification.className =
    "system-notification";


  notification.innerHTML = `

    <span class="notification-dot"></span>

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


  requestAnimationFrame(
    () =>
      notification.classList.add(
        "notification-visible"
      )
  );


  setTimeout(
    () => {

      notification.classList.remove(
        "notification-visible"
      );


      setTimeout(
        () =>
          notification.remove(),
        300
      );

    },
    2100
  );

}


window.showNotification =
  showNotification;


// =========================================================
// NOTIFICATION STYLES
// =========================================================

const notificationStyles =
  document.createElement(
    "style"
  );


notificationStyles.textContent = `

  .system-notification {

    position: fixed;

    right: 24px;
    bottom: 24px;

    z-index: 12000;

    min-width: 260px;

    padding: 15px 17px;

    display: flex;
    align-items: center;

    gap: 12px;

    border:
      1px solid
      rgba(215,168,61,.42);

    background:
      rgba(5,5,5,.94);

    opacity: 0;

    transform:
      translateY(14px);

    transition:
      .3s ease;

  }


  .system-notification.notification-visible {

    opacity: 1;

    transform:
      translateY(0);

  }


  .notification-dot {

    width: 6px;
    height: 6px;

    border-radius: 50%;

    background:
      #d7a83d;

    box-shadow:
      0 0 12px
      rgba(215,168,61,.75);

  }


  .notification-copy {

    display: flex;

    flex-direction: column;

    gap: 4px;

  }


  .notification-copy strong {

    color:
      #ffe8a3;

    font-size:
      .56rem;

  }


  .notification-copy span {

    color:
      #8f8b82;

    font-size:
      .5rem;

  }

`;


document.head.appendChild(
  notificationStyles
);
