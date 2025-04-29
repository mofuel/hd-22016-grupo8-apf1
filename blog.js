// blog.js
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.f-nav-item');
    const cards    = document.querySelectorAll('.blog-card');
  
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        // Activar botón
        navItems.forEach(i => i.classList.remove('f-active'));
        item.classList.add('f-active');
  
        // Filtrar tarjetas
        const cat = item.getAttribute('data-category');
        cards.forEach(card => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });
  