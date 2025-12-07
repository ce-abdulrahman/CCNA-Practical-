// Interactive functionality for the study portal

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('.sidebar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.sidebar .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Highlight current section in sidebar
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.content-section');
        const navLinks = document.querySelectorAll('.sidebar .nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Quiz answer reveal
    window.showAnswer = function(questionNum) {
        const answerDiv = document.getElementById(`answer${questionNum}`);
        if (answerDiv.style.display === 'none' || answerDiv.style.display === '') {
            answerDiv.style.display = 'block';
        } else {
            answerDiv.style.display = 'none';
        }
    };
    
    // Flashcard flip functionality
    window.flipCard = function(card) {
        card.classList.toggle('flipped');
    };
    
    // Print functionality
    window.printPage = function() {
        const printContent = `
            <html>
            <head>
                <title>CCNA2 Final Exam Study Pack</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #2c3e50; border-bottom: 3px solid #3498db; }
                    h2 { color: #3498db; margin-top: 30px; }
                    .section { margin-bottom: 30px; }
                    .code { background: #f5f5f5; padding: 15px; border-radius: 5px; font-family: monospace; }
                    .tip { background: #fffde7; padding: 15px; border-left: 4px solid #f1c40f; margin: 15px 0; }
                    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #2c3e50; color: white; }
                    @media print {
                        .no-print { display: none; }
                        .page-break { page-break-before: always; }
                    }
                </style>
            </head>
            <body>
                <h1>CCNA2 Final Exam Study Pack</h1>
                <p>Generated from Labs 1-7 - Complete Revision Material</p>
                
                <div class="section">
                    <h2>10-Point Ultra Summary</h2>
                    <ol>
                        <li><strong>VLANs</strong> separate broadcast domains logically</li>
                        <li><strong>Access ports</strong>: 1 VLAN, <strong>Trunk ports</strong>: multiple VLANs</li>
                        <li>Inter-VLAN routing requires router or Layer 3 switch</li>
                        <li>Router-on-a-stick uses subinterfaces with dot1Q encapsulation</li>
                        <li>STP prevents Layer 2 loops (Blocking → Listening → Learning → Forwarding)</li>
                        <li>Root bridge has lowest Bridge ID (priority then MAC address)</li>
                        <li>PortFast skips listening/learning states on access ports</li>
                        <li>Subnetting formula: 2^h - 2 = usable hosts (h = host bits)</li>
                        <li>VLSM allows different subnet sizes in same network</li>
                        <li>/30 subnet mask for WAN links (2 usable hosts)</li>
                    </ol>
                </div>
                
                <div class="section">
                    <h2>Essential Commands Cheat Sheet</h2>
                    <div class="code">
                        <h3>VLAN Configuration:</h3>
                        vlan 10<br>
                        name SALES<br>
                        interface FastEthernet0/1<br>
                        switchport mode access<br>
                        switchport access vlan 10<br><br>
                        
                        <h3>Trunk Configuration:</h3>
                        interface GigabitEthernet0/1<br>
                        switchport mode trunk<br><br>
                        
                        <h3>Inter-VLAN Routing:</h3>
                        interface GigabitEthernet0/0.10<br>
                        encapsulation dot1Q 10<br>
                        ip address 192.168.10.1 255.255.255.0<br><br>
                        
                        <h3>STP Configuration:</h3>
                        spanning-tree vlan 10 root primary<br>
                        interface FastEthernet0/1<br>
                        spanning-tree portfast<br>
                    </div>
                </div>
                
                <div class="section">
                    <h2>Subnetting Reference Table</h2>
                    <table>
                        <tr>
                            <th>Prefix</th>
                            <th>Subnet Mask</th>
                            <th>Usable Hosts</th>
                            <th>Use Case</th>
                        </tr>
                        <tr>
                            <td>/24</td>
                            <td>255.255.255.0</td>
                            <td>254</td>
                            <td>Large department</td>
                        </tr>
                        <tr>
                            <td>/25</td>
                            <td>255.255.255.128</td>
                            <td>126</td>
                            <td>Medium network</td>
                        </tr>
                        <tr>
                            <td>/26</td>
                            <td>255.255.255.192</td>
                            <td>62</td>
                            <td>Small department</td>
                        </tr>
                        <tr>
                            <td>/27</td>
                            <td>255.255.255.224</td>
                            <td>30</td>
                            <td>Workgroup</td>
                        </tr>
                        <tr>
                            <td>/28</td>
                            <td>255.255.255.240</td>
                            <td>14</td>
                            <td>Small office</td>
                        </tr>
                        <tr>
                            <td>/30</td>
                            <td>255.255.255.252</td>
                            <td>2</td>
                            <td>WAN links</td>
                        </tr>
                    </table>
                </div>
                
                <div class="section">
                    <h2>Exam Formulas</h2>
                    <ul>
                        <li><strong>Usable hosts:</strong> 2^n - 2 (n = host bits)</li>
                        <li><strong>Number of subnets:</strong> 2^b (b = borrowed bits)</li>
                        <li><strong>Block size:</strong> 256 - subnet mask value</li>
                        <li><strong>Network address:</strong> Multiple of block size</li>
                        <li><strong>Broadcast address:</strong> Next network address - 1</li>
                    </ul>
                </div>
                
                <div class="section">
                    <h2>Expected Lab Exam Tasks</h2>
                    <ol>
                        <li>Configure VLANs on switches based on given requirements</li>
                        <li>Set up trunk links between switches</li>
                        <li>Configure router subinterfaces for Inter-VLAN routing</li>
                        <li>Implement VLSM addressing scheme</li>
                        <li>Configure STP root bridge and PortFast</li>
                        <li>Troubleshoot connectivity issues between VLANs</li>
                        <li>Verify configurations using show commands</li>
                    </ol>
                </div>
                
                <div class="tip">
                    <h3>🔥 Top 3 Exam Tips:</h3>
                    <p>1. ALWAYS save configuration with "copy running-config startup-config"</p>
                    <p>2. Verify with "show vlan", "show interfaces trunk", "show ip route"</p>
                    <p>3. Double-check IP addressing and subnet masks before submission</p>
                </div>
                
                <p class="no-print"><br><br><em>Online interactive version available with flashcards and quizzes.</em></p>
            </body>
            </html>
        `;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };
    
    // Initialize with first section active
    document.querySelector('.sidebar .nav-link').classList.add('active');
    
    // Add animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for animation
    document.querySelectorAll('.concept-card, .formula-card, .subnet-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });

    // Quiz functionality
let quizAnswers = {
    // True/False Answers (1-25)
    'q1': 'true', 'q2': 'false', 'q3': 'true', 'q4': 'true', 'q5': 'true',
    'q6': 'false', 'q7': 'true', 'q8': 'true', 'q9': 'true', 'q10': 'false',
    'q11': 'true', 'q12': 'true', 'q13': 'false', 'q14': 'true', 'q15': 'true',
    'q16': 'true', 'q17': 'false', 'q18': 'true', 'q19': 'false', 'q20': 'true',
    'q21': 'false', 'q22': 'false', 'q23': 'true', 'q24': 'true', 'q25': 'true',
    
    // Practical Answers (26-50)
    'q26': ['vlan 20', 'name SALES'],
    'q27': ['interface FastEthernet 0/5', 'switchport mode access', 'switchport access vlan 20'],
    'q28': ['interface GigabitEthernet 0/1', 'switchport mode trunk'],
    'q29': ['interface range FastEthernet 0/1-10', 'switchport mode access', 'switchport access vlan 30'],
    'q30': ['show vlan brief'],
    'q31': ['interface GigabitEthernet 0/0.10', 'encapsulation dot1Q'],
    'q32': ['ip address'],
    'q33': ['interface GigabitEthernet 0/0', 'no shutdown'],
    'q34': ['interface GigabitEthernet 0/0.20', 'encapsulation dot1Q', 'ip address'],
    'q35': ['show ip route'],
    'q36': ['spanning-tree vlan 10 root primary'],
    'q37': ['spanning-tree vlan 20 root secondary'],
    'q38': ['interface FastEthernet 0/1', 'spanning-tree portfast'],
    'q39': ['interface range FastEthernet 0/1-2', 'channel-group'],
    'q40': ['show spanning-tree vlan 10'],
    'q41': ['255.255.255.192', '/26'],
    'q42': ['192.168.1.64'],
    'q43': ['192.168.1.191'],
    'q44': ['192.168.1.193'],
    'q45': ['192.168.1.238'],
    'q46': ['30'],
    'q47': ['255.255.255.252', '/30'],
    'q48': ['64'],
    'q49': ['192.168.1.0/25', '192.168.1.128/26', '192.168.1.192/27'],
    'q50': ['192.168.1.65', '192.168.1.126']
};

// Show/hide quiz sections
window.showSection = function(section) {
    document.querySelectorAll('.quiz-section').forEach(sec => {
        sec.style.display = 'none';
    });
    
    document.querySelectorAll('.quiz-nav .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (section === 'truefalse') {
        document.getElementById('truefalse-section').style.display = 'block';
        document.querySelector('.quiz-nav .btn:nth-child(1)').classList.add('active');
    } else {
        document.getElementById('practical-section').style.display = 'block';
        document.querySelector('.quiz-nav .btn:nth-child(2)').classList.add('active');
    }
    updateProgress();
};

// Show answer for specific question
window.showAnswer = function(questionId) {
    const answerDiv = document.getElementById(`answer-${questionId}`);
    if (answerDiv.style.display === 'none' || answerDiv.style.display === '') {
        answerDiv.style.display = 'block';
    } else {
        answerDiv.style.display = 'none';
    }
};

// Check all answers and calculate score
window.checkAllAnswers = function() {
    let score = 0;
    let tfScore = 0;
    let practicalScore = 0;
    
    // Check True/False questions (1-25)
    for (let i = 1; i <= 25; i++) {
        const questionId = `q${i}`;
        const selected = document.querySelector(`input[name="${questionId}"]:checked`);
        
        if (selected && selected.value === quizAnswers[questionId]) {
            score++;
            tfScore++;
            selected.parentElement.classList.add('correct-answer');
        } else if (selected) {
            selected.parentElement.classList.add('wrong-answer');
        }
    }
    
    // Check Practical questions (26-50)
    for (let i = 26; i <= 50; i++) {
        const questionId = `q${i}`;
        const correctAnswers = quizAnswers[questionId];
        let questionCorrect = true;
        
        if (Array.isArray(correctAnswers)) {
            for (let j = 0; j < correctAnswers.length; j++) {
                const input = document.getElementById(`${questionId}-${j+1}`);
                if (input) {
                    const userAnswer = input.value.trim().toLowerCase();
                    const correctAnswer = correctAnswers[j].toLowerCase();
                    
                    // For command questions, check if answer contains the command
                    if (userAnswer.includes(correctAnswer) || correctAnswer.includes(userAnswer)) {
                        input.classList.add('correct-input');
                        input.classList.remove('wrong-input');
                    } else {
                        input.classList.add('wrong-input');
                        input.classList.remove('correct-input');
                        questionCorrect = false;
                    }
                }
            }
        } else {
            // For single answer questions
            const input = document.getElementById(`${questionId}-1`);
            if (input) {
                const userAnswer = input.value.trim().toLowerCase();
                if (userAnswer === correctAnswers.toLowerCase()) {
                    input.classList.add('correct-input');
                    input.classList.remove('wrong-input');
                } else {
                    input.classList.add('wrong-input');
                    input.classList.remove('correct-input');
                    questionCorrect = false;
                }
            }
        }
        
        if (questionCorrect) {
            score++;
            practicalScore++;
        }
    }
    
    // Display results
    const percentage = Math.round((score / 50) * 100);
    document.getElementById('score').textContent = score;
    document.getElementById('percentage').textContent = percentage;
    document.getElementById('tf-score').textContent = tfScore;
    document.getElementById('practical-score').textContent = practicalScore;
    document.getElementById('score-bar').style.width = `${percentage}%`;
    
    // Update score bar color based on performance
    const scoreBar = document.getElementById('score-bar');
    if (percentage >= 80) {
        scoreBar.className = 'progress-bar bg-success';
        document.getElementById('score-message').className = 'alert alert-success';
        document.getElementById('score-message').innerHTML = '<strong>Excellent!</strong> You\'re ready for the CCNA exam!';
    } else if (percentage >= 60) {
        scoreBar.className = 'progress-bar bg-warning';
        document.getElementById('score-message').className = 'alert alert-warning';
        document.getElementById('score-message').innerHTML = '<strong>Good job!</strong> Review the wrong answers and try again.';
    } else {
        scoreBar.className = 'progress-bar bg-danger';
        document.getElementById('score-message').className = 'alert alert-danger';
        document.getElementById('score-message').innerHTML = '<strong>Needs improvement.</strong> Study the material and retake the quiz.';
    }
    
    document.getElementById('results-section').style.display = 'block';
    updateProgress();
};

// Reset quiz
window.resetQuiz = function() {
    // Clear all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
    
    // Clear all text inputs
    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.value = '';
        input.classList.remove('correct-input', 'wrong-input');
    });
    
    // Remove answer highlighting
    document.querySelectorAll('.correct-answer, .wrong-answer').forEach(el => {
        el.classList.remove('correct-answer', 'wrong-answer');
    });
    
    // Hide all answer explanations
    document.querySelectorAll('.answer').forEach(answer => {
        answer.style.display = 'none';
    });
    
    // Hide results
    document.getElementById('results-section').style.display = 'none';
    
    // Reset progress
    updateProgress();
};

// Update progress bar
function updateProgress() {
    let answered = 0;
    const totalQuestions = 50;
    
    // Count answered True/False questions
    for (let i = 1; i <= 25; i++) {
        if (document.querySelector(`input[name="q${i}"]:checked`)) {
            answered++;
        }
    }
    
    // Count answered Practical questions (if they have any input)
    for (let i = 26; i <= 50; i++) {
        const inputs = document.querySelectorAll(`[id^="q${i}-"]`);
        let hasAnswer = false;
        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                hasAnswer = true;
            }
        });
        if (hasAnswer) answered++;
    }
    
    const progress = (answered / totalQuestions) * 100;
    document.getElementById('quiz-progress').style.width = `${progress}%`;
    document.getElementById('answered-count').textContent = answered;
    
    // Change progress bar color
    const progressBar = document.getElementById('quiz-progress');
    if (progress >= 80) {
        progressBar.className = 'progress-bar bg-success';
    } else if (progress >= 50) {
        progressBar.className = 'progress-bar bg-warning';
    } else {
        progressBar.className = 'progress-bar bg-danger';
    }
}

