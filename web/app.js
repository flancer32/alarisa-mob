import {authenticate, currentSession, logout, registerAuthenticator} from '/_assets/comm/auth.js';

const authPanel = document.querySelector('#auth-panel');
const authStatus = document.querySelector('#auth-status');
const authAction = document.querySelector('#auth-action');
const principalContent = document.querySelector('#principal-content');
const lockAction = document.querySelector('#lock-action');
const form = document.querySelector('#human-signal-form');
const input = document.querySelector('#human-signal');
const status = document.querySelector('#signal-status');
const outcome = document.querySelector('.outcome');
const button = form.querySelector('button');
let pendingContributionId;
let pendingText;
let hiddenAt;
const MOBILE_BACKGROUND_LOCK_MS = 15 * 60 * 1000;

function showLocked(message = 'Principal verification is required.') {
  principalContent.hidden = true;
  authPanel.hidden = false;
  authStatus.textContent = message;
  authStatus.dataset.status = 'locked';
  authAction.hidden = false;
}

function showUnlocked() {
  authPanel.hidden = true;
  principalContent.hidden = false;
  input.focus();
}

async function beginAuthentication() {
  authAction.disabled = true;
  authStatus.textContent = 'Waiting for confirmation on your device…';
  authStatus.dataset.status = 'authenticating';
  try {
    const enrollmentToken = new URLSearchParams(location.search).get('enrollment');
    if (enrollmentToken) {
      await registerAuthenticator(enrollmentToken);
      history.replaceState(null, '', location.pathname);
    } else {
      await authenticate('mob');
    }
    showUnlocked();
  } catch (error) {
    showLocked(error instanceof Error ? error.message : 'Could not verify the Principal.');
  } finally {
    authAction.disabled = false;
  }
}

authAction.addEventListener('click', beginAuthentication);
lockAction.addEventListener('click', async () => {
  await logout().catch(() => undefined);
  showLocked('The application is locked.');
});

document.addEventListener('visibilitychange', async () => {
  if (document.hidden) {
    hiddenAt = Date.now();
  } else if (hiddenAt && Date.now() - hiddenAt >= MOBILE_BACKGROUND_LOCK_MS && !principalContent.hidden) {
    await logout().catch(() => undefined);
    showLocked('Verify the Principal after an extended break.');
  }
});

function showStatus(message, state) {
  status.textContent = message;
  status.dataset.status = state;
}

function showOutcome(message) {
  outcome.textContent = message;
  outcome.hidden = false;
}

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    form.requestSubmit();
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  if (!pendingContributionId || pendingText !== text) {
    pendingContributionId = crypto.randomUUID();
    pendingText = text;
  }
  button.disabled = true;
  showStatus('Sending signal…', 'submitting');
  outcome.hidden = true;
  try {
    const response = await fetch('/api/v1/ingress/human', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({contributionId: pendingContributionId, text, channel: 'mob'}),
    });
    const result = await response.json();
    if (response.status === 401) {
      showLocked('Your session has ended. Verify the Principal again.');
      return;
    }
    if (!response.ok || !result.accepted) throw new Error(result.error || 'Signal was not accepted');
    input.value = '';
    pendingContributionId = undefined;
    pendingText = undefined;
    showStatus('Signal accepted by the ingress boundary.', 'accepted');
    showOutcome('Alarisa will process your message. This confirms receipt; it is not a response from Alarisa.');
  } catch (error) {
    showStatus(navigator.onLine ? 'Could not send the signal.' : 'No connection to Alarisa.', navigator.onLine ? 'error' : 'offline');
    showOutcome(error instanceof Error ? error.message : 'Try again.');
  } finally {
    button.disabled = false;
  }
});

window.addEventListener('offline', () => showStatus('No connection to Alarisa.', 'offline'));
window.addEventListener('online', () => showStatus('Ready to receive your signal.', 'ready'));

const enrollmentToken = new URLSearchParams(location.search).get('enrollment');
currentSession()
  .then((session) => {
    if (session.authenticated) showUnlocked();
    else {
      authAction.textContent = enrollmentToken ? 'Trust this device' : 'Sign in with a passkey';
      showLocked(enrollmentToken ? 'Register a passkey for this device.' : undefined);
    }
  })
  .catch(() => showLocked('Server unavailable. The application remains locked.'));

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js', {scope: './'});
