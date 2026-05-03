const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("main section[id]");
const revealSections = document.querySelectorAll(".content-section");

function setNavigationState(isOpen) {
    if (!navToggle || !siteNav) return;

    siteNav.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
}

navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setNavigationState(!isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#" || !targetId.startsWith("#")) return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", targetId);
        setNavigationState(false);
    });
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    }
);

sections.forEach((section) => observer.observe(section));

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12
    }
);

revealSections.forEach((section) => revealObserver.observe(section));
