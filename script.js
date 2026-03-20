// 英语精听练习互动课堂 - JavaScript

// 词汇数据
const vocabularyData = [
    {
        word: 'embarrassed',
        pos: 'adj.',
        meaning: '尴尬的，难堪的',
        collocation: 'feel embarrassed（感到尴尬）'
    },
    {
        word: 'package',
        pos: 'n.',
        meaning: '套餐，包裹',
        collocation: 'a family package（家庭套餐）'
    },
    {
        word: 'accommodation',
        pos: 'n.',
        meaning: '住宿，住所',
        collocation: 'hotel accommodations（酒店住宿）'
    },
    {
        word: 'maintain',
        pos: 'v.',
        meaning: '维持，保持；维修',
        collocation: 'poorly maintained（维修不善）'
    },
    {
        word: 'stomachache',
        pos: 'n.',
        meaning: '胃痛，腹痛',
        collocation: 'have a bad stomachache（胃痛严重）'
    },
    {
        word: 'cinema',
        pos: 'n.',
        meaning: '电影院',
        collocation: 'go to the cinema（去看电影）'
    },
    {
        word: 'restaurant',
        pos: 'n.',
        meaning: '餐馆，餐厅',
        collocation: 'near the restaurant（在餐馆附近）'
    },
    {
        word: 'complain',
        pos: 'v.',
        meaning: '抱怨，投诉',
        collocation: 'make a complaint（投诉）'
    }
];

// 正确答案
const correctAnswers = {
    blanks: {
        'text1-1': 'hate',
        'text1-2': 'embarrassed',
        'text2-1': 'package',
        'text2-2': '80',
        'text3-1': 'restaurant',
        'text3-2': 'cinema',
        'text3-3': 'children',
        'text4-1': 'accommodation',
        'text4-2': 'maintained',
        'text5-1': 'stomachache'
    },
    questions: {
        q1: 'B',
        q2: 'A',
        q3: 'B',
        q4: 'C',
        q5: 'B'
    }
};

// 全局状态
let currentSection = 1;
let audioPlayer = null;
let isPlaying = false;
let previewTimer = null;
let practiceTimer = null;
let previewSeconds = 0;
let practiceSeconds = 0;

// 各步骤的音频播放器
let readingAudioPlayer = null;
let repeatAudioPlayer = null;
let shadowAudioPlayer = null;
let isReadingPlaying = false;
let isRepeatPlaying = false;
let isShadowStepPlaying = false;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initVocabulary();
    initEventListeners();
    startPreviewTimer();
});

