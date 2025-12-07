// 当页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 创建背景爱心
    createHearts();
    
    // 自动加载照片
    loadPhotos();
    
    // 创建彩带效果
    createConfetti();
    
    // 添加随机爱心
    addRandomHearts();
    
    // 播放进入音效（可选）
    playEnterSound();
});

// 创建背景飘浮爱心
function createHearts() {
    const heartsBg = document.querySelector('.hearts-bg');
    const hearts = ['❤️', '💖', '💕', '💗', '💓', '💞'];
    
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.1;
        heart.style.animation = `float ${Math.random() * 20 + 10}s linear infinite`;
        heart.style.animationDelay = Math.random() * 5 + 's';
        heartsBg.appendChild(heart);
    }
}

// 加载照片
function loadPhotos() {
    const photoGrid = document.getElementById('photoGrid');
    const photos = [];
    
    // 假设你有6张照片，命名为 photo1.jpg, photo2.jpg...
    for (let i = 1; i <= 6; i++) {
        photos.push(`photos/${i}.jpg`);
    }
    
    photos.forEach(photo => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'photo-item';
        
        const img = document.createElement('img');
        img.src = photo;
        img.alt = "我们的回忆";
        img.loading = "lazy";
        
        // 点击放大效果
        img.addEventListener('click', function() {
            openLightbox(photo);
        });
        
        imgContainer.appendChild(img);
        photoGrid.appendChild(imgContainer);
    });
}

// 播放音乐
function playMusic() {
    const audio = document.getElementById('birthdaySong');
    const btn = document.querySelector('.music-btn');
    
    if (audio.paused) {
        audio.play();
        btn.innerHTML = '<i class="fas fa-pause"></i> 暂停音乐';
        btn.style.background = 'linear-gradient(45deg, #ff4757, #ff6b8b)';
        createMusicVisualizer();
    } else {
        audio.pause();
        btn.innerHTML = '<i class="fas fa-play"></i> 播放生日快乐歌';
        btn.style.background = 'linear-gradient(45deg, #ff6b8b, #ff4757)';
    }
}

// 音量控制
function changeVolume() {
    const audio = document.getElementById('birthdaySong');
    const volume = document.getElementById('volume').value;
    audio.volume = volume;
    
    // 更新音量图标
    const volumeIcon = document.querySelector('.volume-icon i');
    if (volume == 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

// 创建彩带效果
function createConfetti() {
    const container = document.querySelector('.confetti-container');
    const colors = ['#ff6b8b', '#ff9a9e', '#4cd137', '#3498db', '#f1c40f', '#9b59b6'];
    const confettiTypes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        const type = confettiTypes[Math.floor(Math.random() * confettiTypes.length)];
        
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.width = Math.random() * 15 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = type === 'circle' ? '50%' : '0';
        
        if (type === 'triangle') {
            confetti.style.width = '0';
            confetti.style.height = '0';
            confetti.style.borderLeft = '8px solid transparent';
            confetti.style.borderRight = '8px solid transparent';
            confetti.style.borderBottom = '15px solid ' + colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = 'transparent';
        }
        
        // 动画
        confetti.style.animation = `confettiFall ${Math.random() * 5 + 3}s linear infinite`;
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        
        container.appendChild(confetti);
    }
    
    // 添加动画关键帧
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(-100px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// 添加随机爱心特效
function addRandomHearts() {
    document.addEventListener('click', function(e) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = '25px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'heartFloat 1.5s ease-out forwards';
        
        document.body.appendChild(heart);
        
        // 移除爱心元素
        setTimeout(() => {
            heart.remove();
        }, 1500);
    });
}

// 点击照片放大
function openLightbox(src) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 0 30px rgba(255,255,255,0.3);
    `;
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    // 点击关闭
    lightbox.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
}

// 播放进入音效
function playEnterSound() {
    // 这里可以添加一个简短的进入音效
    const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQ=');
    audio.volume = 0.3;
    audio.play().catch(e => console.log("自动播放被阻止，需要用户交互"));
}

// 生日倒计时（如果知道具体日期）
function setupCountdown() {
    const birthday = new Date('2024-XX-XX'); // 替换为她的生日日期
    const now = new Date();
    
    if (birthday > now) {
        const diff = birthday - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        const countdown = document.createElement('div');
        countdown.className = 'countdown';
        countdown.innerHTML = `距离生日还有：${days}天`;
        countdown.style.cssText = `
            text-align: center;
            font-size: 1.5em;
            color: #ff6b8b;
            margin: 20px 0;
            font-weight: bold;
        `;
        
        document.querySelector('.header').appendChild(countdown);
    }
}

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    const audio = document.getElementById('birthdaySong');
    
    switch(e.key) {
        case ' ':
            e.preventDefault();
            playMusic();
            break;
        case 'ArrowUp':
            e.preventDefault();
            if (audio.volume < 1) audio.volume = Math.min(1, audio.volume + 0.1);
            break;
        case 'ArrowDown':
            e.preventDefault();
            if (audio.volume > 0) audio.volume = Math.max(0, audio.volume - 0.1);
            break;
    }
});