import {authenticate, currentSession, logout, registerAuthenticator} from '/_assets/comm/auth.js';

const authPanel = document.querySelector('#auth-panel');
const authStatus = document.querySelector('#auth-status');
const authAction = document.querySelector('#auth-action');
const principalContent = document.querySelector('#principal-content');
const lockAction = document.querySelector('#lock-action');
const form = document.querySelector('#human-signal-form');
const input = document.querySelector('#human-signal');
const status = document.querySelector('.status');
const outcome = document.querySelector('.outcome');
const button = form.querySelector('button');
let pendingContributionId;
let pendingText;
let hiddenAt;
const MOBILE_BACKGROUND_LOCK_MS = 15 * 60 * 1000;

function showLocked(message = 'Требуется подтверждение Principal.') {
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
  authStatus.textContent = 'Ожидаем подтверждение на устройстве…';
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
    showLocked(error instanceof Error ? error.message : 'Не удалось подтвердить Principal.');
  } finally {
    authAction.disabled = false;
  }
}

authAction.addEventListener('click', beginAuthentication);
lockAction.addEventListener('click', async () => {
  await logout().catch(() => undefined);
  showLocked('Приложение заблокировано.');
});

document.addEventListener('visibilitychange', async () => {
  if (document.hidden) {
    hiddenAt = Date.now();
  } else if (hiddenAt && Date.now() - hiddenAt >= MOBILE_BACKGROUND_LOCK_MS && !principalContent.hidden) {
    await logout().catch(() => undefined);
    showLocked('Подтвердите Principal после длительного перерыва.');
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
  showStatus('Отправляем сигнал…', 'submitting');
  outcome.hidden = true;
  try {
    const response = await fetch('/api/v1/ingress/human', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({contributionId: pendingContributionId, text, channel: 'mob'}),
    });
    const result = await response.json();
    if (response.status === 401) {
      showLocked('Сессия завершена. Подтвердите Principal снова.');
      return;
    }
    if (!response.ok || !result.accepted) throw new Error(result.error || 'Сигнал не принят');
    input.value = '';
    pendingContributionId = undefined;
    pendingText = undefined;
    showStatus('Сигнал принят входным контуром.', 'accepted');
    showOutcome('Alarisa обработает ваше сообщение. Это подтверждение приёма, а не ответ Alarisa.');
  } catch (error) {
    showStatus(navigator.onLine ? 'Не удалось передать сигнал.' : 'Нет соединения с Alarisa.', navigator.onLine ? 'error' : 'offline');
    showOutcome(error instanceof Error ? error.message : 'Попробуйте ещё раз.');
  } finally {
    button.disabled = false;
  }
});

window.addEventListener('offline', () => showStatus('Нет соединения с Alarisa.', 'offline'));
window.addEventListener('online', () => showStatus('Готова принять ваш сигнал.', 'ready'));

const enrollmentToken = new URLSearchParams(location.search).get('enrollment');
currentSession()
  .then((session) => {
    if (session.authenticated) showUnlocked();
    else {
      authAction.textContent = enrollmentToken ? 'Доверять этому устройству' : 'Войти с passkey';
      showLocked(enrollmentToken ? 'Зарегистрируйте passkey для этого устройства.' : undefined);
    }
  })
  .catch(() => showLocked('Сервер недоступен. Приложение остаётся заблокированным.'));

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js', {scope: './'});
