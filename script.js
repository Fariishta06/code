// 英语阅读互动学习 - 核心 JavaScript

// ==================== 数据定义 ====================
const textbookData = {
    '必修一': {
        title: '人教版 必修一',
        chapters: [
            { id: 'welcome', name: 'Welcome Unit', desc: '高中生活初体验', icon: '🌟' },
            { id: 'unit1', name: 'Unit 1', desc: 'Teenage Life', icon: '📝' },
            { id: 'unit2', name: 'Unit 2', desc: 'Travelling Around', icon: '🌍' },
            { id: 'unit3', name: 'Unit 3', desc: 'Sports and Fitness', icon: '💪' },
            { id: 'unit4', name: 'Unit 4', desc: 'Natural Disasters', icon: '🌲' },
            { id: 'unit5', name: 'Unit 5', desc: 'Languages Around the World', icon: '🎭' }
        ]
    },
    '必修二': {
        title: '人教版 必修二',
        chapters: [
            { id: 'unit1', name: 'Unit 1', desc: 'Cultural Heritage', icon: '🏛️' },
            { id: 'unit2', name: 'Unit 2', desc: 'Wildlife Protection', icon: '🦁' },
            { id: 'unit3', name: 'Unit 3', desc: 'The Internet', icon: '💻' },
            { id: 'unit4', name: 'Unit 4', desc: 'History and Traditions', icon: '📜' },
            { id: 'unit5', name: 'Unit 5', desc: 'Music', icon: '🎵' }
        ]
    },
    '必修三': {
        title: '人教版 必修三',
        chapters: [
            { id: 'unit1', name: 'Unit 1', desc: 'Festivals and Celebrations', icon: '🎉' },
            { id: 'unit2', name: 'Unit 2', desc: 'Morals and Virtues', icon: '❤️' },
            { id: 'unit3', name: 'Unit 3', desc: 'Diverse Cultures', icon: '🌏' },
            { id: 'unit4', name: 'Unit 4', desc: 'Space Exploration', icon: '🚀' },
            { id: 'unit5', name: 'Unit 5', desc: 'The Value of Money', icon: '💰' }
        ]
    }
};

