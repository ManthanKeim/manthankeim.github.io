const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const progress = document.getElementById("progress");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

if (progress) {
  window.addEventListener(
    "scroll",
    () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`;
    },
    { passive: true }
  );
}

const mobileOnlyLinks = document.querySelectorAll(".nav-hire-mobile");
function updateMobileLinks() {
  const isMobile = window.innerWidth <= 980;
  mobileOnlyLinks.forEach((el) => {
    el.style.display = isMobile ? "" : "none";
  });
}
updateMobileLinks();
window.addEventListener("resize", updateMobileLinks, { passive: true });

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a:not(.nav-resume-link):not(.nav-hire-mobile)");
window.addEventListener(
  "scroll",
  () => {
    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 220) current = section.id;
    });
    navItems.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  },
  { passive: true }
);

const roles = ["Automation Engineer", "Integration Engineer", "MFT Engineer", "HL7 tinkerer"];
let ri = 0;
let ci = 0;
let deleting = false;
let cycleCount = 0;
const maxCycles = 2;
const typingEl = document.getElementById("typingText");
function typeLoop() {
  if (!typingEl) return;
  if (cycleCount >= maxCycles && ri === 0 && ci === 0 && !deleting) {
    typingEl.textContent = roles[0];
    typingEl.style.borderRight = "none";
    return;
  }
  const word = roles[ri];
  if (!deleting) {
    typingEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typingEl.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
      if (ri === 0) cycleCount++;
    }
  }
  setTimeout(typeLoop, deleting ? 48 : 88);
}
if (typingEl) setTimeout(typeLoop, 1400);

const themeToggle = document.getElementById("themeToggle");
function syncThemeLabel() {
  if (!themeToggle) return;
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}
syncThemeLabel();
themeToggle?.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
  syncThemeLabel();
});

const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener(
    "scroll",
    () => {
      backToTop.classList.toggle("visible", window.scrollY > window.innerHeight * 0.9);
    },
    { passive: true }
  );
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

const footerYear = document.getElementById("footerYear");
if (footerYear) footerYear.textContent = new Date().getFullYear();

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const subjectInput = document.getElementById("contactSubject");
  const messageInput = document.getElementById("contactMessage");
  const botcheckInput = document.getElementById("contactBotcheck");
  const formStatus = document.getElementById("formStatus");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  nameInput?.addEventListener("input", () => {
    if (nameInput.value.trim().length >= 2) {
      nameError.textContent = "";
      nameInput.removeAttribute("aria-invalid");
    }
  });
  emailInput?.addEventListener("input", () => {
    if (isValidEmail(emailInput.value.trim())) {
      emailError.textContent = "";
      emailInput.removeAttribute("aria-invalid");
    }
  });
  subjectInput?.addEventListener("input", () => {
    if (subjectInput.value.trim().length >= 3) {
      subjectError.textContent = "";
      subjectInput.removeAttribute("aria-invalid");
    }
  });
  messageInput?.addEventListener("input", () => {
    if (messageInput.value.trim().length >= 10) {
      messageError.textContent = "";
      messageInput.removeAttribute("aria-invalid");
    }
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (botcheckInput?.value.trim()) return;

    let hasErrors = false;
    if (nameInput.value.trim().length < 2) {
      nameError.textContent = "Name must be at least 2 characters.";
      nameInput.setAttribute("aria-invalid", "true");
      hasErrors = true;
    }
    if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      emailInput.setAttribute("aria-invalid", "true");
      hasErrors = true;
    }
    if (subjectInput.value.trim().length < 3) {
      subjectError.textContent = "Subject must be at least 3 characters.";
      subjectInput.setAttribute("aria-invalid", "true");
      hasErrors = true;
    }
    if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Message must be at least 10 characters.";
      messageInput.setAttribute("aria-invalid", "true");
      hasErrors = true;
    }
    if (hasErrors) {
      contactForm.querySelector("[aria-invalid='true']")?.focus();
      return;
    }

    const body = `${messageInput.value.trim()}\n\n— ${nameInput.value.trim()} <${emailInput.value.trim()}>`;
    window.location.href = `mailto:keimmanthan@gmail.com?subject=${encodeURIComponent(subjectInput.value.trim())}&body=${encodeURIComponent(body)}`;
    if (formStatus) {
      formStatus.textContent = "Opening your email client…";
      formStatus.className = "form-status success";
    }
  });
}
