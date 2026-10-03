const projects = [
  {
    title: 'EmpowerHer',
    category: 'Healthcare · Web application',
    description: 'A booking platform where women can schedule and manage medical appointments, with real-time updates and accessibility at the centre.',
    summary: 'A booking platform where women can schedule and manage medical appointments, with real-time updates and accessibility at the centre.',
    problem: 'TODO',
    whatIBuilt: 'A booking platform for scheduling and managing medical appointments, with real-time updates and a focus on accessibility.',
    challenge: 'TODO',
    whatIdImprove: 'TODO',
    tools: ['C#', 'ASP.NET', 'MySQL'],
    links: { github: 'TODO', live: 'TODO', screenshot: 'TODO' },
    stack: 'C# · ASP.NET · MySQL',
    art: 'care',
    artLabel: 'Care, on her terms',
    image: '',
    imageAlt: ''
  },
  {
    title: 'Reverse Vending Machine',
    category: 'Sustainability · Web application',
    description: "A recycling management system supporting DUT's Envision2030 goals, with machine registration, waste tracking and automated collection alerts.",
    summary: "A recycling management system supporting DUT's Envision2030 goals, with machine registration, waste tracking and automated collection alerts.",
    problem: 'TODO',
    whatIBuilt: "A recycling management system with machine registration, waste tracking and automated collection alerts, supporting DUT's Envision2030 goals.",
    challenge: 'TODO',
    whatIdImprove: 'TODO',
    tools: ['C#', 'ASP.NET MVC', 'MySQL'],
    links: { github: 'TODO', live: 'TODO', screenshot: 'TODO' },
    stack: 'C# · ASP.NET MVC · MySQL',
    art: 'recycle',
    artLabel: 'Make every return count',
    image: '',
    imageAlt: ''
  },
  {
    title: 'Data Analysis Project',
    category: 'Data analytics',
    description: 'Project details coming soon. I will share the question, data and insights here once the case study is ready.',
    summary: 'TODO',
    problem: 'TODO',
    whatIBuilt: 'TODO',
    challenge: 'TODO',
    whatIdImprove: 'TODO',
    tools: ['TODO'],
    links: { github: 'TODO', live: 'TODO', screenshot: 'TODO' },
    stack: '',
    art: 'data',
    artLabel: 'Finding the signal',
    image: '',
    imageAlt: ''
  },
  {
    title: 'AI Comic Strip Generator',
    category: 'AI · Creative tools',
    description: 'Turns an idea into a four-panel comic, using Gemini for the script and Pollinations to generate the images.',
    summary: 'TODO',
    problem: 'TODO',
    whatIBuilt: 'TODO',
    challenge: 'TODO',
    whatIdImprove: 'TODO',
    tools: ['TODO'],
    links: { github: 'TODO', live: 'TODO', screenshot: 'TODO' },
    stack: 'Gemini · Pollinations',
    art: 'comic',
    artLabel: 'A little idea, four panels',
    image: '',
    imageAlt: ''
  },
  {
    title: 'IT Interview Coach',
    category: 'AI · Team project',
    description: 'A chatbot that helps people practise IT interview questions, built in a team during the Clickatell AI Bootcamp.',
    summary: 'TODO',
    problem: 'TODO',
    whatIBuilt: 'TODO',
    challenge: 'TODO',
    whatIdImprove: 'TODO',
    tools: ['TODO'],
    links: { github: 'TODO', live: 'TODO', screenshot: 'TODO' },
    stack: 'Clickatell AI Bootcamp',
    art: 'coach',
    artLabel: 'Practise with confidence',
    image: '',
    imageAlt: ''
  },
  {
    title: 'Tic Tac Toe',
    category: 'Web · Interactive',
    description: 'A small game project. More details will be added here soon.',
    summary: 'TODO',
    problem: 'TODO',
    whatIBuilt: 'TODO',
    challenge: 'TODO',
    whatIdImprove: 'TODO',
    tools: ['TODO'],
    links: { github: 'TODO', live: 'TODO', screenshot: 'TODO' },
    stack: '',
    art: 'game',
    artLabel: 'A game of Xs and Os',
    image: '',
    imageAlt: ''
  }
];

