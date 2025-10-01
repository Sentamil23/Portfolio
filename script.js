// Smooth scroll with sticky header offset
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    const headerOffset = document.querySelector('.header').offsetHeight;
    if (target) {
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  });
});

// Contact form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  alert(`Thank you for contacting, ${name}! We'll get back to you soon.`);
  this.reset();
});
