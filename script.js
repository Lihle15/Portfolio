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