// Welcome Unit 分镜脚本数据
const welcomeUnitScenes = [
    {
        id: 1,
        setting: '晚上10:45，卧室',
        shot: '近景',
        video: 'file:///D:/应用/SOLO%20Coder/videos/scene1.mp4',
        imagePrompt: '日系校园漫画风格，高中生坐在书桌前，双手交握放在桌上，眼神飘忽，脸上带着焦虑表情。桌上有翻开的笔记本，字迹清秀。暖黄色床头灯照明，背景是简洁的卧室墙面和小摆件。整体色调柔和，带轻微焦虑感。',
        english: "So this is it—senior high school at last! I'm not outgoing so I'm a little anxious right now. I want to make a good first impression. Will I make any friends? What if no one talks to me?",
        chinese: "就这样了——终于上高中了！我性格不外向，所以现在有点焦虑。我想给人留下好的第一印象。我会交到朋友吗？如果没人跟我说话怎么办？",
        question: {
            text: "How does the narrator feel at the beginning?",
            chinese: " narrator 一开始感觉如何？",
            options: [
                { id: 'A', text: "Excited and confident", chinese: "兴奋且自信" },
                { id: 'B', text: "Anxious and worried", chinese: "焦虑且担心" }
            ],
            correctAnswer: 'B',
            explanation: "The narrator says 'I'm a little anxious right now' and asks 'Will I make any friends? What if no one talks to me?'",
            explanationChinese: " narrator 说'我现在有点焦虑'，并问'我会交到朋友吗？如果没人跟我说话怎么办？'"
        }
    },
    {
        id: 2,
        setting: '上午，教室',
        shot: '中景+特写',
        video: 'file:///D:/应用/SOLO%20Coder/videos/scene2.mp4',
        imagePrompt: '明亮的教室场景，左侧中景显示同学们坐直听课，讲台上站着温和的中年男数学老师，戴眼镜，正在微笑说话，手势舒展。右侧特写显示主角抬头看老师，脸上焦虑减轻，露出轻微笑意。课桌椅整齐，黑板上写着简单的数学公式。色调明亮温暖。',
        english: "I just had my first maths class at senior high school! The class was difficult, but the teacher was kind and friendly. He even told us a funny story, and everyone laughed so much! I found most of my classmates and teachers friendly and helpful.",
        chinese: "我刚上了高中的第一节数学课！课程很难，但老师亲切友好。他甚至给我们讲了一个有趣的故事，大家都笑得很开心！我发现大多数同学和老师都很友好、乐于助人。",
        question: {
            text: "What did the maths teacher do in class?",
            chinese: "数学老师在课堂上做了什么？",
            options: [
                { id: 'A', text: "Gave a difficult test", chinese: "进行了一次困难的测试" },
                { id: 'B', text: "Told a funny story", chinese: "讲了一个有趣的故事" }
            ],
            correctAnswer: 'B',
            explanation: "The text says 'He even told us a funny story, and everyone laughed so much!'",
            explanationChinese: "文中说'他甚至给我们讲了一个有趣的故事，大家都笑得很开心！'"
        }
    },
    {
        id: 3,
        setting: '下午，科学实验室',
        shot: '近景+侧写',
        video: 'file:///D:/应用/SOLO%20Coder/videos/scene3.mp4',
        imagePrompt: '干净整洁的科学实验室，主角坐在实验台前，面前放着试管、烧杯等实验器材。主角眉头紧锁，眼神专注于器材，表情略显烦躁。右侧显示旁边的男生侧身对着主角，嘴巴张开似乎在说话，手部有手势，表情随意。实验室白光照明，背景可模糊处理实验器材。',
        english: "This afternoon, we had our chemistry class in the science lab. The lab is new and the lesson was great, but the guy next to me tried to talk to me the whole time. I couldn't concentrate on the experiment. I really wanted to tell him to please be quiet and leave me alone!",
        chinese: "今天下午，我们在科学实验室上了化学课。实验室是新的，课程也很棒，但我旁边的男生一直试图跟我说话。我无法集中精力做实验。我真的很想告诉他请安静点，让我一个人待着！",
        question: {
            text: "Why couldn't the narrator concentrate on the experiment?",
            chinese: "为什么 narrator 无法集中精力做实验？",
            options: [
                { id: 'A', text: "The experiment was too difficult", chinese: "实验太难了" },
                { id: 'B', text: "The guy next to him kept talking", chinese: "旁边的男生一直说话" }
            ],
            correctAnswer: 'B',
            explanation: "The text says 'the guy next to me tried to talk to me the whole time. I couldn't concentrate on the experiment.'",
            explanationChinese: "文中说'我旁边的男生一直试图跟我说话。我无法集中精力做实验。'"
        }
    },
    {
        id: 4,
        setting: '晚上，卧室（同第一帧场景）',
        shot: '近景',
        video: 'file:///D:/应用/SOLO%20Coder/videos/scene4.mp4',
        imagePrompt: '同第一帧的卧室场景，暖黄色灯光。主角坐在书桌前，双手放在桌上，脸上带着轻松的笑容，眼神明亮，没有了上午的焦虑。眉头舒展，嘴角上扬，表情轻松自信。笔记本上有新的字迹补充完整。色调比第一帧更温暖明亮，突出情绪的转变。',
        english: "What a day! This morning, I was worried that no one would talk to me. But I was wrong. I didn't feel awkward or frightened at all. I miss my friends from junior high school, but I believe I will make new friends here, and there's a lot to explore at senior high. I feel much more confident than I felt this morning. I think that tomorrow will be a great day!",
        chinese: "多么充实的一天！今天早上，我还担心没人会跟我说话。但我错了。我一点也不觉得尴尬或害怕。我想念初中的朋友，但我相信我会在这里交到新朋友，高中还有很多值得探索的地方。我感觉比今天早上自信多了。我想明天会是美好的一天！",
        question: {
            text: "How does the narrator feel at the end of the day?",
            chinese: " narrator 在一天结束时感觉如何？",
            options: [
                { id: 'A', text: "More confident", chinese: "更自信了" },
                { id: 'B', text: "Still worried", chinese: "仍然很担心" }
            ],
            correctAnswer: 'A',
            explanation: "The narrator says 'I feel much more confident than I felt this morning' and 'I think that tomorrow will be a great day!'",
            explanationChinese: " narrator 说'我感觉比今天早上自信多了'和'我想明天会是美好的一天！'"
        }
    }
];

