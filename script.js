const pricing = {
    single: { name: 'Lifetime Kenai Single Kayak', rates: { 1: 28, 2: 45, 4: 55 } },
    tandem: { name: 'Lifetime Envoy 126" Tandem Kayak', rates: { 1: 40, 2: 70, 4: 80 } }
};

function updateSummary() {
    const assetSelect = document.getElementById('asset-type');
    const durationSelect = document.getElementById('rental-duration');
    const asset = pricing[assetSelect.value];
    const duration = durationSelect.value;
    const price = asset.rates[duration];

    document.getElementById('summary-text').textContent = `${asset.name} - ${duration} ${duration === '1' ? 'Hour' : 'Hours'}`;
    document.getElementById('summary-total').textContent = `$${price}.00`;
}

function switchStep(stepNumber) {
    document.querySelectorAll('.step').forEach((step) => {
        const isActive = step.id === `st${stepNumber}`;
        step.classList.toggle('active', isActive);
        if (isActive) {
            step.setAttribute('aria-current', 'step');
        } else {
            step.removeAttribute('aria-current');
        }
    });
    document.querySelectorAll('.step-panel').forEach((panel) => {
        panel.classList.toggle('active', panel.id === `panel${stepNumber}`);
    });
    updateSummary();
}

function proceedToWaiver() {
    const date = document.getElementById('rental-date');
    if (!date.checkValidity()) {
        date.reportValidity();
        return;
    }
    switchStep(2);
}

function validateWaiver() {
    const waiver = document.getElementById('waiver-agree');
    const name = document.getElementById('signer-name');
    if (!waiver.checked || name.value.trim() === '') {
        alert('Please review the liability agreement and enter your full legal name to continue.');
        return;
    }
    switchStep(3);
}

function executeMockCheckout() {
    const email = document.getElementById('cust-email');
    const date = document.getElementById('rental-date');
    if (!email.checkValidity() || date.value === '') {
        alert('Please provide a valid email address and rental date to continue.');
        return;
    }
    alert(`Reservation request received for ${email.value}. The connected booking provider will send confirmation details.`);
    window.location.reload();
}

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isOpen));
        siteNav.classList.toggle('is-open', !isOpen);
    });

    siteNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            siteNav.classList.remove('is-open');
        });
    });
}

const rentalDate = document.getElementById('rental-date');
if (rentalDate) {
    rentalDate.min = new Date().toISOString().split('T')[0];
}

updateSummary();