const projectGrid = document.querySelector('#project-grid');
const themeToggle = document.querySelector('#theme-toggle');
const portfolioView = document.querySelector('#portfolio-view');
const chatView = document.querySelector('#chat-view');
const navChatButton = document.querySelector('#nav-chat-button');
const chatBackButton = document.querySelector('#chat-back');
const chatClearButton = document.querySelector('#chat-clear');
const chatMessages = document.querySelector('#chat-messages');
const chatInput = document.querySelector('#chat-input');
const chatSendButton = document.querySelector('#chat-send');
const starterChips = document.querySelectorAll('.starter-chip');

const CHAT_ENDPOINT = '/.netlify/functions/chat';
const MAX_CHAT_HISTORY = 6;
const MAX_MESSAGE_LENGTH = 500;

const chatState = {
  messages: [],
  isLoading: false,
  lastFocus: null
};

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderChatMessages() {
  if (!chatMessages) return;

  chatMessages.innerHTML = '';

  for (const message of chatState.messages) {
    const row = document.createElement('div');
    row.className = `chat-message-row ${message.role === 'user' ? 'user' : ''}`;

    const bubble = document.createElement('div');
    bubble.className = `chat-message ${message.role}`;
    bubble.innerHTML = escapeHtml(message.content).replace(/\n/g, '<br>');
    row.appendChild(bubble);
    chatMessages.appendChild(row);
  }

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setTypingIndicator(isVisible) {
  if (!chatMessages) return;

  const existing = document.querySelector('.chat-message.typing');
  if (!isVisible && existing) existing.remove();

  if (isVisible) {
    if (existing) return;
    const row = document.createElement('div');
    row.className = 'chat-message-row';
    const bubble = document.createElement('div');
    bubble.className = 'chat-message bot typing';
    bubble.setAttribute('aria-live', 'polite');
    bubble.innerHTML = '<span></span><span></span><span></span>';
    row.appendChild(bubble);
    chatMessages.appendChild(row);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

function addChatMessage(role, content) {
  const safeContent = (content || '').trim();
  if (!safeContent) return;

  chatState.messages.push({ role, content: safeContent });
  if (chatState.messages.length > MAX_CHAT_HISTORY) {
    chatState.messages = chatState.messages.slice(-MAX_CHAT_HISTORY);
  }
  renderChatMessages();
}

function showView(view) {
  const nextView = view === 'chat' ? 'chat' : 'portfolio';
  const hash = nextView === 'chat' ? '#chat' : '';

  if (!chatView || !portfolioView) return;

  if (nextView === 'chat') {
    chatState.lastFocus = document.activeElement;
    portfolioView.hidden = true;
    chatView.hidden = false;
  } else {
    portfolioView.hidden = false;
    chatView.hidden = true;
  }

  if (window.location.hash !== hash) {
    window.location.hash = hash;
  }

  navChatButton?.setAttribute('aria-expanded', String(nextView === 'chat'));

  requestAnimationFrame(() => {
    if (nextView === 'chat') {
      chatInput?.focus();
      chatInput?.select();
      return;
    }

    if (chatState.lastFocus && typeof chatState.lastFocus.focus === 'function') {
      chatState.lastFocus.focus();
    } else {
      navChatButton?.focus();
    }
  });
}

function syncChatViewFromHash() {
  const shouldOpen = window.location.hash === '#chat';
  if (!chatView || !portfolioView) return;

  showView(shouldOpen ? 'chat' : 'portfolio');
}

async function sendChatRequest() {
  if (!chatInput) return;

  const value = chatInput.value.trim();
  if (!value || chatState.isLoading) return;

  const messageText = value.slice(0, MAX_MESSAGE_LENGTH);
  chatInput.value = '';
  chatInput.style.height = 'auto';
  addChatMessage('user', messageText);

  const requestMessages = chatState.messages.slice(-MAX_CHAT_HISTORY);
  chatState.isLoading = true;
  setTypingIndicator(true);

  try {
    const response = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: requestMessages })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = data?.error || "I'm having trouble right now. You can reach Lihle at lihlemalopee@gmail.com.";
      addChatMessage('bot', message);
      return;
    }

    const reply = data?.reply || "I'm having trouble right now. You can reach Lihle at lihlemalopee@gmail.com.";
    addChatMessage('bot', reply);
  } catch (error) {
    addChatMessage('bot', "I'm having trouble right now. You can reach Lihle at lihlemalopee@gmail.com.");
  } finally {
    chatState.isLoading = false;
    setTypingIndicator(false);
    requestAnimationFrame(() => chatInput?.focus());
  }
}

