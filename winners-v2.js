const WINNERS = [
  // MEGA EVENTS
  {
    eventId: 'starofgech',
    eventName: 'Star of GECH',
    category: 'Mega',
    winnerImage: 'iamges/th.jpeg', // Paste winner image URL here
    winners: {
      firstPlace: { name: 'Aryan Sharma', usn: '4GH22CS001', dept: 'CSE' }
    }
  },
  {
    eventId: 'foodfest',
    eventName: 'Food Fest',
    category: 'Mega',
    winnerImage: 'iamges/rishhhh.jpeg', // Paste winner image URL here
    winners: {
      firstPlace: { teamName: 'Spicy Delights', members: [{name: 'Rahul', usn: '123', dept: 'ME'}] },
      secondPlace: { teamName: 'Sweet Cravings', members: [{name: 'Sneha', usn: '124', dept: 'CS'}] }
    }
  },
  {
    eventId: 'flashmob',
    eventName: 'Flash Mob',
    category: 'Mega',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { teamName: 'CSE Warriors' }
    }
  },

  // PERFORMING ARTS
  {
    eventId: 'skit',
    eventName: 'Skit',
    category: 'Performing Arts',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { teamName: 'Drama Kings', members: [{name: 'Amit', usn: '001', dept: 'CV'}] },
      secondPlace: { teamName: 'Stage Breakers', members: [{name: 'Sumit', usn: '002', dept: 'EC'}] }
    }
  },
  {
    eventId: 'mime',
    eventName: 'Mime',
    category: 'Performing Arts',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { teamName: 'Silent Artists', members: [{name: 'Kiran', usn: '003', dept: 'ME'}] },
      secondPlace: { teamName: 'Echoes', members: [{name: 'Pooja', usn: '004', dept: 'CS'}] }
    }
  },
  {
    eventId: 'fashionshow',
    eventName: 'Fashion Show',
    category: 'Performing Arts',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { teamName: 'Vogue Squad', members: [{name: 'Maya', usn: '005', dept: 'EC'}] },
      secondPlace: { teamName: 'Trend Setters', members: [{name: 'Rohan', usn: '006', dept: 'ME'}] }
    }
  },
  {
    eventId: 'standup',
    eventName: 'Stand-Up Comedy',
    category: 'Performing Arts',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { name: 'Abhishek U', usn: '4GH22CS002', dept: 'CSE' },
      secondPlace: { name: 'Varun G', usn: '4GH23ME045', dept: 'ME' }
    }
  },

  // LITERARY
  {
    eventId: 'quiz',
    eventName: 'Quiz Competition',
    category: 'Literary',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { teamName: 'The Brainiacs', members: [{ name: 'Aditi R', usn: '4GH22CS005', dept: 'CSE' }] },
      secondPlace: { teamName: 'Logic Seekers', members: [{ name: 'Amit J', usn: '4GH23EC001', dept: 'ECE' }] }
    }
  },
  {
    eventId: 'essay',
    eventName: 'Essay Writing',
    category: 'Literary',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { name: 'Deepika S', usn: '4GH22CV012', dept: 'CIV' },
      secondPlace: { name: 'Gagan P', usn: '4GH23CS044', dept: 'CSE' }
    }
  },
  {
    eventId: 'speech',
    eventName: 'Pick & Speech',
    category: 'Literary',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { name: 'Sagar M', usn: '4GH22ME090', dept: 'ME' },
      secondPlace: { name: 'Ananya R', usn: '4GH23EC011', dept: 'ECE' }
    }
  },
  {
    eventId: 'debate',
    eventName: 'Debate Championship',
    category: 'Literary',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { teamName: 'Orators', members: [{name: 'Zaid', usn: '010', dept: 'CS'}] },
      secondPlace: { teamName: 'Thinkers', members: [{name: 'Lisa', usn: '011', dept: 'EC'}] }
    }
  },

  // VISUAL ARTS
  {
    eventId: 'facepainting',
    eventName: 'Face Painting',
    category: 'Visual Arts',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { name: 'Megha S', usn: '4GH24CV023', dept: 'CIV' },
      secondPlace: { name: 'Ananya B', usn: '4GH22EC010', dept: 'ECE' }
    }
  },
  {
    eventId: 'drawing',
    eventName: 'Drawing',
    category: 'Visual Arts',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { name: 'Kavya R', usn: '4GH22CS045', dept: 'CSE' },
      secondPlace: { name: 'Darshan K', usn: '4GH23ME001', dept: 'ME' }
    }
  },
  {
    eventId: 'spotphoto',
    eventName: 'Spot Photography',
    category: 'Visual Arts',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { name: 'Shubham T', usn: '4GH22EC088', dept: 'ECE' },
      secondPlace: { name: 'Prajwal D', usn: '4GH23CS055', dept: 'CSE' }
    }
  },
  {
    eventId: 'rangoli',
    eventName: 'Rangoli',
    category: 'Visual Arts',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { teamName: 'Colours of Hassan', members: [{name: 'Ramya', usn: '020', dept: 'CV'}] },
      secondPlace: { teamName: 'Artistic Hands', members: [{name: 'Sushma', usn: '021', dept: 'EC'}] }
    }
  },

  // DANCE & MUSIC
  {
    eventId: 'groupsinging',
    eventName: 'Group Singing',
    category: 'Dance & Music',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { teamName: 'Melody Makers', members: [{name: 'Arun', usn: '030', dept: 'CS'}] },
      secondPlace: { teamName: 'Symphony', members: [{name: 'Isha', usn: '031', dept: 'EC'}] }
    }
  },
  {
    eventId: 'solosinging',
    eventName: 'Solo Singing',
    category: 'Dance & Music',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { name: 'Vikram L', usn: '4GH22CS090', dept: 'CSE' },
      secondPlace: { name: 'Pooja R', usn: '4GH23EC034', dept: 'ECE' }
    }
  },
  {
    eventId: 'groupdance',
    eventName: 'Group Dance',
    category: 'Dance & Music',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { teamName: 'Beat Rockers', members: [{name: 'Kushal', usn: '040', dept: 'ME'}] },
      secondPlace: { teamName: 'Dance Devilds', members: [{name: 'Siri', usn: '041', dept: 'CV'}] }
    }
  },
  {
    eventId: 'solodance',
    eventName: 'Solo Dance',
    category: 'Dance & Music',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { name: 'Priya K', usn: '4GH23EC045', dept: 'ECE' },
      secondPlace: { name: 'Rahul V', usn: '4GH22ME012', dept: 'ME' }
    }
  },

  // GAMES
  {
    eventId: 'dumbcharades',
    eventName: 'Dumb Charades',
    category: 'Games',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { teamName: 'Action Kings', members: [{name: 'Harsh', usn: '050', dept: 'CS'}] },
      secondPlace: { teamName: 'Silent Killers', members: [{name: 'Preeti', usn: '051', dept: 'EC'}] }
    }
  },
  {
    eventId: 'superminute',
    eventName: 'Super Minute',
    category: 'Games',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { teamName: 'Flash Runners', members: [{name: 'Yash', usn: '060', dept: 'ME'}] },
      secondPlace: { teamName: 'Quick Minds', members: [{name: 'Deepa', usn: '061', dept: 'CS'}] }
    }
  },
  {
    eventId: 'treasurehunt',
    eventName: 'Treasure Hunt',
    category: 'Games',
    winnerImage: 'ADD_WINNER_IMAGE_URL_HERE',
    winners: {
      firstPlace: { teamName: 'Pirates of Hassan', members: [{ name: 'Rohan D', usn: '4GH22ME055', dept: 'ME' }] },
      secondPlace: { teamName: 'Fast & Curious', members: [{ name: 'Deepa M', usn: '4GH23CS012', dept: 'CSE' }] }
    }
  }
];

