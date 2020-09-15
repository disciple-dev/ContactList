(function(root, factory){
	root.Contact = factory()
})(this, function(){
	const emailProof = new RegExp(/\S+@\S+\.\S+/)
	return {
		create: function(first, last, email){
			
			if(first) first = first.trim()
			if(last) last = last.trim()
			if(email) email = email.trim().toLowerCase()
			
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
			uniqueEmail: function(list, email){
				 return list.indexOf(email) == -1
			},
			firstName: function(name){
				if(!name || name.length < 3 || name.lenth > 25) return false
				return true
			},
			lastName: function(name){
				if(name && name.length < 2 || name.length > 30) return false
				return true
			},
			contact: function(contact, checkEmail){
				if(checkEmail && !Contact.validate.email(contact.email)) return false
				if(!Contact.validate.firstName(contact.firstName)) return false
				if(!Contact.validate.lastName(contact.lastName)) return false
				return true
			}
		}
	}
})