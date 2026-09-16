// ============================================================
  // CONFIGURAÇÃO — edite aqui para trocar número, produtos e preços
  // ============================================================

  // Número de WhatsApp da loja (formato internacional, só dígitos)
  const WHATSAPP_NUMBER = "5511956109004"; // (11) 95610-9004

  // PRODUTOS — troque nome, categoria, descrição e preço (em reais) livremente.
  // categoria: "racao" | "roupa" | "brinquedo"
  const PRODUTOS = [
    { nome: "Ração Origens Energy Adultos 15kg", categoria: "racao", desc: "Para cães adultos com alta atividade física ou de trabalho.", preco: 189.90, icon: "bag" },
    { nome: "Ração Bionatural Sênior 7+ 10,1kg", categoria: "racao", desc: "Fórmula zero, com carnes frescas, para cães a partir de 7 anos.", preco: 149.90, icon: "bag" },
    { nome: "Ração Filhotes Premium 15kg", categoria: "racao", desc: "Nutrição completa para o crescimento saudável do filhote.", preco: 169.90, icon: "bag" },
    { nome: "Vestido Borboleta", categoria: "roupa", desc: "Roupinha fofa para passeios e fotos especiais.", preco: 39.90, icon: "shirt" },
    { nome: "Body Estampado Floral", categoria: "roupa", desc: "Tecido leve e confortável, tamanhos P ao G.", preco: 34.90, icon: "shirt" },
    { nome: "Pato de Pelúcia Mordedor", categoria: "brinquedo", desc: "Brinquedo resistente para mastigar e brincar.", preco: 24.90, icon: "toy" },
    { nome: "Ganso de Pelúcia Mordedor", categoria: "brinquedo", desc: "Pelúcia com apito, ideal para cães de todos os portes.", preco: 24.90, icon: "toy" },
  ];

  // ============================================================
  // Não precisa editar daqui pra baixo
  // ============================================================

  const ICONS = {
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 8V6a5 5 0 0 1 10 0v2"/><path d="M5 8h14l1 12H4L5 8z"/></svg>',
    shirt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 4l4 2 4-2 3 4-3 2v10H5V10L2 8l3-4z"/></svg>',
    toy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8"/><path d="M9 12h6M12 9v6"/></svg>'
  };

  const CAT_LABEL = { racao: "Ração", roupa: "Roupinha", brinquedo: "Brinquedo" };

  function formatBRL(v){
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function whatsAppLink(productName){
    const msg = `Olá! Tenho interesse no produto: ${productName}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  function renderProducts(filter){
    const grid = document.getElementById('productGrid');
    const list = filter === 'todos' ? PRODUTOS : PRODUTOS.filter(p => p.categoria === filter);
    grid.innerHTML = list.map(p => `
      <div class="product-card">
        <div class="product-media">
          <span class="product-tag">${CAT_LABEL[p.categoria]}</span>
          ${ICONS[p.icon] || ICONS.bag}
        </div>
        <div class="product-body">
          <h3>${p.nome}</h3>
          <p class="desc">${p.desc}</p>
          <div class="product-foot">
            <span class="price"><small>a partir de</small>${formatBRL(p.preco)}</span>
            <a class="btn btn-clay btn-sm" href="${whatsAppLink(p.nome)}" target="_blank" rel="noopener">Pedir</a>
          </div>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('filters').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if(!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const grid = document.getElementById('productGrid');
    grid.classList.add('is-switching');
    window.setTimeout(() => {
      renderProducts(btn.dataset.filter);
      grid.classList.remove('is-switching');
    }, 180);
  });

  renderProducts('todos');

  // Botões genéricos de WhatsApp (header, hero, footer, fab)
  const genericLink = whatsAppLink("um produto da loja");
  document.querySelectorAll('.whats-generic, #headerWhats, #footerWhats').forEach(el => {
    el.href = genericLink;
  });

  // Menu mobile
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Revelação suave dos blocos ao rolar a página
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('in-view'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));
  }
