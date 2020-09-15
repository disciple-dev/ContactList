(function(self, factory){
	
	if(typeof(window.ContactStorage) == 'undefined'){
		
		window.ContactStorage = factory()
		ContactStorage.init()
	}
})(this, function(){
	
	const contactKey = 'contacts'
	
	const init = function(){
		
		if(!localStorage.getItem('contacts')){
			localStorage.setItem(contactKey, JSON.stringify([]))			
		}

	}
	
	const list = function(){
		return JSON.parse(localStorage.getItem(contactKey))
	}
	
	const getContact = function(id){
		return list()[id]
	}
	
	const add = function(contact){
		let contacts = list()
		contacts.push(contact)
		
		localStorage.setItem(contactKey, JSON.stringify(contacts))
	}
	
	const update = function(id, contact){
		
		try {
			let oldContact = getContact(id)
			let newContact = {
				email: oldContact.email,
				firstName: contact.firstName,
				lastName: contact.lastName
			}
			
			
			let contacts = list()
			contacts[id] = newContact
			
			localStorage.setItem(contactKey, JSON.stringify(contacts))
			
			return true
		} catch (err) {
			console.error(err)
			return false
		}
	}
	
	const remove = function(index){
		
		let contacts = list()
		
		contacts.splice(index, 1)
		
		try{
			localStorage.setItem(contactKey, JSON.stringify(contacts))
			return true
		}
		catch (err){
			
			console.error(err)

			return false
		}
	}
	
	return {
		init: init,
		list: list,
		get: getContact,
		add: add,
		update: update,
		remove: remove
	}
})