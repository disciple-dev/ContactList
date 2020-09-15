(function(root, factory){
	root.Contact = factory()
})(this, function(){
	const emailProof = new RegExp(/\S+@\S+\.\S+/)
	return {
		create: function(first, last, email){
			return {
				firstName: first,
				lastName: last,
				email: email
			}
		},
		validate: {
			email: function(email){
				return emailProof.test(email)
			},
			firstName: function(name){
				if(!name) return false
				if(!name.length) return false
				return true
			},
			lastName: function(name){
				if(!name) return false
				if(!name.length) return false
				return true
			},
			contact: function(contact, checkEmail){
				if(checkEmail && !Contact.validate.email(contact.email)) return false
				if(!Contact.validate.firstName(contact.firstName)) return false
				if(!Contact.validate.lastName(contact.lastName)) return false
				return true
			},
			isDuplicate(list, contact){
				
				for(var i = 0; i < list.length; i++){
					if(list[i].firstName.toLowerCase() == contact.firstName.toLowerCase()
					&& list[i].lastName.toLowerCase() == contact.lastName.toLowerCase()
					&& list[i].email.toLowerCase() == contact.email.toLowerCase())
					
					return true
				}
				
				return false
			}
		}
	}
})