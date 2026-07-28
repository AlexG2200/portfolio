const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const year = document.querySelector("#year");
const revealItems = document.querySelectorAll(".reveal");
const calendlyLink = document.querySelector("[data-calendly-url]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (calendlyLink) {
  calendlyLink.addEventListener("click", (event) => {
    const url = calendlyLink.dataset.calendlyUrl;

    if (!url) return;

    event.preventDefault();

    if (window.Calendly?.initPopupWidget) {
      try {
        window.Calendly.initPopupWidget({ url });
        return;
      } catch (error) {
        console.warn("Calendly popup failed, opening the scheduling page instead.", error);
      }
    }

    const fallbackWindow = window.open(url, "_blank", "noopener,noreferrer");

    if (!fallbackWindow) {
      window.location.href = url;
    }
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href?.startsWith("#") && href === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => observer.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const converterWalkthrough = document.querySelector("[data-converter-walkthrough]");

if (converterWalkthrough) {
  const runButton = converterWalkthrough.querySelector("[data-run-converter]");
  const terminalOutput = converterWalkthrough.querySelector("[data-terminal-output]");
  const terminalStatus = converterWalkthrough.querySelector("[data-terminal-status]");
  const result = converterWalkthrough.querySelector("[data-converter-result]");
  const outputLines = [
    "$ python converter.py",
    "Enter file to convert: [Collectivity workbook]",
    "File exists, continue program",
    "Conversion complete",
    "Items exported: 21",
    "Invalid rows: 4",
    "Saved as: output.json",
  ];

  runButton?.addEventListener("click", async () => {
    runButton.disabled = true;
    runButton.textContent = "Converting...";
    terminalStatus.textContent = "Running";
    terminalOutput.textContent = "";
    result.hidden = true;

    for (const line of outputLines) {
      terminalOutput.textContent += `${line}\n`;
      await new Promise((resolve) => window.setTimeout(resolve, 360));
    }

    terminalStatus.textContent = "Complete";
    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    runButton.disabled = false;
    runButton.innerHTML = 'Run Again <span aria-hidden="true">-&gt;</span>';
  });
}

const tradeWalkthrough = document.querySelector("[data-trade-walkthrough]");

if (tradeWalkthrough) {
  const tradeForm = tradeWalkthrough.querySelector("[data-trade-form]");
  const tradeOutput = tradeWalkthrough.querySelector("[data-trade-output]");
  const tradeStatus = tradeWalkthrough.querySelector("[data-trade-status]");
  const tradeFileStatus = tradeWalkthrough.querySelector("[data-trade-file-status]");
  const tradeResult = tradeWalkthrough.querySelector("[data-trade-result]");

  tradeForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(tradeForm);
    const ticker = formData.get("ticker").trim().toUpperCase();
    const bias = formData.get("bias");
    const idea = formData.get("idea").trim();
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    tradeOutput.textContent = [
      "============================",
      `WEEKLY IDEA | Date: ${date} Time: ${time}`,
      `Ticker: ${ticker}`,
      `Bias: ${bias}`,
      "Idea:",
      `   ${idea}`,
      "============================",
    ].join("\n");

    tradeStatus.textContent = "Entry formatted";
    tradeFileStatus.textContent = "Saved";
    tradeResult.hidden = false;
    tradeResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

const bakeryWalkthrough = document.querySelector("[data-bakery-walkthrough]");

if (bakeryWalkthrough) {
  const runButton = bakeryWalkthrough.querySelector("[data-run-bakery]");
  const terminalOutput = bakeryWalkthrough.querySelector("[data-bakery-output]");
  const terminalStatus = bakeryWalkthrough.querySelector("[data-bakery-status]");
  const result = bakeryWalkthrough.querySelector("[data-bakery-result]");
  const outputLines = [
    "$ ./bakery-cost-calculator",
    "Ingredient data file opened successfully.",
    "Product names file opened successfully.",
    "Products read: 7",
    "Ingredients read: 6",
    "Calculating product costs...",
    "Most expensive: Cherry Wafer ($1,649.68)",
  ];

  runButton?.addEventListener("click", async () => {
    runButton.disabled = true;
    runButton.textContent = "Calculating...";
    terminalStatus.textContent = "Running";
    terminalOutput.textContent = "";
    result.hidden = true;

    for (const line of outputLines) {
      terminalOutput.textContent += `${line}\n`;
      await new Promise((resolve) => window.setTimeout(resolve, 280));
    }

    terminalStatus.textContent = "Complete";
    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    runButton.disabled = false;
    runButton.innerHTML = 'Run Again <span aria-hidden="true">-&gt;</span>';
  });
}
