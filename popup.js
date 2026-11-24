const key = document.getElementById('apiKey');
const enabled = document.getElementById('enabled');
const status = document.getElementById('status');
chrome.storage.local.get(['apiKey','enabled']).then(data => { key.value=data.apiKey||'';enabled.checked=Boolean(data.enabled); });
document.getElementById('save').addEventListener('click', async () => {
  await chrome.storage.local.set({apiKey:key.value.trim(),enabled:enabled.checked});
  status.textContent='Paramètres enregistrés.';
});
