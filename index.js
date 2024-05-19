const inputsForm = document.querySelectorAll(".inputsForm");

let contacts = []; // Tableau pour stocker tous les contacts

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Récupérer les valeurs du formulaire
  const nameValue = document.getElementById("name").value;
  const numberValue = document.getElementById("phone").value;
  const emailValue = document.getElementById("email").value;

  // Créer un nouvel objet contact
  const newContact = {
    name: nameValue,
    number: numberValue,
    email: emailValue,
  };

  // Ajouter le nouveau contact au tableau
  contacts.push(newContact);

  // Convertir le tableau de contacts en format JSON
  const jsonContacts = JSON.stringify(contacts);

  // Stocker le tableau de contacts dans le localStorage avec une clé unique
  localStorage.setItem("contacts", jsonContacts);

  // Afficher le contact dans la liste
  displayContact(newContact);

  // Réinitialiser le formulaire
  contactForm.reset();
});

// Récupérer les données du localStorage au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  const storedContact = localStorage.getItem("contact");
  if (storedContact) {
    const contact = JSON.parse(storedContact);
    displayContact(contact);
  }
});

// Afficher le contact dans la liste
function displayContact(contact) {
  contactList.innerHTML += `
      <li class="contactCard">
        <h4>${contact.name}</h4>
        <h5>${contact.number}</h5>
        <p>${contact.email}</p>
        <button class="delete">delete</button>
      </li>
    `;
}

// Ajouter un événement pour les boutons de suppression
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    const index = contacts.findIndex(
      (contact) =>
        contact.name === e.target.parentElement.querySelector("h4").textContent
    );
    if (index !== -1) {
      contacts.splice(index, 1); // Supprimer le contact du tableau
      const jsonContacts = JSON.stringify(contacts);
      localStorage.setItem("contacts", jsonContacts); // Mettre à jour le localStorage
    }
  }
});

// Chargement des contacts depuis le localStorage au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  const storedContacts = JSON.parse(localStorage.getItem("contacts"));
  if (storedContacts) {
    contacts = storedContacts;
    storedContacts.forEach((contact) => {
      contactList.innerHTML += `
        <li class="contactCard">
          <h4>${contact.name}</h4>
          <h5>${contact.number}</h5>
          <p>${contact.email}</p>
          <button class="delete">delete</button>
        </li>
        `;
    });
  }
});

search.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase(); // Convertir le texte en minuscules pour une recherche insensible à la casse

  // Filtrer les contacts qui correspondent au texte de recherche
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchText)
  );

  // Afficher les contacts filtrés
  displayFilteredContacts(filteredContacts);
});

// Fonction pour afficher les contacts filtrés
function displayFilteredContacts(filteredContacts) {
  // Vider la liste des contacts actuelle
  contactList.innerHTML = "";

  // Afficher les contacts filtrés dans la liste
  filteredContacts.forEach((contact) => {
    contactList.innerHTML += `
        <li class="contactCard">
          <h4>${contact.name}</h4>
          <h5>${contact.number}</h5>
          <p>${contact.email}</p>
          <button class="delete">delete</button>
        </li>
      `;
  });
}
