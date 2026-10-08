(function () {
  'use strict';

  // Config
  var script = document.currentScript || document.querySelector('script[src*="widget.js"]');
  var cfg = window.CozunaChatConfig || {};
  var apiUrl = cfg.apiUrl || (script && script.getAttribute('data-api')) || '/api/chat';
  var leadUrl = cfg.leadUrl || (script && script.getAttribute('data-lead')) || '/api/lead';
  var forceLang = cfg.lang || (script && script.getAttribute('data-lang')) || 'auto';

  // Detect language: support 'en', 'fr', 'es'
  function getLang() {
    if (forceLang && forceLang !== 'auto') {
      var l = forceLang.toLowerCase().slice(0, 2);
      if (l === 'fr' || l === 'es') return l;
      return 'en';
    }
    var htmlLang = (document.documentElement.lang || '').toLowerCase().slice(0, 2);
    if (htmlLang === 'fr' || htmlLang === 'es') return htmlLang;
    if (htmlLang === 'en') return 'en';
    var navLang = (navigator.language || navigator.userLanguage || '').toLowerCase().slice(0, 2);
    if (navLang === 'fr' || navLang === 'es') return navLang;
    return 'en';
  }

  var LANG = getLang();

  // Strings
  var STRINGS = {
    en: {
      bubbleText: 'Chat with us',
      title: 'COzuna Assistant',
      subtitle: 'Ask about web, print, prices or timelines',
      placeholder: 'Type a message...',
      send: 'Send',
      suggest1: 'How much for a business website?',
      suggest2: 'What printing services do you offer?',
      suggest3: 'Can someone call me back?',
      callMe: 'Request a callback',
      leadTitle: 'We will call you back',
      leadSubtitle: 'Within 2 hours during business hours (9am-6pm EST)',
      nameLabel: 'Your name',
      phoneLabel: 'Phone number',
      needLabel: 'What do you need?',
      needPlaceholder: 'e.g. Website redesign, business cards...',
      submitLead: 'Request Call',
      leadSuccess: 'Thanks! Ozuna will reach out shortly.',
      leadError: 'Could not send. Call or text +1 438-393-9465 directly.',
      close: 'Close',
      powered: 'Powered by COzuna',
      directContact: 'Direct line: +1 438-393-9465',
      welcome: "Hello! I am COzuna's AI assistant. Ask me anything about our custom web design, printing, turnaround times, or pricing."
    },
    fr: {
      bubbleText: 'Discuter avec nous',
      title: 'Assistant COzuna',
      subtitle: 'Sites web, impression, tarifs et délais',
      placeholder: 'Écrivez votre message...',
      send: 'Envoyer',
      suggest1: 'Combien coûte un site web vitrine ?',
      suggest2: 'Quels services d’impression offrez-vous ?',
      suggest3: 'Pouvez-vous me rappeler ?',
      callMe: 'Demander un rappel',
      leadTitle: 'Nous vous rappelons',
      leadSubtitle: 'En moins de 2h pendant les heures d’ouverture (9h-18h EST)',
      nameLabel: 'Votre nom',
      phoneLabel: 'Numéro de téléphone',
      needLabel: 'Votre besoin',
      needPlaceholder: 'ex. Refonte de site, cartes de visite...',
      submitLead: 'Demander le rappel',
      leadSuccess: 'Merci ! Ozuna vous contactera sous peu.',
      leadError: 'Erreur d’envoi. Appelez ou textez le +1 438-393-9465.',
      close: 'Fermer',
      powered: 'Propulsé par COzuna',
      directContact: 'Ligne directe : +1 438-393-9465',
      welcome: 'Bonjour ! Je suis l’assistant virtuel de COzuna. Posez-moi vos questions sur nos sites web, nos impressions, nos tarifs ou nos délais.'
    },
    es: {
      bubbleText: 'Chatea con nosotros',
      title: 'Asistente COzuna',
      subtitle: 'Sitios web, impresión, precios y plazos',
      placeholder: 'Escribe tu mensaje...',
      send: 'Enviar',
      suggest1: '¿Cuánto cuesta un sitio web corporativo?',
      suggest2: '¿Qué servicios de impresión ofrecen?',
      suggest3: '¿Pueden llamarme por teléfono?',
      callMe: 'Solicitar una llamada',
      leadTitle: 'Te llamamos de vuelta',
      leadSubtitle: 'En menos de 2 horas en horario laboral (9am-6pm EST)',
      nameLabel: 'Tu nombre',
      phoneLabel: 'Número de teléfono',
      needLabel: '¿Qué necesitas?',
      needPlaceholder: 'ej. Rediseño de sitio web, tarjetas de presentación...',
      submitLead: 'Solicitar llamada',
      leadSuccess: '¡Gracias! Ozuna te contactará muy pronto.',
      leadError: 'No se pudo enviar. Llama o escribe al +1 438-393-9465.',
      close: 'Cerrar',
      powered: 'Desarrollado por COzuna',
      directContact: 'Línea directa: +1 438-393-9465',
      welcome: '¡Hola! Soy el asistente virtual de COzuna. Pregúntame sobre diseño web a medida, servicios de imprenta, tarifas o tiempos de entrega.'
    }
  };

  var T = STRINGS[LANG] || STRINGS.en;

  // Local knowledge-base fallback if backend is unreachable
  var DEMO_ANSWERS = {
    en: [
      { k: ['price', 'cost', 'how much', 'rate'], a: 'Custom business websites start at $799 USD (one-time). High-volume print jobs (like 5,000 flyers) start around $165 USD. Every quote is custom — would you like a callback for an exact price?' },
      { k: ['print', 'flyer', 'card', 'banner', 'coroplast'], a: 'We print business cards, flyers, brochures, banners, Coroplast lawn signs, posters, and menus. Most orders ship in 2-4 business days.' },
      { k: ['turnaround', 'how long', 'time', 'delay'], a: 'Standard websites take 1-2 weeks. Rush options (3-5 days) are available. Print turnaround is typically 2-4 business days.' },
      { k: ['call', 'phone', 'contact', 'speak', 'human', 'ozuna'], a: 'You can reach Ozuna directly at +1 438-393-9465 or ozunaprinting@gmail.com. Or click "Request a callback" below and we will call you.' }
    ],
    fr: [
      { k: ['prix', 'combien', 'tarif', 'cout', 'coût'], a: 'Un site vitrine sur-mesure commence à 799 $ USD (paiement unique). Les impressions en volume (ex. 5 000 dépliants) débutent autour de 165 $ USD. Souhaitez-vous un rappel pour une soumission exacte ?' },
      { k: ['impression', 'depliant', 'dépliant', 'carte', 'banniere', 'bannière', 'coroplast'], a: 'Nous imprimons cartes d’affaires, dépliants, brochures, bannières vinyle, pancartes Coroplast, affiches et menus. Expédition en 2 à 4 jours ouvrables.' },
      { k: ['delai', 'délai', 'combien de temps', 'temps'], a: 'Un site vitrine prend 1 à 2 semaines (option express 3-5 jours). L’impression prend 2 à 4 jours ouvrables.' },
      { k: ['appeler', 'telephone', 'téléphone', 'contact', 'parler', 'humain', 'ozuna'], a: 'Vous pouvez joindre Ozuna directement au +1 438-393-9465 ou à ozunaprinting@gmail.com. Vous pouvez aussi cliquer sur « Demander un rappel ».' }
    ],
    es: [
      { k: ['precio', 'cuanto', 'cuánto', 'costo', 'tarifa'], a: 'Los sitios web corporativos personalizados comienzan desde $799 USD (pago único). Las impresiones por volumen (ej. 5,000 volantes) desde $165 USD. ¿Deseas que te llamemos para una cotización exacta?' },
      { k: ['impresion', 'impresión', 'volante', 'tarjeta', 'banner', 'coroplast', 'letrero'], a: 'Imprimimos tarjetas de presentación, volantes, folletos, banners vinílicos, letreros de Coroplast y menús. Envío en 2 a 4 días laborales.' },
      { k: ['tiempo', 'plazo', 'cuanto tarda', 'cuánto tarda'], a: 'Un sitio web estándar toma de 1 a 2 semanas (opción express de 3 a 5 días). Las impresiones tardan de 2 a 4 días laborales.' },
      { k: ['llamar', 'telefono', 'teléfono', 'contacto', 'hablar', 'humano', 'ozuna'], a: 'Puedes comunicarte con Ozuna directamente al +1 438-393-9465 o al correo ozunaprinting@gmail.com. O haz clic en "Solicitar una llamada".' }
    ]
  };

  function demoAnswer(q) {
    var list = DEMO_ANSWERS[LANG] || DEMO_ANSWERS.en;
    var lower = q.toLowerCase();
    for (var i = 0; i < list.length; i++) {
      for (var j = 0; j < list[i].k.length; j++) {
        if (lower.indexOf(list[i].k[j]) !== -1) {
          return list[i].a;
        }
      }
    }
    if (LANG === 'fr') {
      return 'Je peux vous renseigner sur nos sites web (dès 799 $ USD), nos impressions ou nos délais. Souhaitez-vous que nous vous rappelions directement ? Laissez votre numéro via le bouton ci-dessous.';
    }
    if (LANG === 'es') {
      return 'Puedo ayudarte con información sobre sitios web (desde $799 USD), servicios de imprenta o plazos de entrega. ¿Te gustaría que te llamemos directamente? Haz clic en "Solicitar una llamada".';
    }
    return 'I can help with custom websites (from $799 USD), printing, or timelines. Would you like a direct callback? Use the "Request a callback" button below or reach Ozuna at +1 438-393-9465.';
  }

  // Inject styles & host
  var host = document.createElement('div');
  host.id = 'cozuna-chat-host';
  document.body.appendChild(host);

  var shadow = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;

  var style = document.createElement('style');
  style.textContent = [
    ':host { all: initial; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }',
    '#cz-btn {',
    '  position: fixed;',
    '  bottom: 84px;',
    '  right: 20px;',
    '  z-index: 9998;',
    '  background: linear-gradient(135deg, #0ea5e9, #2563eb);',
    '  color: #fff;',
    '  border: none;',
    '  border-radius: 9999px;',
    '  padding: 12px 18px;',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 10px;',
    '  box-shadow: 0 10px 25px -5px rgba(37,99,235,0.4), 0 8px 10px -6px rgba(37,99,235,0.2);',
    '  cursor: pointer;',
    '  font-size: 14px;',
    '  font-weight: 600;',
    '  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);',
    '}',
    '#cz-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 28px -5px rgba(37,99,235,0.5); }',
    '#cz-btn svg { width: 20px; height: 20px; fill: currentColor; }',
    '#cz-panel {',
    '  position: fixed;',
    '  bottom: 144px;',
    '  right: 20px;',
    '  width: 380px;',
    '  max-width: calc(100vw - 32px);',
    '  height: 560px;',
    '  max-height: calc(100vh - 160px);',
    '  z-index: 9999;',
    '  background: #09090b;',
    '  color: #f4f4f5;',
    '  border: 1px solid #27272a;',
    '  border-radius: 18px;',
    '  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05);',
    '  display: none;',
    '  flex-direction: column;',
    '  overflow: hidden;',
    '}',
    '#cz-panel.open { display: flex; animation: czFade 0.2s cubic-bezier(0.4, 0, 0.2, 1); }',
    '@keyframes czFade { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }',
    '.cz-header {',
    '  padding: 16px;',
    '  background: linear-gradient(to bottom, #18181b, #09090b);',
    '  border-bottom: 1px solid #27272a;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '}',
    '.cz-header-info { display: flex; align-items: center; gap: 12px; }',
    '.cz-avatar {',
    '  width: 38px;',
    '  height: 38px;',
    '  border-radius: 50%;',
    '  background: linear-gradient(135deg, #0ea5e9, #2563eb);',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  font-weight: 700;',
    '  font-size: 14px;',
    '  color: #fff;',
    '  box-shadow: 0 0 0 2px rgba(14,165,233,0.3);',
    '}',
    '.cz-title { font-size: 14px; font-weight: 700; color: #fff; line-height: 1.2; }',
    '.cz-sub { font-size: 11px; color: #a1a1aa; line-height: 1.3; }',
    '.cz-close {',
    '  background: transparent;',
    '  border: none;',
    '  color: #71717a;',
    '  cursor: pointer;',
    '  padding: 6px;',
    '  border-radius: 8px;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '}',
    '.cz-close:hover { color: #fff; background: #27272a; }',
    '.cz-body {',
    '  flex: 1;',
    '  overflow-y: auto;',
    '  padding: 16px;',
    '  display: flex;',
    '  flex-direction: column;',
    '  gap: 12px;',
    '}',
    '.cz-msg {',
    '  max-width: 82%;',
    '  padding: 10px 14px;',
    '  border-radius: 14px;',
    '  font-size: 13px;',
    '  line-height: 1.45;',
    '  word-wrap: break-word;',
    '}',
    '.cz-msg.bot {',
    '  align-self: flex-start;',
    '  background: #18181b;',
    '  color: #e4e4e7;',
    '  border: 1px solid #27272a;',
    '  border-bottom-left-radius: 3px;',
    '}',
    '.cz-msg.user {',
    '  align-self: flex-end;',
    '  background: linear-gradient(135deg, #0ea5e9, #2563eb);',
    '  color: #fff;',
    '  border-bottom-right-radius: 3px;',
    '}',
    '.cz-suggest { display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }',
    '.cz-chip {',
    '  background: #18181b;',
    '  border: 1px solid #27272a;',
    '  color: #38bdf8;',
    '  padding: 7px 12px;',
    '  border-radius: 9999px;',
    '  font-size: 12px;',
    '  cursor: pointer;',
    '  text-align: left;',
    '  transition: all 0.15s ease;',
    '}',
    '.cz-chip:hover { background: #27272a; border-color: #38bdf8; transform: translateX(2px); }',
    '.cz-lead-bar {',
    '  padding: 8px 16px;',
    '  background: #18181b;',
    '  border-top: 1px solid #27272a;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '}',
    '.cz-lead-btn {',
    '  background: transparent;',
    '  border: 1px dashed #38bdf8;',
    '  color: #38bdf8;',
    '  font-size: 12px;',
    '  font-weight: 600;',
    '  padding: 6px 12px;',
    '  border-radius: 8px;',
    '  cursor: pointer;',
    '  width: 100%;',
    '  text-align: center;',
    '  transition: all 0.15s ease;',
    '}',
    '.cz-lead-btn:hover { background: rgba(56, 189, 248, 0.1); border-style: solid; }',
    '.cz-footer {',
    '  padding: 12px;',
    '  border-top: 1px solid #27272a;',
    '  background: #09090b;',
    '  display: flex;',
    '  gap: 8px;',
    '}',
    '.cz-input {',
    '  flex: 1;',
    '  background: #18181b;',
    '  border: 1px solid #27272a;',
    '  border-radius: 10px;',
    '  padding: 9px 12px;',
    '  font-size: 13px;',
    '  color: #fff;',
    '  outline: none;',
    '}',
    '.cz-input:focus { border-color: #0ea5e9; box-shadow: 0 0 0 2px rgba(14,165,233,0.2); }',
    '.cz-send {',
    '  background: #0ea5e9;',
    '  color: #fff;',
    '  border: none;',
    '  border-radius: 10px;',
    '  padding: 0 14px;',
    '  font-size: 13px;',
    '  font-weight: 600;',
    '  cursor: pointer;',
    '  transition: background 0.15s ease;',
    '}',
    '.cz-send:hover { background: #0284c7; }',
    '#cz-lead {',
    '  display: none;',
    '  flex-direction: column;',
    '  padding: 16px;',
    '  gap: 12px;',
    '  background: #09090b;',
    '  flex: 1;',
    '  overflow-y: auto;',
    '}',
    '#cz-lead.open { display: flex; }',
    '.cz-lead-title { font-size: 15px; font-weight: 700; color: #fff; }',
    '.cz-lead-sub { font-size: 12px; color: #a1a1aa; }',
    '.cz-label { font-size: 12px; font-weight: 600; color: #d4d4d8; margin-top: 4px; }',
    '.cz-field {',
    '  background: #18181b;',
    '  border: 1px solid #27272a;',
    '  border-radius: 8px;',
    '  padding: 8px 10px;',
    '  font-size: 13px;',
    '  color: #fff;',
    '  outline: none;',
    '}',
    '.cz-field:focus { border-color: #0ea5e9; }',
    '.cz-submit-lead {',
    '  margin-top: 8px;',
    '  background: linear-gradient(135deg, #0ea5e9, #2563eb);',
    '  color: #fff;',
    '  border: none;',
    '  border-radius: 8px;',
    '  padding: 10px;',
    '  font-size: 13px;',
    '  font-weight: 600;',
    '  cursor: pointer;',
    '}',
    '.cz-back { background: transparent; border: none; color: #71717a; font-size: 12px; cursor: pointer; text-align: center; }',
    '.cz-back:hover { color: #fff; }',
    '@media (max-width: 640px) {',
    '  #cz-btn { bottom: 74px; right: 14px; padding: 10px 14px; }',
    '  #cz-panel { bottom: 130px; right: 14px; width: calc(100vw - 28px); height: calc(100vh - 150px); }',
    '}'
  ].join('\n');
  shadow.appendChild(style);

  // HTML Template
  var wrapper = document.createElement('div');
  wrapper.innerHTML = [
    '<button id="cz-btn" aria-label="Open chat">',
    '  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l4.93-1.38C8.42 21.5 10.15 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.61 0-3.11-.45-4.4-1.23l-.32-.19-3.23.91.91-3.23-.19-.32C3.95 14.61 3.5 13.11 3.5 11.5 3.5 6.81 7.31 3 12 3s8.5 3.81 8.5 8.5S16.69 20 12 20z"/></svg>',
    '  <span>' + T.bubbleText + '</span>',
    '</button>',
    '<div id="cz-panel" role="dialog" aria-label="COzuna chat">',
    '  <div class="cz-header">',
    '    <div class="cz-header-info">',
    '      <div class="cz-avatar">CO</div>',
    '      <div>',
    '        <div class="cz-title">' + T.title + '</div>',
    '        <div class="cz-sub">' + T.subtitle + '</div>',
    '      </div>',
    '    </div>',
    '    <button class="cz-close" id="cz-close-btn" aria-label="' + T.close + '">✕</button>',
    '  </div>',
    '  <div class="cz-body" id="cz-messages">',
    '    <div class="cz-msg bot">' + T.welcome + '</div>',
    '    <div class="cz-suggest">',
    '      <button class="cz-chip" data-q="' + T.suggest1 + '">' + T.suggest1 + '</button>',
    '      <button class="cz-chip" data-q="' + T.suggest2 + '">' + T.suggest2 + '</button>',
    '      <button class="cz-chip" data-q="' + T.suggest3 + '">' + T.suggest3 + '</button>',
    '    </div>',
    '  </div>',
    '  <div id="cz-lead">',
    '    <div class="cz-lead-title">' + T.leadTitle + '</div>',
    '    <div class="cz-lead-sub">' + T.leadSubtitle + '</div>',
    '    <label class="cz-label">' + T.nameLabel + '</label>',
    '    <input class="cz-field" id="cz-lead-name" type="text" placeholder="John Doe" />',
    '    <label class="cz-label">' + T.phoneLabel + '</label>',
    '    <input class="cz-field" id="cz-lead-phone" type="tel" placeholder="+1 514-555-0123" />',
    '    <label class="cz-label">' + T.needLabel + '</label>',
    '    <textarea class="cz-field" id="cz-lead-need" rows="3" placeholder="' + T.needPlaceholder + '"></textarea>',
    '    <button class="cz-submit-lead" id="cz-lead-submit">' + T.submitLead + '</button>',
    '    <button class="cz-back" id="cz-lead-back">← ' + T.close + '</button>',
    '  </div>',
    '  <div class="cz-lead-bar" id="cz-lead-bar">',
    '    <button class="cz-lead-btn" id="cz-open-lead">' + T.callMe + '</button>',
    '  </div>',
    '  <form class="cz-footer" id="cz-form">',
    '    <input class="cz-input" id="cz-input" placeholder="' + T.placeholder + '" autocomplete="off" />',
    '    <button class="cz-send" type="submit">' + T.send + '</button>',
    '  </form>',
    '</div>'
  ].join('\n');
  shadow.appendChild(wrapper);

  // References
  var btn = shadow.getElementById('cz-btn');
  var panel = shadow.getElementById('cz-panel');
  var closeBtn = shadow.getElementById('cz-close-btn');
  var form = shadow.getElementById('cz-form');
  var input = shadow.getElementById('cz-input');
  var messages = shadow.getElementById('cz-messages');
  var leadBar = shadow.getElementById('cz-lead-bar');
  var leadPanel = shadow.getElementById('cz-lead');
  var openLeadBtn = shadow.getElementById('cz-open-lead');
  var backLeadBtn = shadow.getElementById('cz-lead-back');
  var submitLeadBtn = shadow.getElementById('cz-lead-submit');

  var history = [];

  // Toggle Panel
  function togglePanel(open) {
    if (typeof open === 'boolean') {
      panel.classList.toggle('open', open);
    } else {
      panel.classList.toggle('open');
    }
    if (panel.classList.contains('open')) {
      input.focus();
    }
  }

  btn.addEventListener('click', function () { togglePanel(); });
  closeBtn.addEventListener('click', function () { togglePanel(false); });

  // Append Message
  function appendMsg(text, sender) {
    var d = document.createElement('div');
    d.className = 'cz-msg ' + sender;
    d.textContent = text;
    messages.appendChild(d);
    messages.scrollTop = messages.scrollHeight;
    return d;
  }

  // Handle Send
  async function handleSend(text) {
    text = (text || '').trim();
    if (!text) return;

    appendMsg(text, 'user');
    history.push({ role: 'user', content: text });
    input.value = '';

    // Typing indicator
    var typing = appendMsg('...', 'bot');

    try {
      var res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: history, lang: LANG })
      });
      if (!res.ok) throw new Error('API error');
      var data = await res.json();
      var reply = data.reply || demoAnswer(text);
      typing.textContent = reply;
      history.push({ role: 'assistant', content: reply });
    } catch (err) {
      // Local fallback
      var fallback = demoAnswer(text);
      typing.textContent = fallback;
      history.push({ role: 'assistant', content: fallback });
    }
    messages.scrollTop = messages.scrollHeight;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    handleSend(input.value);
  });

  // Suggestion chips
  shadow.querySelectorAll('.cz-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var q = chip.getAttribute('data-q');
      handleSend(q);
      // Remove chips after first interaction
      var parent = chip.closest('.cz-suggest');
      if (parent) parent.remove();
    });
  });

  // Lead Modal Toggle
  openLeadBtn.addEventListener('click', function () {
    messages.style.display = 'none';
    form.style.display = 'none';
    leadBar.style.display = 'none';
    leadPanel.classList.add('open');
  });

  backLeadBtn.addEventListener('click', function () {
    leadPanel.classList.remove('open');
    messages.style.display = 'flex';
    form.style.display = 'flex';
    leadBar.style.display = 'flex';
  });

  // Submit Lead
  submitLeadBtn.addEventListener('click', async function () {
    var name = shadow.getElementById('cz-lead-name').value.trim();
    var phone = shadow.getElementById('cz-lead-phone').value.trim();
    var need = shadow.getElementById('cz-lead-need').value.trim();

    if (!phone) {
      alert(LANG === 'fr' ? 'Veuillez entrer un numéro de téléphone.' : (LANG === 'es' ? 'Por favor ingresa un número de teléfono.' : 'Please enter a phone number.'));
      return;
    }

    submitLeadBtn.disabled = true;
    submitLeadBtn.textContent = '...';

    try {
      var res = await fetch(leadUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          phone: phone,
          need: need,
          history: history,
          lang: LANG,
          source: window.location.href
        })
      });
      if (!res.ok) throw new Error('Lead error');
      alert(T.leadSuccess);
      // reset & close lead view
      shadow.getElementById('cz-lead-name').value = '';
      shadow.getElementById('cz-lead-phone').value = '';
      shadow.getElementById('cz-lead-need').value = '';
      backLeadBtn.click();
      appendMsg(T.leadSuccess, 'bot');
    } catch (e) {
      alert(T.leadError);
    } finally {
      submitLeadBtn.disabled = false;
      submitLeadBtn.textContent = T.submitLead;
    }
  });

})();
