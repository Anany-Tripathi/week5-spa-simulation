// Orbit SPA simulation: hash-based client-side routing and dynamic views.
const view = document.querySelector('#view');
const routeLinks = [...document.querySelectorAll('[data-route]')];
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

const tasks = [
  { id: 'wireframe', title: 'Finalize dashboard wireframe', meta: 'Design · Due today', done: true },
  { id: 'routing', title: 'Connect client-side routes', meta: 'Development · Due tomorrow', done: false },
  { id: 'testing', title: 'Test responsive layout', meta: 'Quality · Due Friday', done: false }
];

const projectData = [
  { name: 'Website refresh', detail: 'Improve the main product experience.', status: 'In progress', progress: 72 },
  { name: 'Mobile dashboard', detail: 'Make key metrics easy to scan on phones.', status: 'Planning', progress: 34 },
  { name: 'Accessibility review', detail: 'Check keyboard navigation and semantics.', status: 'Review', progress: 86 },
  { name: 'Design system', detail: 'Document reusable interface components.', status: 'In progress', progress: 58 }
];

function homeTemplate() {
  return `<div class="view-header"><div><span class="pill">Workspace overview</span><h2 style="margin-top:.7rem">Welcome back!</h2><p class="muted">Here is a quick look at your work this week.</p></div><button class="primary-button" data-action="new-task">+ Add task</button></div>
    <div class="stats">
      <div class="stat"><div class="stat-label">Active projects</div><div class="stat-value">04</div><div class="stat-change">↑ 1 this month</div></div>
      <div class="stat"><div class="stat-label">Tasks completed</div><div class="stat-value" id="completed-count">${tasks.filter(t => t.done).length}/03</div><div class="stat-change">Keep the momentum</div></div>
      <div class="stat"><div class="stat-label">Team progress</div><div class="stat-value">68%</div><div class="stat-change">Across current projects</div></div>
    </div>
    <div class="section-heading"><h3>Priority tasks</h3><span class="muted">Interactive checklist</span></div>
    <div class="task-list">${tasks.map(t => `<label class="task ${t.done ? 'done' : ''}"><input type="checkbox" data-task="${t.id}" ${t.done ? 'checked' : ''}><span><strong>${t.title}</strong><small>${t.meta}</small></span></label>`).join('')}</div>`;
}

function dashboardTemplate() {
  return `<div class="view-header"><div><span class="pill">Live demo data</span><h2 style="margin-top:.7rem">Dashboard</h2><p class="muted">A summary of project activity and team progress.</p></div></div>
    <div class="stats">
      <div class="stat"><div class="stat-label">Total tasks</div><div class="stat-value">28</div><div class="stat-change">+5 added this week</div></div>
      <div class="stat"><div class="stat-label">Completion rate</div><div class="stat-value">76%</div><div class="stat-change">↑ 8% from last week</div></div>
      <div class="stat"><div class="stat-label">Open reviews</div><div class="stat-value">03</div><div class="stat-change">2 due this week</div></div>
    </div>
    <div class="section-heading"><h3>Weekly progress</h3></div>
    ${[['Planning',90],['Design',74],['Development',62],['Testing',48]].map(([name,n]) => `<div class="project-card" style="margin-bottom:.7rem"><div class="project-top"><strong>${name}</strong><span class="muted">${n}%</span></div><div class="progress"><span style="width:${n}%"></span></div></div>`).join('')}`;
}

function projectsTemplate() {
  return `<div class="view-header"><div><span class="pill">Project directory</span><h2 style="margin-top:.7rem">Projects</h2><p class="muted">Track the work currently moving through the workspace.</p></div><button class="secondary-button" data-action="filter-projects">Show in-progress</button></div>
    <div class="project-grid" id="project-grid">${projectData.map((p,i) => `<article class="project-card" data-status="${p.status}"><div class="project-top"><span class="pill">${p.status}</span><span class="muted">0${i+1}</span></div><h3>${p.name}</h3><p>${p.detail}</p><div class="progress"><span style="width:${p.progress}%"></span></div><small class="muted">${p.progress}% complete</small></article>`).join('')}</div>`;
}

function aboutTemplate() {
  return `<div class="view-header"><div><span class="pill">Project notes</span><h2 style="margin-top:.7rem">About this simulation</h2><p class="muted">A small example of how a single-page application can behave.</p></div></div>
    <h3>What this demo demonstrates</h3><ul class="about-list"><li><strong>Client-side routing:</strong> the URL hash changes between views without reloading the whole document.</li><li><strong>Dynamic rendering:</strong> JavaScript replaces the content area according to the selected route.</li><li><strong>Browser history:</strong> Back and Forward navigate through previously visited views.</li><li><strong>Responsive interface:</strong> the sidebar, cards, and navigation adapt to smaller screens.</li><li><strong>Accessible interactions:</strong> semantic landmarks, keyboard focus styles, labels, and live announcements support more users.</li></ul>
    <div class="empty-note">This is a front-end simulation with sample data. It does not connect to a server or save changes permanently.</div>`;
}

const templates = { home: homeTemplate, dashboard: dashboardTemplate, projects: projectsTemplate, about: aboutTemplate };

function getRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  return templates[raw] ? raw : 'home';
}

function renderRoute() {
  const route = getRoute();
  view.setAttribute('aria-busy', 'true');
  view.innerHTML = templates[route]();
  view.setAttribute('aria-busy', 'false');
  routeLinks.forEach(link => {
    const active = link.dataset.route === route;
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}

function navigate(route) {
  window.location.hash = `/${route}`;
}

document.addEventListener('click', event => {
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action === 'new-task') {
    const taskName = window.prompt('Enter a task name:');
    if (taskName && taskName.trim()) {
      tasks.push({ id: `task-${Date.now()}`, title: taskName.trim(), meta: 'Added just now', done: false });
      renderRoute();
    }
  }
  if (action === 'filter-projects') {
    const cards = [...document.querySelectorAll('#project-grid [data-status]')];
    const button = document.querySelector('[data-action="filter-projects"]');
    const filtering = button.dataset.filtering !== 'true';
    cards.forEach(card => card.hidden = filtering && card.dataset.status !== 'In progress');
    button.dataset.filtering = String(filtering);
    button.textContent = filtering ? 'Show all projects' : 'Show in-progress';
  }
});

document.addEventListener('change', event => {
  if (event.target.matches('[data-task]')) {
    const task = tasks.find(item => item.id === event.target.dataset.task);
    if (task) task.done = event.target.checked;
    renderRoute();
  }
});

window.addEventListener('hashchange', renderRoute);
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

if (!window.location.hash) window.location.hash = '/home';
else renderRoute();
