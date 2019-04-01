
export async function getRecipes() {
	return fetch("/api/recipe")
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

export async function getMenuRecipes() {
	return fetch("/api/recipe/menu")
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

export async function addRecipe(val){
	return fetch("/api/recipe",{
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

export async function addIngredient(val){
	return fetch("/api/recipe/ingredient",{
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