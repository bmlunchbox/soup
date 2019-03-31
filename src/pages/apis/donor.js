
export async function getDonations() {
	return fetch("/api/donation")
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

export async function getDonors() {
	return fetch("/api/donor")
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