function renderWinners() {
  const grid = document.getElementById('winners-grid');
  const noResults = document.getElementById('no-results');
  if (!grid) return;
  
  // Get current filter and search term
  const activeBtn = document.querySelector('.filter-btn.active');
  const filter = activeBtn ? activeBtn.dataset.filter : 'all';
  const searchTerm = document.getElementById('event-search') ? document.getElementById('event-search').value.toLowerCase().trim() : '';
  
  grid.innerHTML = '';
  
  const filteredWinners = WINNERS.filter(w => {
    // Category match
    const categoryMatch = filter === 'all' || 
                         w.category.toLowerCase() === filter.toLowerCase() || 
                         (filter === 'Dance & Music' && (w.category === 'Dance' || w.category === 'Music' || w.category === 'Dance & Music'));
    
    // Search match
    const searchMatch = !searchTerm || 
                        w.eventName.toLowerCase().includes(searchTerm) || 
                        w.category.toLowerCase().includes(searchTerm);
                        
    return categoryMatch && searchMatch;
  });
  
  if (filteredWinners.length === 0) {
    if (noResults) noResults.style.display = 'block';
  } else {
    if (noResults) noResults.style.display = 'none';
    
    filteredWinners.forEach((winner, index) => {
      const card = document.createElement('div');
      card.className = `winner-card reveal ${winner.eventId === 'starofgech' ? 'featured' : ''}`;
      
      // Check if user has provided a winner image, otherwise use a placeholder
      const hasWinnerImg = winner.winnerImage && winner.winnerImage !== 'ADD_WINNER_IMAGE_URL_HERE';
      const imgUrl = hasWinnerImg ? winner.winnerImage : 'https://images.unsplash.com/photo-1578574515318-de92ef508b8e?w=800&q=70'; // Generic "Trophy/Celebration" placeholder
      
      let winnersHtml = '';
      
      // First Place
      winnersHtml += `
        <div class="winner-info">
          <div class="place-heading first-place">🥇 First Place</div>
          ${renderWinnerDetails(winner.winners.firstPlace)}
        </div>
      `;
      
      // Second Place (if exists)
      if (winner.winners.secondPlace) {
        winnersHtml += `
          <div class="winner-info">
            <div class="place-heading second-place">🥈 Second Place</div>
            ${renderWinnerDetails(winner.winners.secondPlace)}
          </div>
        `;
      }
      
      card.innerHTML = `
        <div class="card-image">
          <img src="${imgUrl}" alt="${winner.eventName} Winners" class="winner-photo-img">
          <div class="category-tag">${winner.category}</div>
        </div>
        <div class="card-content">
          <h2 class="event-name">${winner.eventName}</h2>
          ${winnersHtml}
        </div>
      `;
      
      grid.appendChild(card);
    });
  }
  
  // Re-run reveal animation
  setTimeout(() => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => el.classList.add('active'));
  }, 100);
}

