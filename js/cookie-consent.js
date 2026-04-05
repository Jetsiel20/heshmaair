(function () {
	"use strict";

	const CONSENT_KEY = "heshma_cookie_consent_v1";
	const SHOW_DELAY_MS = 6000;

	function getStoredDecision() {
		try {
			return window.localStorage.getItem(CONSENT_KEY);
		} catch (_error) {
			return null;
		}
	}

	function setStoredDecision(value) {
		try {
			window.localStorage.setItem(CONSENT_KEY, value);
		} catch (_error) {
			// Ignore storage errors and still hide banner for current session.
		}
	}

	function hideBanner(banner) {
		banner.classList.remove("is-visible");
		window.setTimeout(() => {
			banner.hidden = true;
		}, 220);
	}

	function showBanner(banner) {
		banner.hidden = false;
		window.requestAnimationFrame(() => {
			banner.classList.add("is-visible");
		});
	}

	function setupCookieConsent() {
		const banner = document.getElementById("cookie-consent");
		const acceptButton = document.getElementById("cookie-accept");
		const rejectButton = document.getElementById("cookie-reject");

		if (!banner || !acceptButton || !rejectButton) {
			return;
		}

		const storedDecision = getStoredDecision();
		if (storedDecision === "accepted" || storedDecision === "rejected") {
			banner.hidden = true;
			return;
		}

		window.setTimeout(() => {
			showBanner(banner);
		}, SHOW_DELAY_MS);

		acceptButton.addEventListener("click", () => {
			setStoredDecision("accepted");
			hideBanner(banner);
		});

		rejectButton.addEventListener("click", () => {
			setStoredDecision("rejected");
			hideBanner(banner);
		});
	}

	document.addEventListener("DOMContentLoaded", setupCookieConsent);
})();