function resetChat() {
  chatState.messages = [];
  renderChatMessages();
  chatInput.value = '';
  chatInput?.focus();
}

function setTheme(theme) {
  const safeTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', safeTheme);
  localStorage.setItem('portfolio-theme', safeTheme);

  if (!themeToggle) return;

  const isDark = safeTheme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

  const icon = themeToggle.querySelector('.theme-toggle-icon');
  const label = themeToggle.querySelector('.theme-toggle-label');

  const sunIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"></path>
    </svg>
  `;

  const moonIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15.5A7.5 7.5 0 0 1 8.5 4a7.5 7.5 0 1 0 11.5 11.5Z"></path>
    </svg>
  `;

  if (icon) icon.innerHTML = isDark ? moonIcon : sunIcon;
  if (label) label.textContent = isDark ? 'Dark' : 'Light';
}

if (themeToggle) {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : preferredTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

if (navChatButton && chatView) {
  navChatButton.addEventListener('click', () => {
    showView(window.location.hash === '#chat' ? 'portfolio' : 'chat');
  });
}

if (chatBackButton) {
  chatBackButton.addEventListener('click', () => showView('portfolio'));
}

if (chatClearButton) {
  chatClearButton.addEventListener('click', resetChat);
}

if (chatSendButton && chatInput) {
  chatSendButton.addEventListener('click', sendChatRequest);

  chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendChatRequest();
    }
  });

  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = `${Math.min(chatInput.scrollHeight, 160)}px`;
  });
}

for (const chip of starterChips) {
  chip.addEventListener('click', () => {
    if (!chatInput) return;
    chatInput.value = chip.textContent.trim();
    chatInput.focus();
    sendChatRequest();
  });
}

window.addEventListener('hashchange', syncChatViewFromHash);
window.addEventListener('popstate', () => {
  syncChatViewFromHash();
});
showView(window.location.hash === '#chat' ? 'chat' : 'portfolio');

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !chatView.hidden) {
    event.preventDefault();
    showView('portfolio');
  }
});

function addTextElement(parent, tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  parent.append(element);
  return element;
}

function makeProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-haspopup', 'dialog');
  card.setAttribute('aria-label', `Open ${project.title} case study`);

  const art = document.createElement('div');
  art.className = `project-art project-art-${project.art}`;
  art.setAttribute('aria-hidden', 'true');
  addTextElement(art, 'span', 'project-art-label', project.artLabel);

  if (project.image) {
    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.imageAlt || `${project.title} project screenshot`;
    image.loading = 'lazy';
    image.removeAttribute('aria-hidden');
    art.removeAttribute('aria-hidden');
    art.replaceChildren(image);
  }

  card.append(art);
  addTextElement(card, 'p', 'project-category', project.category);
  addTextElement(card, 'h3', '', project.title);
  addTextElement(card, 'p', 'project-description', project.description);

  if (project.stack) {
    addTextElement(card, 'p', 'project-stack', project.stack);
  }

  return card;
}

function hasContent(value) {
  return typeof value === 'string' && value.trim() !== '' && value.trim().toUpperCase() !== 'TODO';
}

function normalizeSkill(skill) {
  return skill.toLowerCase().replace(/\s+core mvc$/, '').replace(/\s+mvc$/, '').trim();
}

function appendCaseField(parent, label, value, isList = false) {
  const values = isList && Array.isArray(value) ? value.filter(hasContent) : value;
  if (isList ? values.length === 0 : !hasContent(value)) return false;

  const field = document.createElement('section');
  field.className = 'case-dialog-field';
  addTextElement(field, 'h3', '', label);
  if (isList) {
    const list = document.createElement('ul');
    list.className = 'case-dialog-tools';
    for (const tool of values) addTextElement(list, 'li', '', tool);
    field.append(list);
  } else {
    addTextElement(field, 'p', '', value);
  }
  parent.append(field);
  return true;
}