// 初始化词汇表
function initVocabulary() {
    const tbody = document.getElementById('vocabulary-list');
    if (!tbody) return;

    vocabularyData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="word-cell">${item.word}</td>
            <td class="pos-cell">${item.pos}</td>
            <td>${item.meaning}</td>
            <td>${item.collocation}</td>
            <td>
                <button class="audio-btn" data-word="${item.word}" onclick="playWordAudio('${item.word}', this)">
                    🔊
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 播放单词音频（使用Web Speech API）
function playWordAudio(word, btn) {
    // 停止其他正在播放的音频
    document.querySelectorAll('.audio-btn.playing').forEach(b => {
        b.classList.remove('playing');
        b.textContent = '🔊';
    });

    if (btn.classList.contains('playing')) {
        window.speechSynthesis.cancel();
        btn.classList.remove('playing');
        btn.textContent = '🔊';
        return;
    }

    btn.classList.add('playing');
    btn.textContent = '⏸';

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    
    utterance.onend = () => {
        btn.classList.remove('playing');
        btn.textContent = '🔊';
    };

    window.speechSynthesis.speak(utterance);
}

// 播放全部单词
let isPlayingAll = false;
let currentWordIndex = 0;

function playAllWords() {
    const playAllBtn = document.getElementById('play-all-words');
    const statusSpan = document.getElementById('play-all-status');
    
    if (isPlayingAll) {
        // 停止播放
        window.speechSynthesis.cancel();
        isPlayingAll = false;
        currentWordIndex = 0;
        playAllBtn.textContent = '🔊 播放全部单词';
        playAllBtn.classList.remove('playing');
        if (statusSpan) statusSpan.textContent = '';
        return;
    }

    isPlayingAll = true;
    playAllBtn.textContent = '⏸ 停止播放';
    playAllBtn.classList.add('playing');
    
    currentWordIndex = 0;
    playNextWord();
}

function playNextWord() {
    if (!isPlayingAll || currentWordIndex >= vocabularyData.length) {
        // 播放完成
        isPlayingAll = false;
        currentWordIndex = 0;
        const playAllBtn = document.getElementById('play-all-words');
        const statusSpan = document.getElementById('play-all-status');
        if (playAllBtn) {
            playAllBtn.textContent = '🔊 播放全部单词';
            playAllBtn.classList.remove('playing');
        }
        if (statusSpan) statusSpan.textContent = '播放完成！';
        return;
    }

    const word = vocabularyData[currentWordIndex];
    const statusSpan = document.getElementById('play-all-status');
    if (statusSpan) {
        statusSpan.textContent = `正在播放: ${word.word} (${currentWordIndex + 1}/${vocabularyData.length})`;
    }

    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    
    utterance.onend = () => {
        // 每个单词播放后间隔1秒再播放下一个
        setTimeout(() => {
            currentWordIndex++;
            playNextWord();
        }, 1000);
    };

    window.speechSynthesis.speak(utterance);
}

// 初始化事件监听器
function initEventListeners() {
    // 预习任务复选框
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            if (this.checked) {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
            }
            checkPreviewComplete();
        });
    });

    // 完成预习按钮
    const completePreviewBtn = document.getElementById('complete-preview');
    if (completePreviewBtn) {
        completePreviewBtn.addEventListener('click', function() {
            goToSection(2);
            stopPreviewTimer();
            startPracticeTimer();
        });
    }

    // 开始精听按钮
    const startListeningBtn = document.getElementById('start-listening');
    if (startListeningBtn) {
        startListeningBtn.addEventListener('click', function() {
            showPracticeStep('step-listening');
        });
    }

    // 播放全部单词按钮
    const playAllBtn = document.getElementById('play-all-words');
    if (playAllBtn) {
        playAllBtn.addEventListener('click', playAllWords);
    }

    // 音频上传 - 关键信息精听
    const audioUpload = document.getElementById('audio-upload');
    if (audioUpload) {
        audioUpload.addEventListener('change', handleAudioUpload);
    }

    // 播放/暂停按钮 - 关键信息精听
    const playPauseBtn = document.getElementById('play-pause-btn');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', toggleAudio);
    }

    // 播放速度控制 - 关键信息精听
    const playbackSpeed = document.getElementById('playback-speed');
    if (playbackSpeed) {
        playbackSpeed.addEventListener('change', function() {
            if (audioPlayer) {
                audioPlayer.playbackRate = parseFloat(this.value);
            }
        });
    }

    // 读题试答音频
    initStepAudioPlayer('reading', readingAudioPlayer, isReadingPlaying);
    
    // 核对跟读音频
    initStepAudioPlayer('repeat', repeatAudioPlayer, isRepeatPlaying);
    
    // 影子跟读音频
    initStepAudioPlayer('shadow-step', shadowAudioPlayer, isShadowStepPlaying);

    // 核对答案按钮
    const checkAnswersBtn = document.getElementById('check-answers');
    if (checkAnswersBtn) {
        checkAnswersBtn.addEventListener('click', checkBlanksAnswers);
    }

    // 进入核对跟读按钮
    const goToRepeatBtn = document.getElementById('go-to-repeat');
    if (goToRepeatBtn) {
        goToRepeatBtn.addEventListener('click', function() {
            showPracticeStep('step-repeat');
        });
    }

    // 进入影子跟读按钮
    const goToShadowBtn = document.getElementById('go-to-shadow');
    if (goToShadowBtn) {
        goToShadowBtn.addEventListener('click', function() {
            showPracticeStep('step-shadow');
        });
    }

    // 完成跟读，查看课后作业按钮
    const completeShadowBtn = document.getElementById('complete-shadow');
    if (completeShadowBtn) {
        completeShadowBtn.addEventListener('click', function() {
            goToSection(3);
            stopPracticeTimer();
        });
    }

    // 重新开始按钮
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartLearning);
    }

    // 选项点击效果
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                // 移除同组其他选项的选中样式
                const name = radio.name;
                document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                    r.closest('.option').classList.remove('selected');
                });
                this.classList.add('selected');
            }
        });
    });
}

// 检查预习是否完成
function checkPreviewComplete() {
    const task1 = document.getElementById('task1');
    const task2 = document.getElementById('task2');
    const completeBtn = document.getElementById('complete-preview');

    if (task1 && task2 && completeBtn) {
        if (task1.checked && task2.checked) {
            completeBtn.disabled = false;
        } else {
            completeBtn.disabled = true;
        }
    }
}

