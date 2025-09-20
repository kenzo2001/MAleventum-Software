/* Chatbot interattivo per la pagina dedicata */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messages = document.getElementById('chatbot-messages');
  const typingIndicator = document.getElementById('chatbot-typing');
  const prompts = document.getElementById('chatbot-prompts');

  if (!form || !input || !messages) return;

  let knowledgeBase = [];

  const loadKnowledgeBase = async () => {
    try {
      const response = await fetch('data/chatbot-knowledge.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        knowledgeBase = data.map(item => ({
          triggers: Array.isArray(item.triggers) ? item.triggers.map(String) : [],
          reply: typeof item.reply === 'string' ? item.reply : ''
        }));
      }
    } catch (error) {
      console.error('Impossibile caricare la knowledge base del chatbot:', error);
      knowledgeBase = [];
    }
  };

  const knowledgeReady = loadKnowledgeBase();

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
    if (!knowledgeBase.length) {
      return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
    }

    const normalized = input.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    knowledgeBase.forEach(item => {
      if (!item.triggers || !item.triggers.length) return;
      const score = item.triggers.reduce((count, trigger) => {
        if (!trigger) return count;
        const keyword = String(trigger).toLowerCase().trim();
        return keyword && normalized.includes(keyword) ? count + 1 : count;
      }, 0);

      if (score > bestScore && item.reply) {
        bestScore = score;
        bestMatch = item.reply;
      }
    });

    if (bestMatch) return bestMatch;

    return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
  };

  const respondToUser = (text) => {
    toggleTyping(true);
    const delay = Math.min(1200, 500 + text.length * 20);

    setTimeout(async () => {
      await knowledgeReady;
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
