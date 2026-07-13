const form = document.querySelector('#human-signal-form');
const input = document.querySelector('#human-signal');
const status = document.querySelector('.status');
const outcome = document.querySelector('.outcome');
const button = form.querySelector('button');

function showStatus(message, state) {
  status.textContent = message;
  status.dataset.status = state;
}

function showOutcome(message) {
  outcome.textContent = message;
  outcome.hidden = false;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  button.disabled = true;
  showStatus('Отправляем сигнал…', 'submitting');
  outcome.hidden = true;
  try {
    const response = await fetch('/api/ingress/human', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text}),
    });
    const result = await response.json();
    if (!response.ok || !result.accepted) throw new Error(result.error || 'Сигнал не принят');
    input.value = '';
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

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