function renderWinnerDetails(winnerObj) {
  if (winnerObj.members) {
    // Team with members
    return `
      <div class="winner-details">
        <span class="winner-name">${winnerObj.teamName}</span>
        <button class="team-list-btn" onclick="toggleTeamList(this)">
          Show Team Members <span class="arrow">▼</span>
        </button>
        <div class="team-members">
          ${winnerObj.members.map(m => `
            <div class="member-item">
              <strong>${m.name}</strong> (${m.usn}) - ${m.dept}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (winnerObj.teamName) {
    // Team without members (Flash Mob case)
    return `
      <div class="winner-details">
        <span class="winner-name">${winnerObj.teamName}</span>
      </div>
    `;
  } else {
    // Solo
    return `
      <div class="winner-details">
        <span class="winner-name">${winnerObj.name}</span>
        <div class="winner-meta">
          <span>USN: ${winnerObj.usn}</span>
          <span>Dept: ${winnerObj.dept}</span>
        </div>
      </div>
    `;
  }
}

function toggleTeamList(btn) {
  const members = btn.nextElementSibling;
  const arrow = btn.querySelector('.arrow');
  const isShowing = members.classList.contains('show');
  
  if (isShowing) {
    members.classList.remove('show');
    btn.innerHTML = 'Show Team Members <span class="arrow">▼</span>';
  } else {
    members.classList.add('show');
    btn.innerHTML = 'Hide Team Members <span class="arrow">▲</span>';
  }
}

function downloadCertificate(eventName, winnerName) {
  alert(`Downloading certificate for ${winnerName} - ${eventName}...\n(Demo functionality)`);
  startConfetti();
}

// Filter Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    
    // Sync with mobile select if it exists
    const mobileSelect = document.getElementById('category-select');
    if (mobileSelect) mobileSelect.value = btn.dataset.filter;
    
    renderWinners();
  });
});

// Mobile Select Logic
const mobileSelect = document.getElementById('category-select');
if (mobileSelect) {
  mobileSelect.addEventListener('change', (e) => {
    const filter = e.target.value;
    
    // Sync with desktop buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    renderWinners();
  });
}

// Search Logic
const searchInput = document.getElementById('event-search');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    renderWinners();
  });
}

// Dummy Confetti
function startConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const colors = ['#f5a623', '#e63946', '#00d4ff', '#ffffff', '#ffd700'];
  
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 5 + 2,
      angle: Math.random() * 6.28
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.y += p.speed;
      p.x += Math.sin(p.angle) * 2;
      if (p.y < canvas.height) {
        alive = true;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
    });
    if (alive) requestAnimationFrame(animate);
  }
  animate();
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  renderWinners();
});