// 切换到指定章节
function goToSection(sectionNum) {
    // 隐藏所有章节
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // 显示目标章节
    const targetSection = document.getElementById(
        sectionNum === 1 ? 'preview-section' :
        sectionNum === 2 ? 'practice-section' : 'homework-section'
    );
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // 更新进度条
    updateProgressBar(sectionNum);
    currentSection = sectionNum;

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 更新进度条
function updateProgressBar(currentStep) {
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum < currentStep) {
            step.classList.add('completed');
        } else if (stepNum === currentStep) {
            step.classList.add('active');
        }
    });
}

// 显示练习步骤
function showPracticeStep(stepId) {
    document.querySelectorAll('.practice-step').forEach(step => {
        step.classList.add('hidden');
    });

    const targetStep = document.getElementById(stepId);
    if (targetStep) {
        targetStep.classList.remove('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 处理音频上传
function handleAudioUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        if (audioPlayer) {
            audioPlayer.pause();
        }
        audioPlayer = new Audio(url);
        
        // 设置播放速度
        const speedSelect = document.getElementById('playback-speed');
        if (speedSelect) {
            audioPlayer.playbackRate = parseFloat(speedSelect.value);
        }

        // 更新进度条
        audioPlayer.addEventListener('timeupdate', updateAudioProgress);
        audioPlayer.addEventListener('ended', function() {
            isPlaying = false;
            updatePlayButton();
        });

        // 加载元数据后更新时间显示
        audioPlayer.addEventListener('loadedmetadata', function() {
            updateAudioTimeDisplay();
        });

        alert('音频文件已加载成功！');
    }
}

// 切换音频播放/暂停
function toggleAudio() {
    if (!audioPlayer) {
        alert('请先上传音频文件！');
        return;
    }

    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play();
        isPlaying = true;
    }
    updatePlayButton();
}

// 更新播放按钮状态
function updatePlayButton() {
    const btn = document.getElementById('play-pause-btn');
    if (btn) {
        btn.textContent = isPlaying ? '⏸' : '▶';
    }
}

// 更新音频进度
function updateAudioProgress() {
    if (!audioPlayer) return;
    
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    const progressBar = document.querySelector('.progress-bar-fill');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }

    updateAudioTimeDisplay();
}

// 更新时间显示
function updateAudioTimeDisplay() {
    if (!audioPlayer) return;

    const current = formatTime(audioPlayer.currentTime || 0);
    const duration = formatTime(audioPlayer.duration || 0);
    const timeDisplay = document.querySelector('.audio-time');
    if (timeDisplay) {
        timeDisplay.textContent = `${current} / ${duration}`;
    }
}

// 格式化时间
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 初始化各步骤的音频播放器
function initStepAudioPlayer(stepName, player, isPlaying) {
    // 音频上传
    const uploadInput = document.getElementById(`${stepName}-audio-upload`);
    if (uploadInput) {
        uploadInput.addEventListener('change', function(e) {
            handleStepAudioUpload(e, stepName);
        });
    }

    // 播放/暂停按钮
    const playBtn = document.getElementById(`${stepName}-play-btn`);
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            toggleStepAudio(stepName);
        });
    }

    // 播放速度控制
    const speedSelect = document.getElementById(`${stepName}-speed`);
    if (speedSelect) {
        speedSelect.addEventListener('change', function() {
            const audioPlayer = getStepAudioPlayer(stepName);
            if (audioPlayer) {
                audioPlayer.playbackRate = parseFloat(this.value);
            }
        });
    }
}

// 获取步骤的音频播放器
function getStepAudioPlayer(stepName) {
    switch(stepName) {
        case 'reading': return readingAudioPlayer;
        case 'repeat': return repeatAudioPlayer;
        case 'shadow-step': return shadowAudioPlayer;
        default: return audioPlayer;
    }
}

// 设置步骤的音频播放器
function setStepAudioPlayer(stepName, player) {
    switch(stepName) {
        case 'reading': readingAudioPlayer = player; break;
        case 'repeat': repeatAudioPlayer = player; break;
        case 'shadow-step': shadowAudioPlayer = player; break;
        default: audioPlayer = player; break;
    }
}

// 获取步骤的播放状态
function getStepPlayingState(stepName) {
    switch(stepName) {
        case 'reading': return isReadingPlaying;
        case 'repeat': return isRepeatPlaying;
        case 'shadow-step': return isShadowStepPlaying;
        default: return isPlaying;
    }
}

