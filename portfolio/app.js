// Toggle competence details
function toggleCompetence(element) {
  const details = element.parentElement.querySelector('.competence-details');
  const chevron = element.querySelector('.chevron');
  
  if (details.classList.contains('show')) {
    details.classList.remove('show');
    details.classList.add('hidden');
    chevron.classList.remove('rotated');
  } else {
    details.classList.remove('hidden');
    // Small delay to allow display change before animation
    requestAnimationFrame(() => {
      details.classList.add('show');
    });
    chevron.classList.add('rotated');
  }
}
 
// Switch between BUT1, BUT2 and BUT3 tabs
function switchTab(tab) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('active');
    b.classList.add('bg-gray-700');
    b.classList.remove('bg-indigo-600');
  });
  
  document.getElementById('content-' + tab).classList.remove('hidden');
  var btn = document.getElementById('tab-' + tab);
  btn.classList.add('active');
  btn.classList.remove('bg-gray-700');
  btn.classList.add('bg-indigo-600');
}
 
// Progression values based on semester (S1-S6, reaching 100% at S6)
var progressValues = {
  S1: {
    realiser: 15,
    optimiser: 10,
    administrer: 18,
    gerer: 15,
    conduire: 18,
    collaborer: 20
  },
  S2: {
    realiser: 30,
    optimiser: 25,
    administrer: 35,
    gerer: 30,
    conduire: 35,
    collaborer: 40
  },
  S3: {
    realiser: 48,
    optimiser: 42,
    administrer: 55,
    gerer: 48,
    conduire: 52,
    collaborer: 58
  },
  S4: {
    realiser: 65,
    optimiser: 58,
    administrer: 72,
    gerer: 62,
    conduire: 68,
    collaborer: 75
  },
  S5: {
    realiser: 82,
    optimiser: 78,
    administrer: 86,
    gerer: 80,
    conduire: 84,
    collaborer: 88
  },
  S6: {
    realiser: 100,
    optimiser: 100,
    administrer: 100,
    gerer: 100,
    conduire: 100,
    collaborer: 100
  }
};
 
var activeIntervals = {};
 
// BUT to semesters mapping
var butSemesters = {
  but1: ['S1', 'S2'],
  but2: ['S3', 'S4'],
  but3: ['S5', 'S6']
};
 
// Switch BUT level (shows semester buttons or BUT 3 message)
function switchBUT(but) {
  // Update BUT button states
  document.querySelectorAll('.but-btn').forEach(function(b) {
    b.classList.remove('active');
    b.classList.add('bg-gray-700');
    b.classList.remove('bg-indigo-600');
    b.classList.remove('shadow-lg', 'shadow-indigo-500/25');
  });
  var btn = document.getElementById('btn-' + but);
  if (btn) {
    btn.classList.add('active');
    btn.classList.remove('bg-gray-700');
    btn.classList.add('bg-indigo-600');
    btn.classList.add('shadow-lg', 'shadow-indigo-500/25');
  }
 
  var semesterContainer = document.getElementById('semester-buttons');
  var but3Message = document.getElementById('but3-message');
  var competenceContainer = document.getElementById('competence-container');
 
  if (but === 'but3') {
    // Hide semester buttons and progress bars, show message
    semesterContainer.classList.add('hidden');
    competenceContainer.classList.add('hidden');
    but3Message.classList.remove('hidden');
  } else {
    // Show semester buttons and progress bars, hide message
    semesterContainer.classList.remove('hidden');
    competenceContainer.classList.remove('hidden');
    but3Message.classList.add('hidden');
 
    // Update semester buttons for this BUT
    var semesters = butSemesters[but];
    var semNum1 = semesters[0].replace('S', '');
    var semNum2 = semesters[1].replace('S', '');
    semesterContainer.innerHTML =
      '<button onclick="switchYear(\'' + semesters[0] + '\')" id="btn-' + semesters[0].toLowerCase() + '" class="year-btn bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition-all shadow-lg shadow-indigo-500/25">Semestre ' + semNum1 + '</button>' +
      '<button onclick="switchYear(\'' + semesters[1] + '\')" id="btn-' + semesters[1].toLowerCase() + '" class="year-btn bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all">Semestre ' + semNum2 + '</button>';
 
    // Auto-select first semester
    switchYear(semesters[0]);
  }
}
 
function switchYear(year) {
  // Update semester button states
  document.querySelectorAll('.year-btn').forEach(function(b) {
    b.classList.remove('active');
    b.classList.add('bg-gray-700');
    b.classList.remove('bg-indigo-600');
    b.classList.remove('shadow-lg', 'shadow-indigo-500/25');
  });
  var btn = document.getElementById('btn-' + year.toLowerCase());
  if (btn) {
    btn.classList.add('active');
    btn.classList.remove('bg-gray-700');
    btn.classList.add('bg-indigo-600');
    btn.classList.add('shadow-lg', 'shadow-indigo-500/25');
  }
  
  var values = progressValues[year];
  if (!values) return;
  Object.entries(values).forEach(function(entry) {
    var id = entry[0];
    var target = entry[1];
    var block = document.querySelector('[data-id="' + id + '"]');
    if (!block) return;
    var valueSpan = block.querySelector('.value');
    var bar = block.querySelector('.bar');
    
    var current = parseInt(valueSpan.textContent) || 0;
    
    if (activeIntervals[id]) {
      clearInterval(activeIntervals[id]);
    }
    
    var step = target > current ? 1 : -1;
    
    if (current === target) return;
    
    activeIntervals[id] = setInterval(function() {
      current += step;
      valueSpan.textContent = current + '%';
      bar.style.width = current + '%';
      
      if (current === target) {
        clearInterval(activeIntervals[id]);
        delete activeIntervals[id];
      }
    }, 15);
  });
}
 
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Initialise les barres de progression au chargement (BUT1 / S1 par défaut)
  switchYear('S1');

  // Fade-in animations on scroll
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.competence-card, .progress-item').forEach(function(el) {
    observer.observe(el);
  });
});