// ==================== 全局状态 ====================
let currentState = {
    currentBook: null,
    currentChapter: null,
    currentScene: 0,
    isPlaying: false,
    speechUtterance: null,
    answeredQuestions: {},  // 记录已回答的问题
    currentAnswer: null     // 当前选择的答案
};

// ==================== 页面切换 ====================
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    document.getElementById(pageId).classList.add('active');
    
    // 停止音频播放
    stopAudio();
}

// ==================== 课本选择 ====================
function initTextbookPage() {
    const cards = document.querySelectorAll('.textbook-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const bookId = card.dataset.book;
            selectBook(bookId);
        });
    });
}

function selectBook(bookId) {
    currentState.currentBook = bookId;
    const bookData = textbookData[bookId];
    
    // 更新章节页面标题
    document.getElementById('chapterTitle').textContent = bookData.title;
    
    // 渲染章节列表
    renderChapterList(bookData.chapters);
    
    // 切换到章节页面
    showPage('chapterPage');
}

function renderChapterList(chapters) {
    const chapterList = document.querySelector('.chapter-list');
    chapterList.innerHTML = chapters.map(chapter => `
        <div class="chapter-item" data-chapter="${chapter.id}">
            <span class="chapter-icon">${chapter.icon}</span>
            <div class="chapter-info">
                <h3>${chapter.name}</h3>
                <p>${chapter.desc}</p>
            </div>
            <span class="chapter-arrow">→</span>
        </div>
    `).join('');
    
    // 添加点击事件
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.addEventListener('click', () => {
            const chapterId = item.dataset.chapter;
            selectChapter(chapterId);
        });
    });
}

// ==================== 章节选择 ====================
function selectChapter(chapterId) {
    currentState.currentChapter = chapterId;
    currentState.currentScene = 0;
    
    // 更新阅读页面标题
    const bookData = textbookData[currentState.currentBook];
    const chapter = bookData.chapters.find(c => c.id === chapterId);
    document.getElementById('readingTitle').textContent = chapter.name;
    
    // 加载场景
    loadScene(0);
    
    // 切换到阅读页面
    showPage('readingPage');
}

// ==================== 场景加载 ====================
function loadScene(sceneIndex) {
    const scene = welcomeUnitScenes[sceneIndex];
    if (!scene) return;
    
    currentState.currentScene = sceneIndex;
    
    // 更新场景信息
    document.getElementById('sceneNumber').textContent = `镜头 ${scene.id}`;
    document.getElementById('sceneSetting').textContent = scene.setting;
    
    // 加载媒体（视频或图片）
    loadMedia(scene);
    
    // 更新文本内容
    document.getElementById('englishText').textContent = scene.english;
    document.getElementById('chineseText').textContent = scene.chinese;
    
    // 加载问答
    loadQuiz(scene);
    
    // 更新进度条
    updateProgress(sceneIndex);
    
    // 更新导航按钮状态
    updateNavigationButtons(sceneIndex);
    
    // 自动播放音频（如果视频不存在或需要同步播放）
    setTimeout(() => {
        playAudio(scene.english);
    }, 500);
}

// 加载媒体（视频或图片）
function loadMedia(scene) {
    const videoElement = document.getElementById('sceneVideo');
    const imageElement = document.getElementById('sceneImage');
    const sceneInfoOverlay = document.getElementById('sceneInfoOverlay');
    
    if (scene.video) {
        // 有视频，显示视频播放器
        videoElement.style.display = 'block';
        imageElement.style.display = 'none';
        
        // 隐藏图片上的文字覆盖层（视频有自己的控制条）
        if (sceneInfoOverlay) {
            sceneInfoOverlay.style.display = 'none';
        }
        
        // 设置视频源
        videoElement.src = scene.video;
        
        // 静音视频（去掉人声，保留背景音乐）
        videoElement.muted = true;
        videoElement.volume = 0;
        
        videoElement.load();
        
        // 视频加载完成后自动播放
        videoElement.onloadeddata = () => {
            videoElement.play().catch(e => {
                console.log('视频自动播放被阻止:', e);
            });
        };
        
        // 视频错误处理
        videoElement.onerror = () => {
            console.log('视频加载失败，显示图片代替');
            showImageFallback(scene, videoElement, imageElement);
        };
    } else {
        // 没有视频，显示图片
        showImageFallback(scene, videoElement, imageElement);
    }
}

