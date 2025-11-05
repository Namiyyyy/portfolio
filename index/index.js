// Portfolio data structure
const portfolioData = {
    title: "Gülsen Namıduru",
    projects: [
        {
            id: 1,
            title: "Work 01 - Architectures Of Sky",
            year: "2024",
            category: "photography",
            shortDescription: "a photography series aiming to create an index for objects furnishing sky",
            fullDescription: "A photography project focuses on the industrial elements, searching for micro fragments within their imposing presence, details that, when isolated, reveal an unexpected aesthetic resonance. In their intersections and overlaps, a visual language emerges, reminiscre formal compositions, the project attempts to undo the numb efficiency imposed on their aesthetics. In doing so, it reclaims a sense of affect and engagement within an industrial language built for optimization rather than expression.",
            images: [
                "img/architecture_of_sky/architecture_of_sky.jpg",
                "img/architecture_of_sky/architectures_of_sky_2.jpg",
                "img/architecture_of_sky/architectures_of_sky_3.jpg"
            ]
        },
        {
            id: 2,
            title: "Work 02 - Abandoned Battle Ground",
            year: "2023",
            category: "photography",
            shortDescription: "a photographical research on rubbish, and urban exclusion",
            fullDescription: "The foundation of my project lies in the photographs I capture during walks in gentrified areas or areas in the danger of being gentrified such as Wedding, Moabit, Pankow, Neukölln, and Kreuzberg.\n\nBerlin is renowned for its positive qualities as well as its reputation for being dirty. Rather than merely perceiving this as a failure of the city, the concept of \"rubbish\" and its correspondent in state agenda, waste management, emerges as a form of urban exclusion. To highlight this exclusion, I adopt an archaeological approach to rubbish within the urban periphery. I focus on groups of objects that are out-of-use, discarded, and abandoned in the city.",
            images: [
                "img/abandoned_battleground/abandoned_battle_ground_1.jpg",
                "img/abandoned_battleground/abandoned_battle_ground_2.jpg",
                "img/abandoned_battleground/abandoned_battle_ground_3.jpg"
            ]
        },
        {
            id: 3,
            title: "Work 03 - hieroglyphs",
            year: "2022",
            category: "drawing",
            shortDescription: "an attempt to reclaim geometry and it's language, to create an affective symbolism out of them",
            fullDescription: "Content coming soon...",
            images: []
        },
        {
            id: 4,
            title: "Work 04 -Bodrum Merz-Bau",
            year: "2020",
            category: "INSTALLATION",
            shortDescription: "a proposal on transforming architectural objects of capitalist dystopia",
            fullDescription: "Content coming soon...",
            images: []
        }
    ]
};

// State management
let currentProject = null;
let currentSlideIndex = 0;

// DOM elements
const portfolioIndex = document.getElementById('portfolio-index');
const popupModal = document.getElementById('popup-modal');
const detailView = document.getElementById('detail-view');
const popupTitle = document.getElementById('popup-title');
const popupShortDescription = document.getElementById('popup-short-description');
const slideshowContainer = document.getElementById('slideshow-container');
const slideCounter = document.getElementById('slide-counter');
const prevSlideBtn = document.getElementById('prev-slide');
const nextSlideBtn = document.getElementById('next-slide');
const moreLink = document.getElementById('more-link');
const closePopupBtn = document.getElementById('close-popup');
const detailTitle = document.getElementById('detail-title');
const detailImages = document.getElementById('detail-images');
const closeDetailBtn = document.getElementById('close-detail');
const cvLink = document.getElementById('cv-link');
const cvView = document.getElementById('cv-view');
const cvContent = document.getElementById('cv-content');
const closeCvBtn = document.getElementById('close-cv');

// Initialize portfolio index
function initializeIndex() {
    portfolioData.projects.forEach((project) => {
        const li = document.createElement('li');
        li.textContent = project.title;
        li.addEventListener('click', () => openPopup(project));
        portfolioIndex.appendChild(li);
    });
}

