document.addEventListener("DOMContentLoaded", function () {

  const contactsList = document.getElementById("contacts-list");
  const contactCreate = document.getElementById("create-contact");
  const contactEdit = document.getElementById("edit-contact");

  const contactTable = {
    createElement: function (text) {
      let el = document.createElement("td");
      el.innerHTML = text;
      return el;
    },
    add: function (contact, id) {
      let tr = document.createElement("tr");

      tr.appendChild(contactTable.createElement(contact.firstName));
      tr.appendChild(contactTable.createElement(contact.lastName));
      tr.appendChild(contactTable.createElement(contact.email));

      let actions = document.createElement("td");

      let editLink = document.createElement("a");
      editLink.href = "edit-contact.html?id=" + id;
      editLink.className = "action edit button";
      editLink.innerHTML = "Edit";
      editLink.dataset.id = id;

      let deleteLink = document.createElement("a");
      deleteLink.className = "action remove-contact button";
      deleteLink.innerHTML = "Delete";
      deleteLink.dataset.id = id;

      actions.appendChild(editLink);
      actions.appendChild(deleteLink);

      tr.appendChild(actions);

      contactsList.getElementsByTagName("tbody")[0].appendChild(tr);
    },
  };

  const deleteClass = "remove-contact";
  const editClass = "edit-contact";

  if (contactsList) {
    let list = ContactStorage.list();
	
	Object.keys(list).forEach(function(key){
		contactTable.add(list[key], key)
	})

    contactsList.addEventListener("click", function (e) {
      if (e.target.className.indexOf(deleteClass) != -1) {
        if (confirm('Do you want to delete contact ' + e.target.dataset.id + '?')) {
          if (ContactStorage.remove(e.target.dataset.id)) {
            let row = e.target.parentElement;
            while (row.tagName.toLowerCase() != "tr") {
              row = row.parentElement;

              if (row.tagName.toLowerCase() == "tr") {
                row.parentNode.removeChild(row);
              }
            }
          }
        }
      }
    });
  }

  if (contactCreate) {
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email-address");

    const submitButton = document.getElementById("submit-contact");
    submitButton.addEventListener("click", function () {
      let contactData = Contact.create(
        firstName.value,
        lastName.value,
        email.value
      );

      let validContact = Contact.validate.contact(contactData, true);
	  let contacts = ContactStorage.list()
	  let keys = Object.keys(contacts)
	  
	  let emails = Object.keys(ContactStorage.list()).map(function(item){
		  return contacts[item].email
	  })
	  
      let isUniqueEmail = Contact.validate.uniqueEmail(emails, contactData.email)

      if (validContact && isUniqueEmail) {
        ContactStorage.add(contactData);
      }
    });
  }
  
  if(contactEdit){
	
	// Obviously this all is a lot easier if we don't support Internet Explorer
	let id = -1
	let queryParams = window.location.search.replace('?','').split('&')
	
	for(var i = 0; i < queryParams.length; i++){
		let item = queryParams[i].split('=')
		if(item[0] == 'id') id = item[1]
	}
	
	if(id > -1){
		
		const contact = ContactStorage.get(id)
		
		// TODO: we also declared the following above; create a method
		const firstName = document.getElementById("first-name")
		const lastName = document.getElementById("last-name")
		const email = document.getElementById("email-address")
		const submitButton = document.getElementById("submit-contact")
		
		firstName.value = contact.firstName
		lastName.value = contact.lastName
		email.value = contact.email
		
		submitButton.addEventListener('click', function(){
			
			submitButton.disabled = true
			
			let contactData = Contact.create(firstName.value, lastName.value)
			
			let updated = ContactStorage.update(id, contactData)
			
			// TODO: add message to user that saving failed
			
			submitButton.disabled = false;
		})
	}
  }
});
