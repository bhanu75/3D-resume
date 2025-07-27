// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = Math.random() * 6 + 2 + 'px';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}
createParticles();

// Resume Data - Updated with Bhanu Tripathi's information
const resumeData = {
    profile: {
        name: "Bhanu Tripathi",
        title: "Frontend Developer | UI Engineer | Web Developer",
        summary: "Experienced Frontend Developer with 7+ years in digital, client-facing, and operational roles. Skilled in crafting responsive user interfaces using HTML, CSS, and JavaScript, along with strong experience in client communication, data handling, Excel (MIS), and cross-functional collaboration.",
        location: "490 Amba Mata Scheme, Udaipur, Rajasthan",
        email: "bhanutripathi91@gmail.com",
        phone: "+91-7597145489"
    },
    experience: [
        {
            company: "Taj Finance",
            position: "Frontend Developer & Tech Associate",
            duration: "Feb 2023 – Present",
            description: "Developed responsive and user-friendly internal tools using HTML, CSS, and JavaScript. Collaborated with cross-functional teams to enhance digital workflows. Supported UI improvement for business applications."
        },
        {
            company: "Reliance Retail",
            position: "Sales Officer",
            duration: "Aug 2021 – Jan 2023",
            description: "Handled product placement, promotions, and daily operations. Tracked performance data using Excel. Contributed to campaign planning and supported regional sales through client interaction."
        },
        {
            company: "Taj Finance",
            position: "Frontend Support & Ops Assistant",
            duration: "May 2019 – Jul 2021",
            description: "Updated static pages and digitized internal forms to streamline workflows. Assisted with UI enhancements for customer-facing tools. Coordinated with operations and tech support teams."
        },
        {
            company: "Taj Finance",
            position: "Trainee – Web & Data Support",
            duration: "Apr 2018 – Apr 2019",
            description: "Maintained HTML content for internal platforms. Supported CRM tool updates and managed structured data entry. Helped resolve basic web issues under team supervision."
        }
    ],
    skills: [
        // Technical
        { name: "HTML", level: 95, color: 0xe34c26 },
        { name: "CSS", level: 90, color: 0x264de4 },
        { name: "JavaScript", level: 88, color: 0xf7df1e },
        { name: "Git", level: 80, color: 0xf1502f },
        { name: "Figma", level: 75, color: 0xa259ff },
        { name: "Canva", level: 70, color: 0x00c4cc },

        // Tools
        { name: "Excel", level: 90, color: 0x217346 },
        { name: "MIS", level: 85, color: 0x34495e },
        { name: "Zoho CRM", level: 80, color: 0xef3c3c },
        { name: "Salesforce", level: 75, color: 0x00a1e0 },
        { name: "Zendesk", level: 70, color: 0x03363d },

        // Soft Skills
        { name: "Client Communication", level: 90, color: 0x3498db },
        { name: "Leadership", level: 85, color: 0x2ecc71 },
        { name: "Team Collaboration", level: 88, color: 0xf39c12 }
    ],
    education: [
        {
            degree: "B.Tech in Engineering",
            institution: "Rajasthan Technical University, Kota",
            year: "2019",
            grade: "Completed undergraduate studies"
        }
    ],
    projects: [
        {
            name: "Personal Portfolio",
            tech: "HTML, CSS, JavaScript",
            description: "Built and deployed frontend projects with responsive layout, form validation, and JavaScript components.",
            link: "https://bt12.netlify.app"
        }
    ],
    volunteer: [
        {
            name: "Aarohi Seva Sanstha",
            role: "Volunteer – Social Media & Outreach",
            duration: "2022 – Present",
            work: "Manages animal welfare campaigns online. Created content to boost adoptions and awareness. Contributed during 2022 Lumpy Skin Disease outbreak by coordinating posts and mobilizing local support."
        }
    ]
};

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('container').appendChild(renderer.domElement);

// Manual camera controls (no OrbitControls needed)
let isMouseDown = false;
let mouseXOnMouseDown = 0;
let mouseYOnMouseDown = 0;
let targetRotationX = 0;
let targetRotationY = 0;
let targetRotationOnMouseDownX = 0;
let targetRotationOnMouseDownY = 0;