const caseDialog = document.querySelector('#case-dialog');
const caseDialogTitle = document.querySelector('#case-dialog-title');
const caseDialogCategory = document.querySelector('#case-dialog-category');
const caseDialogFields = document.querySelector('#case-dialog-fields');
const caseDialogLinks = document.querySelector('#case-dialog-links');
const caseDialogClose = document.querySelector('#case-dialog-close');
let returnFocusTarget = null;

function openCaseStudy(project, card) {
  returnFocusTarget = card;
  caseDialogTitle.textContent = project.title;
  caseDialogCategory.textContent = project.category;
  caseDialogFields.replaceChildren();
  caseDialogLinks.replaceChildren();

  let hasDetails = false;
  hasDetails = appendCaseField(caseDialogFields, 'Summary', project.summary) || hasDetails;
  hasDetails = appendCaseField(caseDialogFields, 'Problem', project.problem) || hasDetails;
  hasDetails = appendCaseField(caseDialogFields, 'What I built', project.whatIBuilt) || hasDetails;
  hasDetails = appendCaseField(caseDialogFields, 'Challenge', project.challenge) || hasDetails;
  hasDetails = appendCaseField(caseDialogFields, 'What I would improve', project.whatIdImprove) || hasDetails;
  hasDetails = appendCaseField(caseDialogFields, 'Tools', project.tools, true) || hasDetails;

  const linkLabels = { github: 'GitHub', live: 'Live project', screenshot: 'Screenshot' };
  for (const [key, label] of Object.entries(linkLabels)) {
    if (!hasContent(project.links?.[key])) continue;
    const link = addTextElement(caseDialogLinks, 'a', '', `${label} ↗`);
    link.href = project.links[key];
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }

  if (!hasDetails && caseDialogLinks.childElementCount === 0) {
    addTextElement(caseDialogFields, 'p', 'case-dialog-empty', 'TODO: Add case-study details.');
  }

  caseDialog.showModal();
  caseDialogClose.focus();
}

if (projectGrid) {
  const cards = projects.map((project) => {
    const card = makeProjectCard(project);
    card.addEventListener('click', () => openCaseStudy(project, card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCaseStudy(project, card);
      }
    });
    return card;
  });
  projectGrid.replaceChildren(...cards);
}

caseDialogClose.addEventListener('click', () => caseDialog.close());
caseDialog.addEventListener('close', () => {
  returnFocusTarget?.focus();
  returnFocusTarget = null;
});
caseDialog.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    caseDialog.close();
  }
});
caseDialog.addEventListener('click', (event) => {
  if (event.target === caseDialog) caseDialog.close();
});

const skillButtons = document.querySelectorAll('.skill-filter');
const filterStatus = document.querySelector('#project-filter-status');
const workSection = document.querySelector('#work');

for (const button of skillButtons) {
  button.addEventListener('click', () => {
    const clearFilter = button.getAttribute('aria-pressed') === 'true';
    for (const skillButton of skillButtons) skillButton.setAttribute('aria-pressed', 'false');
    for (const card of projectGrid.children) card.classList.remove('is-highlighted', 'is-dimmed');

    if (clearFilter) {
      filterStatus.textContent = 'Showing all projects.';
    } else {
      button.setAttribute('aria-pressed', 'true');
      const skill = normalizeSkill(button.dataset.skill);
      let matchCount = 0;
      projects.forEach((project, index) => {
        const matches = project.tools.some((tool) => hasContent(tool) && normalizeSkill(tool) === skill);
        projectGrid.children[index].classList.toggle('is-highlighted', matches);
        projectGrid.children[index].classList.toggle('is-dimmed', !matches);
        if (matches) matchCount += 1;
      });
      filterStatus.textContent = matchCount
        ? `Highlighting ${matchCount} ${matchCount === 1 ? 'project' : 'projects'} using ${button.dataset.skill}.`
        : `No projects are tagged with ${button.dataset.skill} yet.`;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    workSection.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
  });
}

document.querySelector('#copyright-year').textContent = new Date().getFullYear();
