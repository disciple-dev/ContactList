(function(self, factory){
	
	if(typeof(window.ContactStorage) == 'undefined'){
		
		window.ContactStorage = factory()
		ContactStorage.init()
	}
})(this, function(){
	
	const contactKey = 'contacts'
	
	const init = function(){
		
		if(!localStorage.getItem(contactKey)){
			
			localStorage.setItem(contactKey, JSON.stringify([]))			
		}
		
		if(list().length == 0){
			
			localStorage.setItem(contactKey, JSON.stringify({
				0: { firstName: "Aaron", lastName: "Bob", email: "abob@example.com"},
				1: { firstName: "Charlie", lastName: "Doolittle", email: "cdoolittle@example.com"},
				3: { firstName: "Erich", lastName: "Fillion", email: "efillion@example.com"},
				4: { firstName: "Gertrude", lastName: "Hamilton", email: "ghamilton@example.com"}
			}))
		}

	}
	
	const list = function(){
		return JSON.parse(localStorage.getItem(contactKey))
	}
	
	const getContact = function(id){
		return list()[id]
	}
	
	const createId = function(){
		let ids = Object.keys(list())
		
		return Math.max.apply(null, ids) + 1
	}
	
	const add = function(contact){
		let contacts = list()
		
		contacts[createId().toString()] = contact
		
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
	
	const remove = function(id){
		
		let contacts = list()
		
		delete contacts[id]
		
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