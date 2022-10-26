let btnCreate = document.querySelector("#btnCreate");
let btnCheck = document.querySelector("#btnCheck");
let list = document.querySelector(".contactList");
let container = document.querySelector(".container");
let form = document.querySelector("form");
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let img = document.querySelector("#img");

let inputs = document.querySelectorAll("input");
let count = 0;

createContact();
btnCheck.addEventListener("click", (e) => {
    e.preventDefault();
    count++;
    if (count % 2 == 0) {
        container.style.display = "none";
    } else {
        container.style.display = "block";
    }
});
btnCreate.addEventListener("click", (e) => {
    e.preventDefault();
    let contacts = {
        name: name.value,
        email: email.value,
        img: img.value,
    };
    setContactToStorage(contacts);
    createContact();
    for (x of inputs) {
        x.value = "";
    }
});

function createContact() {
    if (!localStorage.getItem("contacts")) {
        localStorage.setItem("contacts", JSON.stringify([]));
    }
    list.innerHTML = "";
    let contactsArr = JSON.parse(localStorage.getItem("contacts"));

    contactsArr.forEach((element, index) => {
        //! CreateContact
        let contact = document.createElement("div");
        contact.classList.add("contact");
        let nameLi = document.createElement("p");
        let emailLi = document.createElement("p");
        let img = document.createElement("img");
        let imgDiv = document.createElement("div");
        let infoDiv = document.createElement("div");
        infoDiv.classList.add("infoDiv");
        imgDiv.classList.add("imgDiv");
        img.src = `${element.img}`;
        nameLi.innerText = `name: ${element.name}`;
        emailLi.innerText = `email: ${element.email}`;

        imgDiv.append(img);
        list.append(contact);
        contact.append(imgDiv);
        contact.append(infoDiv);
        infoDiv.append(nameLi);
        infoDiv.append(emailLi);

        //! DeleteContact
        let btnDelete = document.createElement("button");
        btnDelete.innerText = "Delete";
        let btnDiv = document.createElement("div");
        btnDiv.classList.add("btnDiv");

        btnDiv.append(btnDelete);
        contact.append(btnDiv);

        btnDelete.addEventListener("click", () => {
            deleteContact(index);
        });

        //! EditContact
        let btnEdit = document.createElement("button");
        btnEdit.innerText = "Edit";
        btnEdit.addEventListener("click", () => {
            EditContact(index);
        });
        btnDiv.append(btnEdit);
    });
}

function setContactToStorage(contacts) {
    let contactsList = JSON.parse(localStorage.getItem("contacts")) || [];
    contactsList.push(contacts);
    localStorage.setItem("contacts", JSON.stringify(contactsList));
}

function deleteContact(index) {
    let contactsList = JSON.parse(localStorage.getItem("contacts")) || [];
    contactsList.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contactsList));
    createContact();
}

let mainModal = document.querySelector(".main-modal");
let inpEditName = document.querySelector(".inpEditName");
let inpEditMail = document.querySelector(".inpEditMail");
let inpEditImg = document.querySelector(".inpEditImg");
let btnCloser = document.querySelector(".btnCloser");

function EditContact(index) {
    document.body.style.backgroundColor = "rgb(224, 224, 224)";
    // form.style.display = "none";
    // container.style.display = "none";
    mainModal.style.display = "block";
    let contact = JSON.parse(localStorage.getItem("contacts"));
    inpEditName.setAttribute("id", index);
    inpEditMail.setAttribute("id", index);
    inpEditImg.setAttribute("id", index);

    inpEditName.value = contact[index].name;
    inpEditMail.value = contact[index].email;
    inpEditImg.value = contact[index].img;
}

let btnSave = document.querySelector(".btnSave");

btnSave.addEventListener("click", () => {
    document.body.style.backgroundColor = "white";
    form.style.display = "block";
    container.style.display = "block";
    let contacts = JSON.parse(localStorage.getItem("contacts"));
    console.log(contacts);
    let nameId = inpEditName.id;
    let mailId = inpEditMail.id;
    let imgId = inpEditImg.id;
    if (
        !inpEditImg.value.trim() ||
        !inpEditMail.value.trim() ||
        !inpEditImg.value.trim()
    ) {
        alert("Заполните все поля!");
        return;
    }

    let upContact = {
        name: inpEditName.value,
        email: inpEditMail.value,
        img: inpEditImg.value,
    };
    contacts.splice(nameId, 1, upContact);
    contacts.splice(mailId, 1, upContact);
    contacts.splice(imgId, 1, upContact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    mainModal.style.display = "none";
    createContact();
});

btnCloser.addEventListener("click", () => {
    document.body.style.backgroundColor = "white";
    form.style.display = "block";
    container.style.display = "block";
    mainModal.style.display = "none";
});
