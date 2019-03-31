
export async function getInventory() {
	return fetch("/api/inventory")
		.then(resp => {
			if (!resp.ok){
				if(resp.status >= 400 && resp.status < 500){
					return resp.json().then(data => {
						let err = {errMessage: data.message};
						throw err;
					})
				} else{
					let err = {errMessage: "server not responding"};
					throw err;
				}
			}
			return resp.json();
		})
}

export async function addInventory(val){
	return fetch("/api/inventory",{
			method: 'post',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(val)
		})
		.then(resp => {
			if (!resp.ok){
				if(resp.status >= 400 && resp.status < 500){
					return resp.json().then(data => {
						let err = {errMessage: data.message};
						throw err;
					})
				} else{
					let err = {errMessage: "server not responding"};
					throw err;
				}
			}
			return resp.json();
		})
}

export async function updateInventory(inventory) {
	const updateURL = "/api/inventory/" + inventory.name;
	return fetch(updateURL, {
    	method: 'put',
    	headers: new Headers({
    		'Content-Type': 'application/json',
    	}),
    	body: JSON.stringify({stock: inventory.stock})
	})
	.then(resp => {
    	if(!resp.ok) {
        	if(resp.status >=400 && resp.status < 500) {
          		return resp.json().then(data => {
            	let err = {errorMessage: data.message};
            	throw err;
        	})
        } else {
        	let err = {errorMessage: 'Please try again later, server is not responding'};
        	throw err;
        }
    }
    return resp;
   })
}

export async function getRestrictions() {
	return fetch("/api/restrictions")
		.then(resp => {
			if (!resp.ok){
				if(resp.status >= 400 && resp.status < 500){
					return resp.json().then(data => {
						let err = {errMessage: data.message};
						throw err;
					})
				} else{
					let err = {errMessage: "server not responding"};
					throw err;
				}
			}
			return resp.json();
		})
}
