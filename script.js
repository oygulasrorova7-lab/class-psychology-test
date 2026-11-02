const questions = [
    {
        question: "Sinfda o‘zingizni qanchalik qulay his qilasiz?",
        answers: [
            "Juda qulay",
            "Ko‘pincha qulay",
            "Ba'zan noqulay",
            "Ko‘pincha noqulay"
        ]
    },
    {
        question: "Sinfdoshlaringiz bilan munosabatingiz qanday?",
        answers: [
            "Juda yaxshi",
            "Yaxshi",
            "Unchalik yaxshi emas",
            "Yomon"
        ]
    },
    {
        question: "Sinfda o‘z fikringizni erkin bildira olasizmi?",
        answers: [
            "Har doim",
            "Ko‘pincha",
            "Ba'zan",
            "Deyarli hech qachon"
        ]
    },
    {
        question: "Sinfdoshlaringiz sizga yordam berishadimi?",
        answers: [
            "Doimo",
            "Ko‘pincha",
            "Ba'zan",
            "Hech qachon"
        ]
    },
    {
        question: "Sinfda o‘zaro hurmat mavjudmi?",
        answers: [
            "To‘liq mavjud",
            "Asosan mavjud",
            "Qisman mavjud",
            "Yetarli emas"
        ]
    },
    {
        question: "Guruh bo‘lib ishlash sizga yoqadimi?",
        answers: [
            "Juda yoqadi",
            "Yoqadi",
            "Unchalik yoqmaydi",
            "Yoqmaydi"
        ]
    },
    {
        question: "Sinfda kelishmovchilik yuz bersa, qanday yo‘l tutasiz?",
        answers: [
            "Tinch yo‘l bilan hal qilaman",
            "Kelishishga harakat qilaman",
            "O‘qituvchidan yordam so‘rayman",
            "Muloqotdan chekinaman"
        ]
    },
    {
        question: "Sinfdoshlaringiz fikringizni tinglashadimi?",
        answers: [
            "Har doim",
            "Ko‘pincha",
            "Ba'zan",
            "Kamdan-kam"
        ]
    },
    {
        question: "Sinfingizda do‘stona muhit mavjudmi?",
        answers: [
            "Juda yaxshi",
            "Yaxshi",
            "O‘rtacha",
            "Yaxshi emas"
        ]
    },
    {
        question: "Sinf tadbirlarida faol qatnashasizmi?",
        answers: [
            "Doimo",
            "Ko‘pincha",
            "Ba'zan",
            "Kamdan-kam"
        ]
    },
    {
        question: "Sinfdoshlaringiz yutuqlaringizdan xursand bo‘lishadimi?",
        answers: [
            "Doimo",
            "Ko‘pincha",
            "Ba'zan",
            "Kamdan-kam"
        ]
    },
    {
        question: "Sinfda o‘zingizni jamoaning bir qismi deb hisoblaysizmi?",
        answers: [
            "To‘liq his qilaman",
            "Ko‘pincha",
            "Ba'zan",
            "His qilmayman"
        ]
    },
    {
        question: "Sinfingizda bir-biriga ishonch qay darajada?",
        answers: [
            "Juda yuqori",
            "Yaxshi",
            "O‘rtacha",
            "Past"
        ]
    },
    {
        question: "Sinfingizda muammolarni birgalikda hal qilishadimi?",
        answers: [
            "Doimo",
            "Ko‘pincha",
            "Ba'zan",
            "Deyarli yo‘q"
        ]
    },
    {
        question: "Sinfingizdagi muhitni qanday baholaysiz?",
        answers: [
            "A'lo",
            "Yaxshi",
            "Qoniqarli",
            "Yaxshilanishi kerak"
        ]
    }
];

let currentQuestion = 0;
let answers = [];
let selectedAnswer = null;

