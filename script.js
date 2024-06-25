document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const firstName = form.firstName.value.trim();
        const lastName = form.lastName.value.trim();
        const age = parseInt(form.age.value.trim(), 10);

        if (firstName && lastName && age >= 18) {
            addUserToTable(firstName, lastName, age);
            saveUserToLocalStorage(firstName, lastName, age);
            form.reset();
        } else {
            alert('Please fill all fields and ensure age is 18 or older.');
        }
    });

    const addUserToTable = (firstName, lastName, age) => {
        const row = userTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.textContent = firstName;
        cell2.textContent = lastName;
        cell3.textContent = age;
    };

    const saveUserToLocalStorage = (firstName, lastName, age) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ firstName, lastName, age });
        localStorage.setItem('users', JSON.stringify(users));
    };

    const loadUsersFromLocalStorage = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => addUserToTable(user.firstName, user.lastName, user.age));
    };

    loadUsersFromLocalStorage();
});
