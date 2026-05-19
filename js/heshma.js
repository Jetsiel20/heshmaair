// Core configuration layer.
const APP_CONFIG = {
	whatsappNumber: "12144071394",
	defaultServiceKey: "quote"
};

// Message map layer grouped by conversion intent.
const WA_MESSAGES = {
	cooling: "Hi! I need to schedule a *Residential Cooling* service (AC Installation, Repair or Maintenance). Please contact me.",
	heating: "Hi! I need to schedule a *Residential Heating* service (Furnace, Heat Pump or Thermostat). Please contact me.",
	iaq: "Hi! I need help with *Air Quality & Thermostats* (Filtration, Smart Home or Thermostat Upgrade). Please contact me.",
	commercial: "Hi! I need to schedule a *Commercial HVAC* service. Please contact me.",
	quote: "Hi! I would like to get a *Free Quote* for an HVAC service. Please contact me.",
	emergency: "Hi! I have an *HVAC Emergency* and need immediate assistance. Please call me ASAP."
};

function resolveWhatsAppMessage(serviceKey) {
	return WA_MESSAGES[serviceKey] || WA_MESSAGES[APP_CONFIG.defaultServiceKey];
}

function buildWhatsAppMessage(serviceKey, source) {
	const baseMessage = resolveWhatsAppMessage(serviceKey);
	if (!source) {
		return baseMessage;
	}

	return `[Website:${source}] ${baseMessage}`;
}

function openWhatsApp(serviceKey, source) {
	const message = buildWhatsAppMessage(serviceKey, source);
	const encodedMessage = encodeURIComponent(message);
	const targetUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodedMessage}`;
	window.open(targetUrl, "_blank", "noopener");
}

function buildWhatsAppUrl(serviceKey, source) {
	const message = buildWhatsAppMessage(serviceKey, source);
	return `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function injectWhatsAppHrefs() {
	const triggers = document.querySelectorAll("a.js-whatsapp-trigger");
	triggers.forEach((trigger) => {
		const serviceKey = trigger.dataset.whatsappService || APP_CONFIG.defaultServiceKey;
		trigger.href = buildWhatsAppUrl(serviceKey, "");
	});
}

function bindWhatsAppTriggers() {
	const triggers = document.querySelectorAll(".js-whatsapp-trigger");

	triggers.forEach((trigger) => {
		trigger.addEventListener("click", (e) => {
			e.preventDefault();
			const serviceKey = trigger.dataset.whatsappService || APP_CONFIG.defaultServiceKey;
			const source = trigger.dataset.whatsappSource || "generic-cta";
			openWhatsApp(serviceKey, source);
		});
	});
}

function setupNavbarState() {
	const navbar = document.querySelector(".site-navbar");
	if (!navbar) {
		return;
	}

	const toggleNavbarShadow = () => {
		navbar.classList.toggle("is-scrolled", window.scrollY > 16);
	};

	toggleNavbarShadow();
	window.addEventListener("scroll", toggleNavbarShadow, { passive: true });
}

function closeMobileMenuOnNavigation() {
	const navCollapse = document.getElementById("mainNavigation");
	if (!navCollapse) {
		return;
	}

	const navLinks = navCollapse.querySelectorAll(".nav-link");
	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			if (window.innerWidth >= 992) {
				return;
			}

			const collapseInstance = bootstrap.Collapse.getOrCreateInstance(navCollapse);
			collapseInstance.hide();
		});
	});
}

function animateMetricValue(counterElement) {
	const target = Number(counterElement.dataset.counterTarget || 0);
	const prefix = counterElement.dataset.counterPrefix || "";
	const suffix = counterElement.dataset.counterSuffix || "";
	const durationMs = 1400;
	const start = performance.now();

	const tick = (now) => {
		const progress = Math.min((now - start) / durationMs, 1);
		const value = Math.floor(progress * target);
		counterElement.textContent = `${prefix}${value}${suffix}`;

		if (progress < 1) {
			window.requestAnimationFrame(tick);
			return;
		}

		counterElement.textContent = `${prefix}${target}${suffix}`;
	};

	window.requestAnimationFrame(tick);
}

function setupMetricCounters() {
	const counters = document.querySelectorAll("[data-counter-target]");
	if (counters.length === 0) {
		return;
	}

	if (!("IntersectionObserver" in window)) {
		counters.forEach((counterElement) => {
			const target = counterElement.dataset.counterTarget || "0";
			const prefix = counterElement.dataset.counterPrefix || "";
			const suffix = counterElement.dataset.counterSuffix || "";
			counterElement.textContent = `${prefix}${target}${suffix}`;
		});
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				const counterElement = entry.target;
				if (counterElement.dataset.counterAnimated === "true") {
					observer.unobserve(counterElement);
					return;
				}

				counterElement.dataset.counterAnimated = "true";
				animateMetricValue(counterElement);
				observer.unobserve(counterElement);
			});
		},
		{ threshold: 0.35 }
	);

	counters.forEach((counterElement) => observer.observe(counterElement));
}

function initializeApp() {
	injectWhatsAppHrefs();
	bindWhatsAppTriggers();
	setupNavbarState();
	closeMobileMenuOnNavigation();
	setupMetricCounters();
}

document.addEventListener("DOMContentLoaded", initializeApp);