// Camera position
camera.position.z = 45;
camera.position.y = 8;

// Enhanced Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(15, 15, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight1 = new THREE.PointLight(0x4ecdc4, 0.5, 100);
pointLight1.position.set(-20, 10, 20);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xff6b9d, 0.5, 100);
pointLight2.position.set(20, 10, -20);
scene.add(pointLight2);

// Variables
let currentSection = 'profile';
const sectionObjects = {};

// Enhanced text texture function with better text wrapping
function createTextTexture(text, fontSize = 60, color = '#ffffff', maxWidth = 1800) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 2048;
    canvas.height = 1024;
    
    // Gradient background
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(30, 60, 114, 0.95)');
    gradient.addColorStop(0.5, 'rgba(45, 55, 72, 0.95)');
    gradient.addColorStop(1, 'rgba(26, 32, 44, 0.95)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Enhanced border with glow effect
    context.strokeStyle = '#4ecdc4';
    context.lineWidth = 6;
    context.shadowColor = '#4ecdc4';
    context.shadowBlur = 20;
    context.strokeRect(30, 30, canvas.width-60, canvas.height-60);
    context.shadowBlur = 0;
    
    // Text styling
    context.fillStyle = color;
    context.font = `bold ${fontSize}px Arial, sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.shadowColor = 'rgba(0, 0, 0, 0.8)';
    context.shadowBlur = 6;
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    
    // Better text wrapping
    const lines = [];
    const paragraphs = text.split('\n');
    
    paragraphs.forEach(paragraph => {
        if (paragraph.length === 0) {
            lines.push('');
            return;
        }
        
        const words = paragraph.split(' ');
        let currentLine = '';
        
        words.forEach(word => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const metrics = context.measureText(testLine);
            
            if (metrics.width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        });
        
        if (currentLine) {
            lines.push(currentLine);
        }
    });
    
    // Draw text with proper spacing
    const lineHeight = fontSize * 1.3;
    const totalHeight = lines.length * lineHeight;
    const startY = (canvas.height - totalHeight) / 2 + lineHeight / 2;
    
    lines.forEach((line, index) => {
        context.fillText(line, canvas.width/2, startY + index * lineHeight);
    });
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
}

// Create profile section
function createProfileSection() {
    const group = new THREE.Group();
    
    // Main profile card
    const cardGeometry = new THREE.BoxGeometry(26, 18, 1.5);
    const cardTexture = createTextTexture(`${resumeData.profile.name}\n${resumeData.profile.title}\n\n📍 ${resumeData.profile.location}`, 70, '#ffffff');
    const cardMaterial = new THREE.MeshLambertMaterial({ 
        map: cardTexture,
        transparent: true,
        opacity: 0.95
    });
    const card = new THREE.Mesh(cardGeometry, cardMaterial);
    card.position.y = 3;
    card.castShadow = true;
    group.add(card);
    
    // Summary card
    const summaryGeometry = new THREE.BoxGeometry(34, 10, 1.2);
    const summaryTexture = createTextTexture(resumeData.profile.summary, 50, '#4ecdc4');
    const summaryMaterial = new THREE.MeshLambertMaterial({ 
        map: summaryTexture,
        transparent: true,
        opacity: 0.95
    });
    const summaryCard = new THREE.Mesh(summaryGeometry, summaryMaterial);
    summaryCard.position.y = -10;
    summaryCard.castShadow = true;
    group.add(summaryCard);
    
    // Contact info
    const contactGeometry = new THREE.BoxGeometry(22, 8, 1.2);
    const contactTexture = createTextTexture(`📧 ${resumeData.profile.email}\n📱 ${resumeData.profile.phone}`, 40, '#f39c12');
    const contactMaterial = new THREE.MeshLambertMaterial({ 
        map: contactTexture,
        transparent: true,
        opacity: 0.95
    });
    const contactCard = new THREE.Mesh(contactGeometry, contactMaterial);
    contactCard.position.y = -22;
    contactCard.castShadow = true;
    group.add(contactCard);
    
    return group;
}

// Create experience section
function createExperienceSection() {
    const group = new THREE.Group();
    
    resumeData.experience.forEach((exp, index) => {
        const cardGeometry = new THREE.BoxGeometry(50, 14, 1.5);
        const cardTexture = createTextTexture(`🏢 ${exp.company}\n\n👨‍💻 ${exp.position}\n📅 ${exp.duration}\n\n${exp.description}`, 40, '#e74c3c');
        const cardMaterial = new THREE.MeshLambertMaterial({ 
            map: cardTexture,
            color: new THREE.Color().setHSL(index * 0.25, 0.7, 0.9),
            transparent: true,
            opacity: 0.95
        });
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
        
        // Better positioning for 4 cards
        const positions = [
            { x: -20, y: 8, z: 5 },
            { x: 20, y: 8, z: -5 },
            { x: -20, y: -8, z: -5 },
            { x: 20, y: -8, z: 5 }
        ];
        
        const pos = positions[index] || { x: 0, y: 0, z: 0 };
        card.position.set(pos.x, pos.y, pos.z);
        card.rotation.y = index * 0.3;
        card.castShadow = true;
        
        group.add(card);
    });
    
    return group;
}

// Create skills section
function createSkillsSection() {
    const group = new THREE.Group();
    
    resumeData.skills.forEach((skill, index) => {
        // 3D skill bar
        const barWidth = skill.level / 4;
        const barGeometry = new THREE.BoxGeometry(barWidth, 2.5, 5);
        const barMaterial = new THREE.MeshLambertMaterial({ 
            color: skill.color,
            transparent: true,
            opacity: 0.8
        });
        const bar = new THREE.Mesh(barGeometry, barMaterial);
        
        // Skill label
        const labelGeometry = new THREE.PlaneGeometry(14, 4);
        const labelTexture = createTextTexture(`${skill.name}\n${skill.level}%`, 55, '#2ecc71');
        const labelMaterial = new THREE.MeshLambertMaterial({ 
            map: labelTexture,
            transparent: true,
            opacity: 0.95
        });
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        
        const y = 18 - index * 3;
        bar.position.set(barWidth/2, y, 0);
        label.position.set(-18, y, 0);
        
        bar.castShadow = true;
        label.castShadow = true;
        
        group.add(bar);
        group.add(label);
    });
    
    return group;
}

// Create education section
function createEducationSection() {
    const group = new THREE.Group();
    
    resumeData.education.forEach((edu, index) => {
        const cardGeometry = new THREE.BoxGeometry(28, 16, 1.5);
        const cardTexture = createTextTexture(`🎓 ${edu.degree}\n\n🏫 ${edu.institution}\n\n📅 Year: ${edu.year}\n\n⭐ ${edu.grade}`, 50, '#9b59b6');
        const cardMaterial = new THREE.MeshLambertMaterial({ 
            map: cardTexture,
            color: 0x3498db,
            transparent: true,
            opacity: 0.95
        });
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
        
        card.position.y = index * 18 - 9;
        card.rotation.x = index * 0.1;
        card.castShadow = true;
        
        group.add(card);
    });
    
    return group;
}

// Create projects section
function createProjectsSection() {
    const group = new THREE.Group();
    
    // Add volunteer work as additional project
    const allProjects = [...resumeData.projects];
    if (resumeData.volunteer && resumeData.volunteer.length > 0) {
        resumeData.volunteer.forEach(vol => {
            allProjects.push({
                name: vol.name,
                tech: "Social Media & Content Creation",
                description: `${vol.role} (${vol.duration}): ${vol.work}`,
                link: "Volunteer Work"
            });
        });
    }
    
    allProjects.forEach((project, index) => {
        const cardGeometry = new THREE.BoxGeometry(24, 18, 1.8);
        const cardTexture = createTextTexture(`💻 ${project.name}\n\n🔧 Tech: ${project.tech}\n\n📝 ${project.description}\n\n🔗 ${project.link}`, 40, '#1abc9c');
        const cardMaterial = new THREE.MeshLambertMaterial({ 
            map: cardTexture,
            color: new THREE.Color().setHSL(index * 0.3, 0.8, 0.8),
            transparent: true,
            opacity: 0.95
        });
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
        
        const angle = (index / allProjects.length) * Math.PI * 2;
        card.position.x = Math.cos(angle) * 25;
        card.position.z = Math.sin(angle) * 25;
        card.position.y = Math.sin(index * 2) * 5;
        card.rotation.y = -angle;
        card.castShadow = true;
        
        group.add(card);
    });
    
    return group;
}

// Create contact section (enhanced)
function createContactSection() {
    const group = new THREE.Group();
    
    // Contact card
    const cardGeometry = new THREE.BoxGeometry(30, 20, 2);
    const cardTexture = createTextTexture(`📞 Contact Bhanu Tripathi\n\n📧 ${resumeData.profile.email}\n📱 ${resumeData.profile.phone}\n📍 ${resumeData.profile.location}\n\n💼 ${resumeData.profile.title}\n\n✨ Ready for new opportunities!`, 40, '#ffffff');
    const cardMaterial = new THREE.MeshLambertMaterial({ 
        map: cardTexture,
        transparent: true,
        opacity: 0.95
    });
    const card = new THREE.Mesh(cardGeometry, cardMaterial);
    card.castShadow = true;
    group.add(card);
    
    return group;
}

// Initialize sections
sectionObjects.profile = createProfileSection();
sectionObjects.experience = createExperienceSection();
sectionObjects.skills = createSkillsSection();
sectionObjects.education = createEducationSection();
sectionObjects.projects = createProjectsSection();
sectionObjects.contact = createContactSection();

// Add only current section to scene
scene.add(sectionObjects[currentSection]);

// Mouse controls for camera rotation
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Mouse drag controls
document.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    mouseXOnMouseDown = event.clientX - window.innerWidth / 2;
    mouseYOnMouseDown = event.clientY - window.innerHeight / 2;
    targetRotationOnMouseDownX = targetRotationX;
    targetRotationOnMouseDownY = targetRotationY;
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    if (isMouseDown) {
        const mouseX = event.clientX - window.innerWidth / 2;
        const mouseY = event.clientY - window.innerHeight / 2;
        targetRotationX = targetRotationOnMouseDownX + (mouseY - mouseYOnMouseDown) * 0.02;
        targetRotationY = targetRotationOnMouseDownY + (mouseX - mouseXOnMouseDown) * 0.02;
    }
});

// Zoom controls
document.addEventListener('wheel', (event) => {
    camera.position.z += event.deltaY * 0.1;
    camera.position.z = Math.max(20, Math.min(100, camera.position.z));
});

// Enhanced click interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(sectionObjects[currentSection].children);
    
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        
        // Enhanced animation
        const originalRotation = { x: clickedObject.rotation.x, y: clickedObject.rotation.y, z: clickedObject.rotation.z };
        const originalScale = clickedObject.scale.clone();
        
        // Rotation animation
        clickedObject.rotation.x += 0.5;
        clickedObject.rotation.y += 0.5;
        clickedObject.scale.set(1.3, 1.3, 1.3);
        
        setTimeout(() => {
            clickedObject.rotation.x = originalRotation.x;
            clickedObject.rotation.y = originalRotation.y;
            clickedObject.rotation.z = originalRotation.z;
            clickedObject.scale.copy(originalScale);
        }, 400);
        
        // Section-specific interactions
        if (currentSection === 'profile') {
            alert(`Profile Information\n\n👨‍💻 ${resumeData.profile.name}\n🎯 ${resumeData.profile.title}\n📧 ${resumeData.profile.email}\n📱 ${resumeData.profile.phone}\n📍 ${resumeData.profile.location}\n\n📝 Summary:\n${resumeData.profile.summary}`);
        }
        else if (currentSection === 'experience') {
            const index = sectionObjects[currentSection].children.indexOf(clickedObject);
            const exp = resumeData.experience[index];
            if (exp) {
                alert(`Work Experience Details\n\n🏢 Company: ${exp.company}\n👨‍💻 Position: ${exp.position}\n📅 Duration: ${exp.duration}\n\n📋 Description:\n${exp.description}`);
            }
        }
        else if (currentSection === 'skills') {
            const index = Math.floor(sectionObjects[currentSection].children.indexOf(clickedObject) / 2);
            const skill = resumeData.skills[index];
            if (skill) {
                alert(`Skill Details\n\n💪 Skill: ${skill.name}\n📊 Proficiency: ${skill.level}%\n\n✨ This is one of my core professional skills!`);
            }
        }
        else if (currentSection === 'education') {
            const index = sectionObjects[currentSection].children.indexOf(clickedObject);
            const edu = resumeData.education[index];
            if (edu) {
                alert(`Education Details\n\n🎓 Degree: ${edu.degree}\n🏫 Institution: ${edu.institution}\n📅 Year: ${edu.year}\n⭐ ${edu.grade}`);
            }
        }
        else if (currentSection === 'projects') {
            const index = sectionObjects[currentSection].children.indexOf(clickedObject);
            const allProjects = [...resumeData.projects];
            if (resumeData.volunteer && resumeData.volunteer.length > 0) {
                resumeData.volunteer.forEach(vol => {
                    allProjects.push({
                        name: vol.name,
                        tech: "Social Media & Content Creation",
                        description: `${vol.role} (${vol.duration}): ${vol.work}`,
                        link: "Volunteer Work"
                    });
                });
            }
            const project = allProjects[index];
            if (project) {
                alert(`Project Details\n\n💻 Project: ${project.name}\n🔧 Technology: ${project.tech}\n\n📝 Description:\n${project.description}\n\n🔗 Link: ${project.link}`);
            }
        }
        else if (currentSection === 'contact') {
            alert(`Contact Bhanu Tripathi\n\n📧 Email: ${resumeData.profile.email}\n📱 Phone: ${resumeData.profile.phone}\n📍 Location: ${resumeData.profile.location}\n\n💼 ${resumeData.profile.title}\n\n✨ Available for new opportunities!\n\nFeel free to reach out for collaborations or job opportunities.`);
        }
    }
});

// Section switching function
function showSection(sectionName) {
    // Remove current section with fade effect
    scene.remove(sectionObjects[currentSection]);
    
    // Add new section
    currentSection = sectionName;
    scene.add(sectionObjects[currentSection]);
    
    // Update title
    const titles = {
        profile: 'My Profile',
        experience: 'Work Experience', 
        skills: 'Technical Skills',
        education: 'Education Background',
        projects: 'Projects & Volunteer Work',
        contact: 'Contact Information'
    };
    document.getElementById('sectionTitle').textContent = titles[sectionName];
    
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Enhanced animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Animate current section objects
    if (sectionObjects[currentSection]) {
        sectionObjects[currentSection].children.forEach((child, index) => {
            // Gentle rotation
            child.rotation.y += 0.003;
            
            // Floating animation for skills section
            if (currentSection === 'skills') {
                child.position.x += Math.sin(Date.now() * 0.001 + index) * 0.001;
            }
            
            // Gentle breathing effect
            const breathe = Math.sin(Date.now() * 0.002 + index) * 0.02 + 1;
            child.scale.y = breathe;
        });
    }

    // Update camera rotation based on mouse drag
    if (sectionObjects[currentSection]) {
        sectionObjects[currentSection].rotation.x += (targetRotationX - sectionObjects[currentSection].rotation.x) * 0.05;
        sectionObjects[currentSection].rotation.y += (targetRotationY - sectionObjects[currentSection].rotation.y) * 0.05;
    }
    
    // Smooth camera movement based on mouse position
    camera.position.x += (mouseX * 4 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 4 + 8 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);
    
    // Animate lights
    pointLight1.position.x = Math.sin(Date.now() * 0.001) * 30;
    pointLight1.position.z = Math.cos(Date.now() * 0.001) * 30;
    pointLight2.position.x = Math.cos(Date.now() * 0.0015) * 25;
    pointLight2.position.z = Math.sin(Date.now() * 0.0015) * 25;

    renderer.render(scene, camera);
}

animate();

// Window resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