// 显示图片（当视频不存在或加载失败时）
function showImageFallback(scene, videoElement, imageElement) {
    videoElement.style.display = 'none';
    imageElement.style.display = 'block';
    imageElement.src = generateSceneImage(scene.imagePrompt);
    imageElement.alt = scene.setting;
}

// 生成场景图片（使用占位图，实际项目中可以接入AI图片生成API）
function generateSceneImage(prompt) {
    // 这里使用基于场景ID的固定颜色占位图
    const colors = ['667eea', '764ba2', 'f093fb', '4facfe'];
    const color = colors[currentState.currentScene % colors.length];
    return `https://placehold.co/800x400/${color}/white?text=Scene+${currentState.currentScene + 1}`;
}

function updateProgress(sceneIndex) {
    const total = welcomeUnitScenes.length;
    const progress = ((sceneIndex + 1) / total) * 100;
    
    document.getElementById('progressFill').style.setProperty('--progress', `${progress}%`);
    document.getElementById('progressText').textContent = `${sceneIndex + 1} / ${total}`;
    
    // 更新进度条宽度
    const progressFill = document.querySelector('.progress-fill::after');
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
}

function updateNavigationButtons(sceneIndex) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = sceneIndex === 0;
    
    // 检查是否已回答当前问题
    const scene = welcomeUnitScenes[sceneIndex];
    const hasAnswered = currentState.answeredQuestions[sceneIndex] !== undefined;
    
    // 如果有问题且未回答，禁用下一页按钮
    if (scene.question && !hasAnswered) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请先答题 <span>🔒</span>';
    } else {
        nextBtn.disabled = false;
        if (sceneIndex === welcomeUnitScenes.length - 1) {
            nextBtn.innerHTML = '完成 <span>✓</span>';
        } else {
            nextBtn.innerHTML = '下一页 <span>→</span>';
        }
    }
}

// ==================== 问答功能 ====================
function loadQuiz(scene) {
    const quizSection = document.getElementById('quizSection');
    const questionText = document.getElementById('questionText');
    const quizOptions = document.getElementById('quizOptions');
    const quizResult = document.getElementById('quizResult');
    
    // 重置状态
    currentState.currentAnswer = null;
    quizResult.style.display = 'none';
    quizResult.className = 'quiz-result';
    
    if (!scene.question) {
        quizSection.style.display = 'none';
        return;
    }
    
    quizSection.style.display = 'block';
    
    // 检查是否已经回答过
    const sceneIndex = currentState.currentScene;
    const hasAnswered = currentState.answeredQuestions[sceneIndex] !== undefined;
    
    // 设置问题（只显示英语）
    questionText.textContent = scene.question.text;
    
    // 生成选项（只显示英语）
    quizOptions.innerHTML = scene.question.options.map(option => `
        <div class="quiz-option ${hasAnswered && currentState.answeredQuestions[sceneIndex] === option.id ? 'selected' : ''} ${hasAnswered && option.id === scene.question.correctAnswer ? 'correct' : ''} ${hasAnswered && currentState.answeredQuestions[sceneIndex] === option.id && option.id !== scene.question.correctAnswer ? 'wrong' : ''}" 
             data-option="${option.id}"
             onclick="selectAnswer('${option.id}')"
             style="${hasAnswered ? 'pointer-events: none;' : ''}">
            <span class="option-id">${option.id}</span>
            <div class="option-text">
                <div class="option-english">${option.text}</div>
            </div>
        </div>
    `).join('');
    
    // 如果已经回答过，显示结果
    if (hasAnswered) {
        showQuizResult(scene.question, currentState.answeredQuestions[sceneIndex]);
    }
}

function selectAnswer(optionId) {
    const scene = welcomeUnitScenes[currentState.currentScene];
    if (!scene.question) return;
    
    // 记录答案
    currentState.currentAnswer = optionId;
    currentState.answeredQuestions[currentState.currentScene] = optionId;
    
    // 更新选项样式
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
        option.style.pointerEvents = 'none';
        
        const optId = option.dataset.option;
        if (optId === optionId) {
            option.classList.add('selected');
        }
        if (optId === scene.question.correctAnswer) {
            option.classList.add('correct');
        } else if (optId === optionId && optId !== scene.question.correctAnswer) {
            option.classList.add('wrong');
        }
    });
    
    // 显示结果
    showQuizResult(scene.question, optionId);
    
    // 更新导航按钮状态
    updateNavigationButtons(currentState.currentScene);
}