// Show only wrong answers for review
window.showWrongAnswers = function() {
    // First, check all answers
    checkAllAnswers();
    
    // Then hide all questions
    document.querySelectorAll('.question').forEach(question => {
        question.style.display = 'none';
    });
    
    // Show only wrong answers
    document.querySelectorAll('.wrong-answer, .wrong-input').forEach(wrongElement => {
        const question = wrongElement.closest('.question');
        if (question) {
            question.style.display = 'block';
            // Also show the answer explanation
            const questionId = wrongElement.name || wrongElement.id.split('-')[0];
            const answerDiv = document.getElementById(`answer-${questionId}`);
            if (answerDiv) {
                answerDiv.style.display = 'block';
            }
        }
    });
    
    // Show message if no wrong answers
    if (document.querySelectorAll('.wrong-answer, .wrong-input').length === 0) {
        const resultsSection = document.getElementById('results-section');
        const perfectMsg = document.createElement('div');
        perfectMsg.className = 'alert alert-success mt-3';
        perfectMsg.innerHTML = '<strong>Perfect Score!</strong> You got all questions correct!';
        resultsSection.appendChild(perfectMsg);
    }
};

// Auto-save answers (optional feature)
function autoSaveAnswers() {
    const answers = {};
    
    // Save True/False answers
    for (let i = 1; i <= 25; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
            answers[`q${i}`] = selected.value;
        }
    }
    
    // Save Practical answers
    for (let i = 26; i <= 50; i++) {
        const inputs = document.querySelectorAll(`[id^="q${i}-"]`);
        const questionAnswers = [];
        inputs.forEach(input => {
            if (input.value) {
                questionAnswers.push(input.value);
            }
        });
        if (questionAnswers.length > 0) {
            answers[`q${i}`] = questionAnswers;
        }
    }
    
    localStorage.setItem('ccna2-quiz-answers', JSON.stringify(answers));
}

// Load saved answers
function loadSavedAnswers() {
    const saved = localStorage.getItem('ccna2-quiz-answers');
    if (saved) {
        const answers = JSON.parse(saved);
        
        // Load True/False answers
        Object.keys(answers).forEach(key => {
            if (key.startsWith('q') && parseInt(key.substring(1)) <= 25) {
                const value = answers[key];
                const radio = document.querySelector(`input[name="${key}"][value="${value}"]`);
                if (radio) radio.checked = true;
            }
        });
        
        // Load Practical answers
        Object.keys(answers).forEach(key => {
            if (key.startsWith('q') && parseInt(key.substring(1)) >= 26) {
                const values = answers[key];
                if (Array.isArray(values)) {
                    values.forEach((value, index) => {
                        const input = document.getElementById(`${key}-${index + 1}`);
                        if (input) input.value = value;
                    });
                }
            }
        });
        
        updateProgress();
    }
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load saved answers if any
    loadSavedAnswers();
    
    // Auto-save when user answers questions
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', function() {
            autoSaveAnswers();
            updateProgress();
        });
        
        input.addEventListener('input', function() {
            autoSaveAnswers();
            updateProgress();
        });
    });
    
    // Initialize progress
    updateProgress();
});

});