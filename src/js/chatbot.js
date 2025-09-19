/* Chatbot interattivo per la pagina dedicata */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messages = document.getElementById('chatbot-messages');
  const typingIndicator = document.getElementById('chatbot-typing');
  const prompts = document.getElementById('chatbot-prompts');

  if (!form || !input || !messages) return;

  const knowledgeBase = [
    {
      triggers: ['tipo', 'tipi', 'realizzate', 'settori', 'vertical'],
      reply: 'Creiamo chatbot conversazionali per supporto clienti, lead generation, onboarding interno e prenotazioni. Ogni flusso viene progettato sulle tue procedure operative.'
    },
    {
      triggers: ['crm', 'hubspot', 'salesforce', 'integ', 'gestionale'],
      reply: 'Possiamo integrare il chatbot con CRM, helpdesk o gestionali tramite API. Questo ci permette di recuperare dati, aprire ticket e aggiornare i contatti in tempo reale.'
    },
    {
      triggers: ['tempo', 'quanto', 'online', 'settimane', 'rilascio'],
      reply: 'Per un MVP servono 3-4 settimane: analisi, progettazione dei dialoghi, sviluppo e test. Per progetti più complessi definiamo una roadmap iterativa con rilasci progressivi.'
    },
    {
      triggers: ['costo', 'prezzo', 'budget', 'costi'],
      reply: 'Il costo dipende da complessità, canali e integrazioni richieste. Dopo una call di discovery prepariamo un preventivo dettagliato con fasi e SLA.'
    },
    {
      triggers: ['lingua', 'multilingua', 'inglese', 'italiano'],
      reply: 'Supportiamo più lingue e possiamo addestrare risposte specifiche per ogni mercato. Il cambio lingua avviene in automatico in base all’utente.'
    },
    {
      triggers: ['demo', 'provare', 'prova', 'test'],
      reply: 'Prepariamo una demo interattiva con i tuoi contenuti in pochi giorni. Così puoi validare il flusso prima della messa in produzione.'
    },
    {
      triggers: ['umano', 'operatore', 'handoff'],
      reply: 'Quando serve, il chatbot trasferisce la conversazione a un operatore umano passando contesto e cronologia. Decidiamo insieme quando far scattare il passaggio.'
    },
    {
      triggers: ['contatto', 'call', 'consulenza'],
      reply: 'Possiamo fissare una call esplorativa per capire obiettivi e casi d’uso. Scrivici dalla pagina contatti o invia una mail a hello@maleventum.software.'
    }
  ];

  const fallbackReplies = [
    'Interessante! Raccontami qualcosa in più su come vorresti usare il chatbot e ti spiego come possiamo impostarlo.',
    'Possiamo configurare il chatbot in base alla tua struttura organizzativa e agli strumenti che già usi.',
    'Prendiamoci qualche minuto in call così analizziamo i flussi e ti mostriamo esempi concreti.'
  ];

  const formatTime = () => {
    try {
      return new Intl.DateTimeFormat('it-IT', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date());
    } catch (error) {
      return 'ora';
    }
  };

  const toggleTyping = (show) => {
    if (!typingIndicator) return;
    typingIndicator.classList.toggle('hidden', !show);
  };

  const scrollToBottom = () => {
    messages.scrollTop = messages.scrollHeight;
  };

  const appendMessage = (text, sender = 'bot') => {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', sender);

    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    avatar.textContent = sender === 'bot' ? 'MA' : 'TU';

    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.textContent = text;

    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.textContent = formatTime();
    bubble.appendChild(timestamp);

    messageEl.append(avatar, bubble);
    messages.appendChild(messageEl);
    scrollToBottom();
  };

  const getBotReply = (input) => {
    const normalized = input.toLowerCase();
    const hit = knowledgeBase.find(item =>
      item.triggers.some(keyword => normalized.includes(keyword))
    );

    if (hit) return hit.reply;

    return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
  };

  const respondToUser = (text) => {
    toggleTyping(true);
    const delay = Math.min(1200, 500 + text.length * 20);

    setTimeout(() => {
      const reply = getBotReply(text);
      appendMessage(reply, 'bot');
      toggleTyping(false);
    }, delay);
  };

  const handleMessage = (text) => {
    if (!text) return;
    appendMessage(text, 'user');
    respondToUser(text);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    handleMessage(text);
    form.reset();
    input.focus();
  });

  if (prompts) {
    prompts.addEventListener('click', (event) => {
      const button = event.target.closest('.prompt-btn');
      if (!button) return;
      const { message } = button.dataset;
      if (!message) return;

      handleMessage(message);
    });
  }
});