// Open popup modal
function openPopup(project) {
    currentProject = project;
    currentSlideIndex = 0;

    // Set popup content
    popupTitle.textContent = `${project.title} (${project.year})`;
    popupShortDescription.textContent = project.shortDescription;

    // Handle images
    if (project.images && project.images.length > 0) {
        slideshowContainer.innerHTML = '';
        project.images.forEach((imgPath, index) => {
            const img = document.createElement('img');
            img.src = imgPath;
            img.alt = project.title;
            if (index !== 0) {
                img.classList.add('hidden');
            }
            slideshowContainer.appendChild(img);
        });
        updateSlideCounter();
        updateSlideButtons();
        document.querySelector('.image-slideshow').style.display = 'block';
    } else {
        slideshowContainer.innerHTML = '<p style="font-size: 14px; color: #666;">No images available</p>';
        document.querySelector('.image-slideshow').style.display = 'none';
    }

    // Show/hide More link based on whether full description exists
    if (project.fullDescription && project.fullDescription !== "Content coming soon...") {
        moreLink.style.display = 'inline';
    } else {
        moreLink.style.display = 'none';
    }

    // Show popup
    popupModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close popup modal
function closePopup() {
    popupModal.classList.remove('active');
    // Also close detail view if it's open
    if (detailView.classList.contains('active')) {
        closeDetailView();
    }
    document.body.style.overflow = 'auto';
    currentProject = null;
    currentSlideIndex = 0;
}

// Open detail view
function openDetailView() {
    if (!currentProject) return;

    detailTitle.textContent = `${currentProject.title} (${currentProject.year})`;
    
    // Add images to detail view with description after first image
    detailImages.innerHTML = '';
    if (currentProject.images && currentProject.images.length > 0) {
        currentProject.images.forEach((imgPath, index) => {
            const img = document.createElement('img');
            img.src = imgPath;
            img.alt = currentProject.title;
            detailImages.appendChild(img);
            
            // Insert description after first image
            if (index === 0) {
                const descDiv = document.createElement('div');
                descDiv.className = 'detail-description';
                // Split by double newlines for paragraphs, preserve single newlines as spaces
                const paragraphs = currentProject.fullDescription.split(/\n\n+/);
                descDiv.innerHTML = paragraphs.map(p => '<p>' + p.trim().replace(/\n/g, ' ') + '</p>').join('');
                detailImages.appendChild(descDiv);
            }
        });
    } else {
        detailImages.innerHTML = '<p style="font-size: 14px; color: #666;">No images available</p>';
        // Still show description if no images
        const descDiv = document.createElement('div');
        descDiv.className = 'detail-description';
        const paragraphs = currentProject.fullDescription.split(/\n\n+/);
        descDiv.innerHTML = paragraphs.map(p => '<p>' + p.trim().replace(/\n/g, ' ') + '</p>').join('');
        detailImages.appendChild(descDiv);
    }

    // Keep popup open and open detail view
    // Don't close popup - keep it open
    detailView.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close detail view
function closeDetailView() {
    detailView.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Slideshow navigation
function updateSlideCounter() {
    if (!currentProject || !currentProject.images || currentProject.images.length === 0) {
        slideCounter.textContent = '';
        return;
    }
    slideCounter.textContent = `${currentSlideIndex + 1} / ${currentProject.images.length}`;
}

function updateSlideButtons() {
    if (!currentProject || !currentProject.images || currentProject.images.length === 0) {
        prevSlideBtn.disabled = true;
        nextSlideBtn.disabled = true;
        return;
    }
    prevSlideBtn.disabled = currentSlideIndex === 0;
    nextSlideBtn.disabled = currentSlideIndex === currentProject.images.length - 1;
}

function showSlide(index) {
    const slides = slideshowContainer.querySelectorAll('img');
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.remove('hidden');
        } else {
            slide.classList.add('hidden');
        }
    });
    updateSlideCounter();
    updateSlideButtons();
}

function nextSlide() {
    if (!currentProject || !currentProject.images || currentProject.images.length === 0) return;
    if (currentSlideIndex < currentProject.images.length - 1) {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }
}

function prevSlide() {
    if (!currentProject || !currentProject.images || currentProject.images.length === 0) return;
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        showSlide(currentSlideIndex);
    }
}

// Event listeners
prevSlideBtn.addEventListener('click', prevSlide);
nextSlideBtn.addEventListener('click', nextSlide);
moreLink.addEventListener('click', (e) => {
    e.preventDefault();
    openDetailView();
});
closePopupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
});
closeDetailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeDetailView();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (popupModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closePopup();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    } else if (detailView.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeDetailView();
        }
    } else if (cvView.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeCvView();
        }
    }
});

// Close modals when clicking outside content (but not on the popup content itself)
popupModal.addEventListener('click', (e) => {
    // Only close if clicking on the modal background, not the content
    if (e.target === popupModal) {
        closePopup();
    }
});

detailView.addEventListener('click', (e) => {
    if (e.target === detailView) {
        closeDetailView();
    }
});

// Open CV view
function openCvView() {
    // CV content placeholder - you can replace this with actual CV content
    cvContent.innerHTML = '<p>CV content coming soon...</p>';
    cvView.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close CV view
function closeCvView() {
    cvView.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for CV
cvLink.addEventListener('click', (e) => {
    e.preventDefault();
    openCvView();
});

closeCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeCvView();
});

// Close CV when clicking outside
cvView.addEventListener('click', (e) => {
    if (e.target === cvView) {
        closeCvView();
    }
});


// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeIndex();
});