// 设置步骤的播放状态
function setStepPlayingState(stepName, state) {
    switch(stepName) {
        case 'reading': isReadingPlaying = state; break;
        case 'repeat': isRepeatPlaying = state; break;
        case 'shadow-step': isShadowStepPlaying = state; break;
        default: isPlaying = state; break;
    }
}

// 处理步骤音频上传
function handleStepAudioUpload(event, stepName) {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        const currentPlayer = getStepAudioPlayer(stepName);
        if (currentPlayer) {
            currentPlayer.pause();
        }
        
        const newPlayer = new Audio(url);
        setStepAudioPlayer(stepName, newPlayer);
        
        // 设置播放速度
        const speedSelect = document.getElementById(`${stepName}-speed`);
        if (speedSelect) {
            newPlayer.playbackRate = parseFloat(speedSelect.value);
        }

        // 更新进度条和时间
        newPlayer.addEventListener('timeupdate', function() {
            updateStepAudioProgress(stepName);
        });
        
        newPlayer.addEventListener('ended', function() {
            setStepPlayingState(stepName, false);
            updateStepPlayButton(stepName);
            if (stepName === 'shadow-step') {
                const statusText = document.querySelector('#shadow-status .status-text');
                if (statusText) statusText.textContent = '影子跟读完成！';
            }
        });

        newPlayer.addEventListener('loadedmetadata', function() {
            updateStepAudioTimeDisplay(stepName);
        });

        alert('音频文件已加载成功！');
    }
}

// 切换步骤音频播放/暂停
function toggleStepAudio(stepName) {
    const audioPlayer = getStepAudioPlayer(stepName);
    if (!audioPlayer) {
        alert('请先上传音频文件！');
        return;
    }

    const isCurrentlyPlaying = getStepPlayingState(stepName);

    if (isCurrentlyPlaying) {
        audioPlayer.pause();
        setStepPlayingState(stepName, false);
    } else {
        audioPlayer.play();
        setStepPlayingState(stepName, true);
    }
    
    updateStepPlayButton(stepName);
    
    if (stepName === 'shadow-step') {
        const statusText = document.querySelector('#shadow-status .status-text');
        if (statusText) {
            statusText.textContent = isCurrentlyPlaying ? '已暂停，点击继续跟读...' : '正在影子跟读，请跟随音频朗读...';
        }
    }
}

// 更新步骤播放按钮状态
function updateStepPlayButton(stepName) {
    const btn = document.getElementById(`${stepName}-play-btn`);
    const isCurrentlyPlaying = getStepPlayingState(stepName);
    if (btn) {
        btn.textContent = isCurrentlyPlaying ? '⏸' : '▶';
    }
}

// 更新步骤音频进度
function updateStepAudioProgress(stepName) {
    const audioPlayer = getStepAudioPlayer(stepName);
    if (!audioPlayer) return;
    
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    const progressBar = document.getElementById(`${stepName}-progress`);
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }

    updateStepAudioTimeDisplay(stepName);
}

// 更新步骤时间显示
function updateStepAudioTimeDisplay(stepName) {
    const audioPlayer = getStepAudioPlayer(stepName);
    if (!audioPlayer) return;

    const current = formatTime(audioPlayer.currentTime || 0);
    const duration = formatTime(audioPlayer.duration || 0);
    const timeDisplay = document.getElementById(`${stepName}-time`);
    if (timeDisplay) {
        timeDisplay.textContent = `${current} / ${duration}`;
    }
}

// 核对填空答案
function checkBlanksAnswers() {
    const blanks = document.querySelectorAll('.blank-input');
    let allFilled = true;
    let correctCount = 0;

    blanks.forEach((blank, index) => {
        const userAnswer = blank.value.trim().toLowerCase();
        const correctAnswer = blank.dataset.answer.toLowerCase();
        
        if (!userAnswer) {
            allFilled = false;
            return;
        }

        // 支持多个正确答案（用/分隔）
        const possibleAnswers = correctAnswer.split('/');
        const isCorrect = possibleAnswers.some(ans => userAnswer === ans.trim());

        if (isCorrect) {
            blank.classList.add('correct');
            blank.classList.remove('incorrect');
            correctCount++;
        } else {
            blank.classList.add('incorrect');
            blank.classList.remove('correct');
        }
    });

    if (!allFilled) {
        alert('请填写所有空格后再核对答案！');
        return;
    }

    const total = blanks.length;
    alert(`核对完成！你答对了 ${correctCount}/${total} 题。`);

    // 显示进入下一步按钮
    const goToRepeatBtn = document.getElementById('go-to-repeat');
    if (goToRepeatBtn) {
        goToRepeatBtn.classList.remove('hidden');
    }
}

