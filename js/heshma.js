// Google Ads conversion ID for "reservar cita".
const CONVERSION_SEND_TO = 'AW-10990584376/eSY1CPLD68UZELiE3Pgo';

function fireConversionEvent() {
	if (typeof gtag === 'function') {
		gtag('event', 'conversion', { 'send_to': CONVERSION_SEND_TO });
	}
}

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
			fireConversionEvent();
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

	const closingLinks = navCollapse.querySelectorAll(".nav-link:not(.dropdown-toggle), .dropdown-item");
	closingLinks.forEach((link) => {
		link.addEventListener("click", () => {
			if (window.innerWidth >= 992) {
				return;
			}

			const collapseInstance = bootstrap.Collapse.getOrCreateInstance(navCollapse);
			collapseInstance.hide();
		});
	});
}

function bindConversionTriggers() {
	document.querySelectorAll('a[href^="tel:"], a[href^="sms:"]').forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const destination = link.href;
			const navigate = () => {
				window.location.href = destination;
			};

			if (typeof gtag === 'function') {
				gtag('event', 'conversion', {
					'send_to': CONVERSION_SEND_TO,
					'event_callback': navigate,
					'event_timeout': 2000
				});
			} else {
				navigate();
			}
		});
	});
}

function initializeApp() {
	injectWhatsAppHrefs();
	bindWhatsAppTriggers();
	bindConversionTriggers();
	setupNavbarState();
	closeMobileMenuOnNavigation();
}

document.addEventListener("DOMContentLoaded", initializeApp);
