// ===== ACTION DATA (SDG 13: Climate Action) =====
const actions = [
    {
        id: 1,
        title: "Switch to Renewable Energy",
        description: "Install solar panels on your home or switch your electricity provider to 100% renewable sources.",
        image: "image\\Switch_to_Renewable_Energy.jpeg",
        alt: "Solar panels on a residential building",
        impact: 3
    },
    {
        id: 2,
        title: "Reduce Transportation Emissions",
        description: "Use public transport, carpool, bike, or switch to an electric vehicle for daily commuting.",
        image: "image\\Reduce_Transportation_Emissions.jpeg",
        alt: "Electric vehicle charging at a station",
        impact: 2
    },
    {
        id: 3,
        title: "Plant Trees and Greenery",
        description: "Participate in tree-planting initiatives or create a home garden to absorb CO2 and support biodiversity.",
        image: "image\\Plant_Trees_and_Greenery.webp",
        alt: "Hands planting a young tree in soil",
        impact: 2
    },
    {
        id: 4,
        title: "Reduce, Reuse, Recycle",
        description: "Minimize waste by reducing consumption, reusing items, and properly recycling materials.",
        image: "image\\3R.jpeg",
        alt: "Colorful recycling bins with waste materials",
        impact: 1
    },
    {
        id: 5,
        title: "Support Climate Advocacy",
        description: "Vote for climate-conscious policies, participate in climate marches, and educate others about climate change.",
        image: "image\\Support_Climate_Advocacy.jpeg",
        alt: "Group of people at a climate action rally",
        impact: 2
    },
    {
        id: 6,
        title: "Sustainable Consumption",
        description: "Buy sustainable products, support eco-friendly brands, reduce meat consumption, and minimize single-use plastics.",
        image: "image\\Sustainable_Consumption.jpeg",
        alt: "Eco-friendly sustainable products and packaging",
        impact: 2
    }
];

// ===== IMPACT LEVEL THRESHOLDS =====
// Low: 1-4 points, Medium: 5-7 points, High: 8-10 points
const impactLevels = {
    low: { min: 0, max: 4, name: "Low Impact", color: "impact-low" },
    medium: { min: 5, max: 7, name: "Medium Impact", color: "impact-medium" },
    high: { min: 8, max: 10, name: "High Impact", color: "impact-high" }
};

// ===== STATE MANAGEMENT =====
let selectedActions = new Set();

// ===== INITIALIZE PAGE =====
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main_nav');

    if (menuToggle) {
        menuToggle.textContent = '☰'; // Hamburger menu icon
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when a link is clicked
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }

    // Render action cards and update background
    renderActionCards();
    updateBackgroundImage();
});

// ===== RENDER ACTION CARDS =====
function renderActionCards() {
    const container = document.getElementById('actionCardsContainer');
    container.innerHTML = '';

    actions.forEach(action => {
        const card = document.createElement('div');
        card.className = 'action-card';
        card.id = `action-${action.id}`;
        card.onclick = () => toggleAction(action.id, card);

        card.innerHTML = `
            <img src="${action.image}" alt="${action.alt}" class="card-image" onerror="this.src='https://via.placeholder.com/400x200?text=${encodeURIComponent(action.title)}'">
            <div class="card-content">
                <h3 class="card-title">${action.title}</h3>
                <p class="card-description">${action.description}</p>
                <div class="card-footer">
                    <span class="impact-points">${action.impact} points</span>
                    <div class="selection-indicator"></div>
                </div>
            </div>
        `;

        if (selectedActions.has(action.id)) {
            card.classList.add('selected');
        }

        container.appendChild(card);
    });
}

// ===== TOGGLE ACTION SELECTION =====
function toggleAction(actionId, cardElement) {
    if (selectedActions.has(actionId)) {
        selectedActions.delete(actionId);
        cardElement.classList.remove('selected');
    } else {
        selectedActions.add(actionId);
        cardElement.classList.add('selected');
    }

    updateFeedback();
}

// ===== CALCULATE AND UPDATE FEEDBACK =====
function updateFeedback() {
    // Calculate total impact points
    let totalPoints = 0;
    selectedActions.forEach(actionId => {
        const action = actions.find(a => a.id === actionId);
        if (action) totalPoints += action.impact;
    });

    // Update total points display
    document.getElementById('totalPoints').textContent = totalPoints;

    // Determine impact level
    let levelKey = 'low';
    let levelData = impactLevels.low;
    let message = '';

    if (totalPoints >= impactLevels.high.min) {
        levelKey = 'high';
        levelData = impactLevels.high;
        message = "Excellent! Your climate actions demonstrate a strong commitment to sustainability. You're making a significant difference in fighting climate change and inspiring others to take action.";
    } else if (totalPoints >= impactLevels.medium.min) {
        levelKey = 'medium';
        levelData = impactLevels.medium;
        message = "Great job! Your selected actions show a meaningful contribution to climate action. Keep building on these practices to increase your positive impact.";
    } else if (totalPoints > 0) {
        levelKey = 'low';
        levelData = impactLevels.low;
        message = "Good start! Every action counts. Consider selecting more actions to increase your climate impact and create a bigger positive change.";
    } else {
        message = "";
    }

    // Update level display
    const levelElement = document.getElementById('impactLevel');
    levelElement.textContent = levelData.name;
    levelElement.className = `impact-level ${levelData.color}`;

    // Update message
    document.getElementById('impactMessage').textContent = message;

    // Update background image based on impact level
    updateBackgroundImage(levelKey);
}

// ===== UPDATE BACKGROUND IMAGE BASED ON IMPACT LEVEL =====
function updateBackgroundImage(levelKey = 'low') {
    const backgrounds = {
        low: 'linear-gradient(135deg, rgba(27, 118, 7, 0.8), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop")',
        medium: 'linear-gradient(135deg, rgba(27, 118, 7, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop")',
        high: 'linear-gradient(135deg, rgba(27, 118, 7, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=600&fit=crop")'
    };

    document.body.style.backgroundImage = backgrounds[levelKey] || backgrounds.low;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
}

// ===== RESET SIMULATOR =====
function resetSimulator() {
    selectedActions.clear();
    renderActionCards();
    document.getElementById('totalPoints').textContent = '0';
    document.getElementById('impactLevel').textContent = 'Start by selecting actions';
    document.getElementById('impactLevel').className = 'impact-level';
    document.getElementById('impactMessage').textContent = '';
    updateBackgroundImage('low');
}
