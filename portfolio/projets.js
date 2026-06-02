// Show modal
function showModal(id) {
  var modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}
 
// Close modal
function closeModal(id) {
  var modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}
 
// Close modal when clicking outside
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.add('hidden');
    document.body.style.overflow = '';
  }
});
 
// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal:not(.hidden)').forEach(function(modal) {
      modal.classList.add('hidden');
    });
    document.body.style.overflow = '';
  }
});
 
// Filter projects by semester
function filterProjects(filter, btn) {
  // Update button states
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    b.classList.remove('active');
    b.classList.add('bg-gray-700');
    b.classList.remove('bg-indigo-600');
  });
  
  // Find the clicked button and activate it
  btn.classList.add('active');
  btn.classList.remove('bg-gray-700');
  btn.classList.add('bg-indigo-600');
  
  document.querySelectorAll('.project-card').forEach(function(card) {
    if (filter === 'all') {
      card.classList.remove('hidden');
      card.style.display = '';
    } else if (card.classList.contains(filter)) {
      card.classList.remove('hidden');
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}