function startTest() {
    currentQuestion = 0;
    answers = [];

    document.getElementById("welcome").classList.add("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("statistics").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    selectedAnswer = null;

    const question = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        `Savol ${currentQuestion + 1} / ${questions.length}`;

    let percent = Math.round(
        (currentQuestion / questions.length) * 100
    );

    document.getElementById("progressPercent").textContent =
        percent + "%";

    document.getElementById("progressBar").style.width =
        percent + "%";

    document.getElementById("questionText").textContent =
        question.question;

    const answerBox = document.getElementById("answers");
    answerBox.innerHTML = "";

    question.answers.forEach((answer, index) => {
        let button = document.createElement("button");
        button.className = "answer";
        button.textContent = answer;

        button.onclick = function() {
            document.querySelectorAll(".answer").forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");
            selectedAnswer = index;
            document.getElementById("nextButton").disabled = false;
        };

        answerBox.appendChild(button);
    });

    document.getElementById("nextButton").disabled = true;

    document.getElementById("nextButton").textContent =
        currentQuestion === questions.length - 1
            ? "Natijani ko‘rish"
            : "Keyingi savol";
}

function nextQuestion() {
    if (selectedAnswer === null) return;

    answers.push(selectedAnswer);

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function calculateScore() {
    return answers.reduce((sum, answer) => sum + (4 - answer), 0);
}

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    let score = calculateScore();
    let maxScore = questions.length * 4;
    let percent = Math.round((score / maxScore) * 100);

    document.getElementById("score").textContent =
        percent + "%";

    let description = "";

    if (percent >= 80) {
        description = "Javoblaringiz sinf muhitini ijobiy baholayotganingizni ko‘rsatadi.";
    } else if (percent >= 60) {
        description = "Sinf muhiti asosan ijobiy, ayrim jihatlarni yaxshilash mumkin.";
    } else if (percent >= 40) {
        description = "Sinfdagi munosabatlar va hamkorlikka ko‘proq e'tibor berish kerak.";
    } else {
        description = "Javoblaringiz sinf muhitini yaxshilash zarurligini ko‘rsatmoqda.";
    }

    document.getElementById("resultDescription").textContent =
        description;

    document.getElementById("resultText").textContent =
        "Sizning individual natijangiz:";
}

function saveResult() {
    let results = JSON.parse(
        localStorage.getItem("classResults")
    ) || [];

    results.push({
        score: calculateScore(),
        date: new Date().toLocaleString("uz-UZ"),
        answers: answers
    });

    localStorage.setItem(
        "classResults",
        JSON.stringify(results)
    );

    showStatistics();
}

function showStatistics() {
    document.getElementById("result").classList.add("hidden");
    document.getElementById("statistics").classList.remove("hidden");

    let results = JSON.parse(
        localStorage.getItem("classResults")
    ) || [];

    let total = results.length;

    document.getElementById("totalStudents").textContent =
        `Testni ishlaganlar soni: ${total}`;

    let content = document.getElementById("statisticsContent");

    if (total === 0) {
        content.innerHTML = "<p>Hozircha natijalar yo‘q.</p>";
        return;
    }

    let average = results.reduce(
        (sum, item) => sum + item.score, 0
    ) / total;

    let maxScore = questions.length * 4;
    let percent = Math.round((average / maxScore) * 100);

    content.innerHTML = `
        <div class="stat-card">
            <strong>O‘rtacha sinf ko‘rsatkichi:</strong>
            ${percent}%
        </div>
        <div class="stat-card">
            <strong>Jami ishtirokchilar:</strong>
            ${total} nafar
        </div>
        <div class="stat-card">
            <strong>Eng yuqori natija:</strong>
            ${Math.round(Math.max(...results.map(r => r.score)) / maxScore * 100)}%
        </div>
        <div class="stat-card">
            <strong>Eng past natija:</strong>
            ${Math.round(Math.min(...results.map(r => r.score)) / maxScore * 100)}%
        </div>
    `;
}

function restartTest() {
    startTest();
}

function showWelcome() {
    document.getElementById("statistics").classList.add("hidden");
    document.getElementById("welcome").classList.remove("hidden");
}