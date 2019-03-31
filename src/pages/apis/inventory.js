
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
