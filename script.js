function calculateDays() {
    const startDate = new Date(2025, 7, 8);
    const currentDate = new Date();

    startDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    const timeDiff = currentDate - startDate;
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    return daysPassed > 0 ? daysPassed : 0;
}

function updateCounter() {
    const days = calculateDays();
    document.getElementById('day-counter').textContent = days;
}

function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrixSymbols = ['❤', '♥', '✿', '❀', '✥', '@', '$', '#', '&', '*'];
    const fontSize = 18;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff6b6b';
        ctx.font = `bold ${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixSymbols[Math.floor(Math.random() * matrixSymbols.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (text === '❤' || text === '♥') {
                ctx.fillStyle = '#ff3a3a';
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                ctx.fillStyle = '#ff6b6b';
            }
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 50);
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
function setupMessageBox() {
    const messageBox = document.getElementById('message-box');
    const closeBtn = document.getElementById('close-btn');
    const notification = document.getElementById('birthday-notification');
    
    notification.addEventListener('click', function() {
        messageBox.classList.add('show');
    });
    closeBtn.addEventListener('click', function() {
        messageBox.classList.remove('show');
    });
    window.addEventListener('click', function(e) {
        if (e.target === messageBox) {
            messageBox.classList.remove('show');
        }
    });
}

function createHeartRain() {
    const heartRain = document.getElementById('heart-rain');
    const heartCount = 100;
    
    heartRain.innerHTML = '';
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-drop');
        heart.innerHTML = '❤';
        
        const leftPos = Math.random() * 100;
        heart.style.left = `${leftPos}vw`;
        
        const delay = Math.random() * 5;
        heart.style.animationDelay = `${delay}s`;
        
        const duration = 2 + Math.random() * 3;
        heart.style.animationDuration = `${duration}s`;
        
        const size = 1 + Math.random() * 3;
        heart.style.fontSize = `${size}rem`;
        
        heartRain.appendChild(heart);
    }
    setTimeout(() => {
        heartRain.innerHTML = '';
    }, 7000);
}

window.onload = function() {
    updateCounter();
    initMatrix();
    setupMessageBox();
    document.querySelector('.heart-container').addEventListener('click', function() {
        createHeartRain();
    });
    setInterval(updateCounter, 60000);
};