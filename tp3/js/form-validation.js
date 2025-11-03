window.onload = function () {
    const form = document.getElementById("myForm");
    const modal = new bootstrap.Modal(document.getElementById("myModal"));
    const modalBody = document.querySelector(".modal-body");
    const modalTitle = document.querySelector(".modal-title");

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(id, message) {
        document.getElementById(id).textContent = message;
    }

    function clearErrors() {
        ["lastnameError", "firstnameError", "birthdayError", "addressError", "emailError"].forEach(id => {
            showError(id, "");
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();

        const lastname = document.getElementById("lastname").value.trim();
        const firstname = document.getElementById("firstname").value.trim();
        const birthday = document.getElementById("birthday").value;
        const address = document.getElementById("address").value.trim();
        const email = document.getElementById("email").value.trim();

        // Vérification des champs vides
        if (!lastname || !firstname || !birthday || !address || !email) {
            modalTitle.textContent = "Erreur de saisie";
            modalBody.innerHTML = "Tous les champs sont obligatoires.";
            modal.show();
            return; // On arrête la validation ici
        }

        let hasError = false;
        let errorMessages = [];

        if (lastname.length < 5) {
            showError("lastnameError", "Le nom doit contenir au moins 5 caractères.");
            errorMessages.push("Nom : doit contenir au moins 5 caractères.");
            hasError = true;
        }
        if (firstname.length < 5) {
            showError("firstnameError", "Le prénom doit contenir au moins 5 caractères.");
            errorMessages.push("Prénom : doit contenir au moins 5 caractères.");
            hasError = true;
        }
        if (address.length < 5) {
            showError("addressError", "L'adresse doit contenir au moins 5 caractères.");
            errorMessages.push("Adresse : doit contenir au moins 5 caractères.");
            hasError = true;
        }
        if (!validateEmail(email)) {
            showError("emailError", "Email invalide.");
            errorMessages.push("Email : invalide.");
            hasError = true;
        }

        const birthdayTimestamp = new Date(birthday).getTime();
        if (isNaN(birthdayTimestamp)) {
            showError("birthdayError", "Date invalide.");
            errorMessages.push("Date de naissance : invalide.");
            hasError = true;
        } else if (birthdayTimestamp > Date.now()) {
            showError("birthdayError", "La date de naissance ne peut pas être dans le futur.");
            errorMessages.push("Date de naissance : ne peut pas être dans le futur.");
            hasError = true;
        }

        if (hasError) {
            modalTitle.textContent = "Erreur de saisie";
            modalBody.innerHTML = errorMessages.join("<br>");
            modal.show();
        } else {
            modalTitle.textContent = "Bienvenu " + firstname + " !";
            const mapsLink = `https://maps.google.com/maps?q=${encodeURIComponent(address)}`;
            modalBody.innerHTML = `Vous êtes né(e) le ${birthday} et vous habitez : <br> <a href="${mapsLink}" target="_blank">${address}</a>`;
            modal.show();
        }
    });
};