// 提交最终答案
function submitFinalAnswers() {
    // 检查是否所有题目都已作答
    const questions = ['final-q1', 'final-q2', 'final-q3', 'final-q4', 'final-q5'];
    let allAnswered = true;
    let correctCount = 0;

    questions.forEach((qName, index) => {
        const selected = document.querySelector(`input[name="${qName}"]:checked`);
        if (!selected) {
            allAnswered = false;
        } else if (selected.value === correctAnswers.questions[`q${index + 1}`]) {
            correctCount++;
        }
    });

    if (!allAnswered) {
        alert('请完成所有题目后再提交！');
        return;
    }

    // 显示答案解析
    const answerResult = document.getElementById('answer-result');
    if (answerResult) {
        answerResult.classList.remove('hidden');
    }

    // 显示完成按钮
    const completeBtn = document.getElementById('complete-practice');
    if (completeBtn) {
        completeBtn.classList.remove('hidden');
    }

    // 隐藏提交按钮
    const submitBtn = document.getElementById('submit-answers');
    if (submitBtn) {
        submitBtn.classList.add('hidden');
    }

    alert(`答题完成！你答对了 ${correctCount}/5 题。`);
}

// 预习计时器
function startPreviewTimer() {
    previewTimer = setInterval(() => {
        previewSeconds++;
        const timerDisplay = document.getElementById('preview-timer');
        if (timerDisplay) {
            timerDisplay.textContent = formatTime(previewSeconds);
        }
    }, 1000);
}

function stopPreviewTimer() {
    if (previewTimer) {
        clearInterval(previewTimer);
        previewTimer = null;
    }
}

// 练习计时器
function startPracticeTimer() {
    practiceSeconds = 0;
    practiceTimer = setInterval(() => {
        practiceSeconds++;
        const timerDisplay = document.getElementById('practice-timer');
        if (timerDisplay) {
            timerDisplay.textContent = formatTime(practiceSeconds);
        }
    }, 1000);
}

function stopPracticeTimer() {
    if (practiceTimer) {
        clearInterval(practiceTimer);
        practiceTimer = null;
    }
}

// 重新开始学习
function restartLearning() {
    // 重置所有状态
    currentSection = 1;
    previewSeconds = 0;
    practiceSeconds = 0;

    // 重置所有复选框
    document.querySelectorAll('.task-checkbox').forEach(cb => {
        cb.checked = false;
        cb.closest('.task-item').classList.remove('completed');
    });

    // 重置所有填空
    document.querySelectorAll('.blank-input').forEach(input => {
        input.value = '';
        input.classList.remove('correct', 'incorrect');
    });

    // 重置所有单选
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
        radio.closest('.option')?.classList.remove('selected');
    });

    // 停止播放全部单词
    if (isPlayingAll) {
        window.speechSynthesis.cancel();
        isPlayingAll = false;
        currentWordIndex = 0;
        const playAllBtn = document.getElementById('play-all-words');
        const statusSpan = document.getElementById('play-all-status');
        if (playAllBtn) {
            playAllBtn.textContent = '🔊 播放全部单词';
            playAllBtn.classList.remove('playing');
        }
        if (statusSpan) statusSpan.textContent = '';
    }

    // 重置按钮状态
    const completePreviewBtn = document.getElementById('complete-preview');
    if (completePreviewBtn) {
        completePreviewBtn.disabled = true;
    }

    // 重置练习步骤
    showPracticeStep('step-reading');

    // 返回第一部分
    goToSection(1);

    // 重新开始计时
    stopPreviewTimer();
    stopPracticeTimer();
    startPreviewTimer();

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 点击进度条切换（仅允许已完成的章节）
document.querySelectorAll('.progress-step').forEach((step, index) => {
    step.addEventListener('click', function() {
        const stepNum = index + 1;
        // 只允许切换到已完成的章节或当前章节
        if (stepNum <= currentSection) {
            goToSection(stepNum);
            if (stepNum === 1) {
                stopPracticeTimer();
                startPreviewTimer();
            } else if (stepNum === 2) {
                stopPreviewTimer();
                startPracticeTimer();
            } else {
                stopPreviewTimer();
                stopPracticeTimer();
            }
        }
    });
});
