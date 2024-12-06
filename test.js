function loadQuestions() {
    let totalMarks = questions.length * 4;
    document.getElementById("total-marks-value").innerText = totalMarks;

    questions.forEach((q, index) => {
        const questionBlock = document.createElement("div");
        questionBlock.className = "question-block";

        const questionText = document.createElement("p");
        questionText.className = "question-text";
        questionText.innerText = `${index + 1}. ${q.text}`;

        questionBlock.appendChild(questionText);

        q.images.forEach((imageSrc) => {
            const questionImage = document.createElement("img");
            questionImage.className = "question-image";
            questionImage.src = imageSrc;
            questionBlock.appendChild(questionImage);
        });

        const optionsList = document.createElement("ul");
        optionsList.className = "options";

        q.options.forEach((option, i) => {
            const optionItem = document.createElement("li");
            optionItem.innerHTML = `
                <input type="radio" name="q${index}" value="${i + 1}">
                ${option}
            `;
            optionsList.appendChild(optionItem);
        });

        questionBlock.appendChild(optionsList);
        questionsSection.appendChild(questionBlock);
    });
}
function submitTest() {
    const questionBlocks = document.querySelectorAll(".question-block");
    let correct = 0, wrong = 0, answered = 0;

    questionBlocks.forEach((block, index) => {
        const correctAnswer = questions[index].correct;
        const selectedOption = block.querySelector(`input[name="q${index}"]:checked`);
        const optionsList = block.querySelectorAll(".options li");

        // Highlight correct and incorrect options
        optionsList.forEach((option, i) => {
            if (i + 1 === correctAnswer) {
                option.classList.add("correct");
            }
        });

        if (selectedOption) {
            answered++; // Count only the answered questions
            if (parseInt(selectedOption.value, 10) !== correctAnswer) {
                optionsList[parseInt(selectedOption.value, 10) - 1].classList.add("wrong");
                wrong++;
            } else {
                correct++;
            }
        }
    });

    // Calculate result based on the total marks
    const resultMarks = (correct * 4) + (wrong * -1); // Adjust scoring logic
    const totalMarks = questions.length * 4; // Total marks for all questions
    const percentage = ((resultMarks / totalMarks) * 100).toFixed(2); // Percentage based on total marks

    // Ensure negative marks do not cause percentage to go below 0
    const adjustedPercentage = Math.max(0, percentage);

    // Update Result Display
    document.getElementById("result-marks").innerHTML = `${resultMarks} (${adjustedPercentage}%)`;
    document.getElementById("result-section").style.display = "block";
    document.querySelector(".retry-btn").style.display = "block";
}


function retryTest() {
    window.location.reload();
}

function viewSolution() {
    const popup = document.getElementById("popup");
    const iframe = popup.querySelector("iframe");
    iframe.src = "https://anzaaneducation.blogspot.com/2024/11/Physics%20MCQ%20For%20NEET%202025.html";
    popup.style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

loadQuestions();









document.querySelector(".submit-btn").addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});