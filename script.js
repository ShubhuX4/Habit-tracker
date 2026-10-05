let habits = JSON.parse(localStorage.getItem("habits")) || [];

function showHabits() {

    let habitList = document.getElementById("habitList");

    habitList.innerHTML = "";

    for (let i = 0; i < habits.length; i++) {

        let habit = habits[i];

        let habitDiv = document.createElement("div");
        habitDiv.className = "habit";

        let leftDiv = document.createElement("div");
        leftDiv.className = "habit-left";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = habit.completed;

        checkbox.onclick = function() {
            habits[i].completed = checkbox.checked;

            saveHabits();
            showHabits();
        };

        let habitName = document.createElement("span");
        habitName.innerText = habit.name;

        if (habit.completed) {
            habitName.className = "completed";
        }

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(habitName);

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.onclick = function() {
            habits.splice(i, 1);

            saveHabits();
            showHabits();
        };

        habitDiv.appendChild(leftDiv);
        habitDiv.appendChild(deleteButton);

        habitList.appendChild(habitDiv);
    }

    updateProgress();
}


function addHabit() {

    let input = document.getElementById("habitInput");

    let habitName = input.value.trim();

    if (habitName == "") {
        alert("Please enter a habit!");
        return;
    }

    let newHabit = {
        name: habitName,
        completed: false
    };

    habits.push(newHabit);

    input.value = "";

    saveHabits();
    showHabits();
}


function updateProgress() {

    let total = habits.length;
    let completed = 0;

    for (let i = 0; i < habits.length; i++) {

        if (habits[i].completed) {
            completed++;
        }
    }

    let percentage = 0;

    if (total > 0) {
        percentage = Math.round((completed / total) * 100);
    }

    document.getElementById("progress").style.width = percentage + "%";

    document.getElementById("progressText").innerText =
        percentage + "% completed (" + completed + "/" + total + ")";
}


function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}


showHabits();