function showQuizResult(question, selectedAnswer) {
    const quizResult = document.getElementById('quizResult');
    const resultIcon = document.getElementById('resultIcon');
    const resultText = document.getElementById('resultText');
    const resultExplanation = document.getElementById('resultExplanation');
    
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    quizResult.style.display = 'flex';
    quizResult.className = `quiz-result ${isCorrect ? 'correct' : 'wrong'}`;
    
    if (isCorrect) {
        resultIcon.textContent = '✅';
        resultText.textContent = 'Correct!';
        resultText.style.color = '#28a745';
    } else {
        resultIcon.textContent = '❌';
        resultText.textContent = 'Incorrect';
        resultText.style.color = '#dc3545';
    }
    
    resultExplanation.innerHTML = `
        <strong>Explanation:</strong> ${question.explanation}
    `;
}

// ==================== 音频播放 ====================
function initAudioControls() {
    const playBtn = document.getElementById('playBtn');
    playBtn.addEventListener('click', toggleAudio);
}

function toggleAudio() {
    if (currentState.isPlaying) {
        stopAudio();
    } else {
        const scene = welcomeUnitScenes[currentState.currentScene];
        playAudio(scene.english);
    }
}

function playAudio(text) {
    // 停止之前的播放
    stopAudio();
    
    // 检查浏览器是否支持语音合成
    if (!window.speechSynthesis) {
        alert('您的浏览器不支持语音播放功能');
        return;
    }
    
    // 创建语音合成实例
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    // 播放事件
    utterance.onstart = () => {
        currentState.isPlaying = true;
        updatePlayButton(true);
    };
    
    // 结束事件
    utterance.onend = () => {
        currentState.isPlaying = false;
        updatePlayButton(false);
    };
    
    // 错误事件
    utterance.onerror = (event) => {
        console.error('语音播放错误:', event);
        currentState.isPlaying = false;
        updatePlayButton(false);
    };
    
    // 保存引用并播放
    currentState.speechUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    
    // 更新进度条动画
    animateAudioProgress();
}

function stopAudio() {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    currentState.isPlaying = false;
    currentState.speechUtterance = null;
    updatePlayButton(false);
    
    // 重置进度条
    document.getElementById('audioProgressBar').style.width = '0%';
}

function updatePlayButton(isPlaying) {
    const playBtn = document.getElementById('playBtn');
    const audioIcon = playBtn.querySelector('.audio-icon');
    const audioText = playBtn.querySelector('.audio-text');
    
    if (isPlaying) {
        playBtn.classList.add('playing');
        audioIcon.textContent = '⏸️';
        audioText.textContent = '暂停';
    } else {
        playBtn.classList.remove('playing');
        audioIcon.textContent = '▶️';
        audioText.textContent = '播放音频';
    }
}

function animateAudioProgress() {
    if (!currentState.isPlaying) return;
    
    // 模拟音频进度（实际项目中可以使用真实音频的currentTime）
    const progressBar = document.getElementById('audioProgressBar');
    let progress = 0;
    
    const interval = setInterval(() => {
        if (!currentState.isPlaying) {
            clearInterval(interval);
            return;
        }
        
        progress += 1;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 100);
}

// ==================== 导航控制 ====================
function initNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.addEventListener('click', () => {
        if (currentState.currentScene > 0) {
            loadScene(currentState.currentScene - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentState.currentScene < welcomeUnitScenes.length - 1) {
            loadScene(currentState.currentScene + 1);
        } else {
            // 完成学习
            alert('恭喜！您已完成本章节的学习！');
            showPage('chapterPage');
        }
    });
}

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    initTextbookPage();
    initAudioControls();
    initNavigation();
    
    // 添加CSS变量支持
    const style = document.createElement('style');
    style.textContent = `
        .progress-fill::after {
            width: var(--progress, 25%);
        }
    `;
    document.head.appendChild(style);
});
