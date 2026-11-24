(() => {
  let host, box, latestRequest = 0, overlay = null;
  const dismiss = () => { if (host) host.remove(); host = null; box = null; };
  const nextPaint = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 30))));

  // Bubble: unchanged design/positioning from 1.0.x, now anchored on the drawn rectangle.
  const showBubble = rect => {
    dismiss();
    host = document.createElement('div');
    host.style.cssText = `position:fixed;z-index:2147483647;left:${Math.max(8,Math.min(window.innerWidth-330,rect.right+10))}px;top:${Math.max(8,Math.min(window.innerHeight-160,rect.bottom+8))}px;`;
    const shadow = host.attachShadow({mode:'closed'});
    const style = document.createElement('style');
    style.textContent = `.panel{box-sizing:border-box;width:310px;max-width:calc(100vw - 16px);padding:14px;border:1px solid #d8d8df;border-radius:12px;background:#fff;color:#222;font:14px/1.5 system-ui,sans-serif;box-shadow:0 8px 28px #0003;white-space:pre-wrap;overflow-wrap:anywhere}.head{display:flex;justify-content:space-between;align-items:center;font-weight:700;margin-bottom:8px}.close{cursor:pointer;border:0;background:transparent;font-size:20px;color:#666}.body{max-height:220px;overflow:auto}`;
    box = document.createElement('div'); box.className='panel';
    const head=document.createElement('div');head.className='head';head.textContent='Claude · QuickAnswer';
    const close=document.createElement('button');close.className='close';close.textContent='×';close.setAttribute('aria-label','Fermer');close.addEventListener('click',dismiss);head.appendChild(close);
    const body=document.createElement('div');body.className='body';body.textContent='Analyse en cours…';
    box.append(head,body);shadow.append(style,box);document.documentElement.appendChild(host);
    return body;
  };

  const cancelOverlay = () => { if (overlay) overlay.remove(); overlay = null; };

  const startOverlay = () => {
    if (overlay) return;
    dismiss();
    overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483647;cursor:crosshair;background:rgba(0,0,0,.08);touch-action:none;';
    const shadow = overlay.attachShadow({mode:'closed'});
    const frame = document.createElement('div');
    frame.style.cssText = 'position:fixed;display:none;border:1.5px solid #d96730;border-radius:4px;background:rgba(217,103,48,.06);box-shadow:0 0 0 100vmax rgba(0,0,0,.18);pointer-events:none;';
    shadow.append(frame);
    let start = null, rect = null;
    overlay.addEventListener('contextmenu', e => e.preventDefault()); // ⌃-click on macOS = right click
    overlay.addEventListener('pointerdown', e => {
      e.preventDefault(); overlay.setPointerCapture(e.pointerId);
      start = {x:e.clientX, y:e.clientY};
    });
    overlay.addEventListener('pointermove', e => {
      if (!start) return;
      const l = Math.min(start.x, e.clientX), t = Math.min(start.y, e.clientY);
      rect = {left:l, top:t, width:Math.abs(e.clientX-start.x), height:Math.abs(e.clientY-start.y)};
      rect.right = l + rect.width; rect.bottom = t + rect.height;
      Object.assign(frame.style, {display:'block', left:l+'px', top:t+'px', width:rect.width+'px', height:rect.height+'px'});
    });
    overlay.addEventListener('pointerup', () => {
      const r = rect; cancelOverlay();
      if (r && r.width >= 12 && r.height >= 12) answerRegion(r);
    });
    document.documentElement.appendChild(overlay);
  };

  const answerRegion = async rect => {
    const requestId = ++latestRequest;
    dismiss();
    await nextPaint(); // overlay and old bubble must be off screen before captureVisibleTab
    let result, body;
    try {
      const shot = await chrome.runtime.sendMessage({type:'CAPTURE', rect:{left:rect.left, top:rect.top, width:rect.width, height:rect.height}, viewportWidth:window.innerWidth});
      if (requestId !== latestRequest) return;
      body = showBubble(rect); // loading state, shown only after the capture
      result = shot.error ? shot : await chrome.runtime.sendMessage({type:'ANSWER', image:shot.image});
    } catch (error) { result = {error: error.message}; }
    if (requestId !== latestRequest) return;
    if (!body) body = showBubble(rect);
    else if (!host?.isConnected) return; // closed by the user while loading
    body.textContent = result?.error ? `Erreur : ${result.error}` : (result?.answer || 'Aucune réponse.');
  };

  document.addEventListener('keydown', async e => {
    if (e.key === 'Escape') { cancelOverlay(); dismiss(); return; }
    // ⌃⌥ alone: fires when the second of the two modifiers goes down.
    if ((e.key === 'Control' || e.key === 'Alt') && e.ctrlKey && e.altKey && !e.metaKey && !e.shiftKey && !e.repeat) {
      const {enabled} = await chrome.storage.local.get('enabled');
      if (enabled) startOverlay();
    } else if (overlay && e.key !== 'Control' && e.key !== 'Alt') {
      cancelOverlay(); // ⌃⌥+letter is some other shortcut: get out of the way
    }
  }, true);
})();
