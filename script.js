(function() {
  // ----- DATA -----
  const projects = [
    {
      id: 1,
      title: 'Predictive Analytics Model',
      description: 'Advanced machine learning model for predicting trends and patterns in large datasets using neural networks and deep learning techniques',
      tech: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
      icon: '📊',
      color: 'blue-cyan'
    },
    {
      id: 2,
      title: 'Data Mining & Clustering',
      description: 'Comprehensive data mining system implementing clustering algorithms and feature extraction for business intelligence and insights',
      tech: ['Python', 'K-means', 'Data Mining', 'Visualization'],
      icon: '⛏️',
      color: 'purple-pink'
    },
    {
      id: 3,
      title: 'NLP Text Analysis',
      description: 'Natural Language Processing application for sentiment analysis, text classification, and semantic understanding of large text datasets',
      tech: ['NLP', 'NLTK', 'Transformers', 'Deep Learning'],
      icon: '📝',
      color: 'orange-red'
    },
    {
      id: 4,
      title: 'Data Visualization Dashboard',
      description: 'Interactive analytics dashboard for real-time data visualization and business metrics monitoring with predictive insights',
      tech: ['React', 'D3.js', 'Python', 'Analytics'],
      icon: '📈',
      color: 'green-emerald'
    }
  ];

  // ----- BUILD PROJECT CARDS -----
  const projectsList = document.getElementById('projectsList');

  projects.forEach((project, index) => {
    const isLeft = index % 2 === 0;
    const row = document.createElement('div');
    row.className = `project-row ${!isLeft ? 'reverse' : ''}`;

    // text column
    const textCol = document.createElement('div');
    textCol.className = 'project-text';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'project-card';

    // label
    const label = document.createElement('span');
    label.className = `project-label text-${project.color}`;
    label.textContent = `Project ${project.id}`;

    // title
    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.title;

    // description
    const desc = document.createElement('p');
    desc.className = 'project-desc';
    desc.textContent = project.description;

    // tech list
    const techList = document.createElement('div');
    techList.className = 'tech-list';
    project.tech.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = t;
      techList.appendChild(tag);
    });

    // links
    const linksDiv = document.createElement('div');
    linksDiv.className = 'project-links';

    const codeBtn = document.createElement('button');
    codeBtn.className = 'project-link';
    codeBtn.innerHTML = `<i class="fas fa-code"></i><span class="text-${project.color}">View Code</span>`;

    const demoBtn = document.createElement('button');
    demoBtn.className = 'project-link';
    demoBtn.innerHTML = `<i class="fas fa-external-link-alt"></i><span class="text-${project.color}">Live Demo</span>`;

    linksDiv.appendChild(codeBtn);
    linksDiv.appendChild(demoBtn);

    cardDiv.appendChild(label);
    cardDiv.appendChild(title);
    cardDiv.appendChild(desc);
    cardDiv.appendChild(techList);
    cardDiv.appendChild(linksDiv);

    textCol.appendChild(cardDiv);

    // visual column
    const visualCol = document.createElement('div');
    visualCol.className = 'project-visual';

    const visualInner = document.createElement('div');
    visualInner.className = 'visual-inner';

    const visualContent = document.createElement('div');
    visualContent.className = 'visual-content';

    const emojiSpan = document.createElement('span');
    emojiSpan.className = 'visual-emoji';
    emojiSpan.textContent = project.icon;

    const visualTitle = document.createElement('p');
    visualTitle.className = 'visual-title';
    visualTitle.textContent = project.title;

    visualContent.appendChild(emojiSpan);
    visualContent.appendChild(visualTitle);
    visualInner.appendChild(visualContent);
    visualCol.appendChild(visualInner);

    visualCol.classList.add(`bg-${project.color}`);

    row.appendChild(textCol);
    row.appendChild(visualCol);
    projectsList.appendChild(row);
  });

  // ----- INTERSECTION OBSERVER FOR SECTIONS -----
  const sections = document.querySelectorAll('[data-section]');
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // ----- SCROLL / MOUSE EFFECTS (parallax) -----
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroCta = document.getElementById('heroCta');
  const blobLeft = document.getElementById('blobLeft');
  const blobRight = document.getElementById('blobRight');
  const projectsTitle = document.getElementById('projectsTitle');
  const projectsSubtitle = document.getElementById('projectsSubtitle');

  let mouseX = 0, mouseY = 0;

  function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // hero parallax
    if (heroTitle) {
      heroTitle.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
    if (heroSubtitle) {
      heroSubtitle.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
    if (heroCta) {
      heroCta.style.transform = `translateY(${scrollY * 0.2}px)`;
    }

    // blob parallax (background)
    const bgOffset = scrollY * 0.4;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      heroBg.style.transform = `translateY(${bgOffset}px)`;
    }

    // mouse offset for blobs
    if (blobLeft) {
      blobLeft.style.transform = `translate(${mouseX * 0.02}px, ${mouseY * 0.02}px)`;
    }
    if (blobRight) {
      blobRight.style.transform = `translate(${-mouseX * 0.02}px, ${-mouseY * 0.02}px)`;
    }

    // Projects title parallax
    if (projectsTitle) {
      const offset = Math.max(0, scrollY - windowHeight) * 0.1;
      projectsTitle.style.transform = `translateY(${offset}px)`;
    }
    if (projectsSubtitle) {
      const offset = Math.max(0, scrollY - windowHeight) * 0.15;
      projectsSubtitle.style.transform = `translateY(${offset}px)`;
    }

    // project row parallax
    const projectRows = document.querySelectorAll('.project-row');
    projectRows.forEach((row, index) => {
      const offset = Math.max(0, scrollY - windowHeight * (index + 1.5)) * 0.1;
      row.style.transform = `translateY(${offset}px)`;
    });
  }

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (blobLeft) {
      blobLeft.style.transform = `translate(${mouseX * 0.02}px, ${mouseY * 0.02}px)`;
    }
    if (blobRight) {
      blobRight.style.transform = `translate(${-mouseX * 0.02}px, ${-mouseY * 0.02}px)`;
    }
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('mousemove', handleMouseMove);

  // initial call
  handleScroll();
})();