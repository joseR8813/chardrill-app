 (function(){
 function renderLesson(lesson) {

    document.getElementById("lesson-title").textContent = lesson.title;

    let html = "";

    lesson.dialogues.forEach(dialogue => {
        html += `<h2>${dialogue.heading}</h2>`;
        dialogue.lines.forEach(line => {
        html += `
            <div class="line">
            <p class="hz">${line.hz}</p>
            <p class="zy">${line.zy}</p>
            <p class="py">${line.py}</p>
            </div>
        `;
        });
        html += `<audio src="${dialogue.audio}" controls></audio>`;
    });

    document.getElementById("lesson-body").innerHTML = html;
    }

    const select = document.getElementById("chapter-select");
    Object.keys(LESSONS).forEach(key => {
        const opt = document.createElement("option");
        opt.value = key;
        opt.textContent = LESSONS[key].title;
        select.appendChild(opt);
    });

    let saved = null;
    try { saved = localStorage.getItem("readingChapter"); } catch (err) {}
    const start = (saved && LESSONS[saved]) ? saved : Object.keys(LESSONS)[0];

    select.value = start;
    renderLesson(LESSONS[start]);

    select.addEventListener("change", () => {
    renderLesson(LESSONS[select.value]);
    try { localStorage.setItem("readingChapter", select.value); } catch (err) {}
    });
})();