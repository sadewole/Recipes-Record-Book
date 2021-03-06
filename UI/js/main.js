const modal = document.querySelector('.modal');
const editModal = document.querySelector('.editModal');
const addRecipe = document.getElementById('addRecipe');
const editRecipe = document.getElementById('editRecipe');
const recipeContainer = document.querySelector('.recipeContainer');
const addErrorVal = document.getElementById('addErrorVal');
let id = null;
const url = 'http://localhost:3000/api/v1/';

const title = document.getElementById('title');
const direction = document.getElementById('direction');
const ingredient = document.getElementById('ingredient');

const clearError = () => {
	addErrorVal.innerHTML = '';
};

title.addEventListener('keyup', clearError);
direction.addEventListener('keyup', clearError);
ingredient.addEventListener('keyup', clearError);

const addPost = (e) => {
	e.preventDefault();

	const result = {
		title: document.getElementById('title').value,
		direction: document.getElementById('direction').value,
		ingredient: document.getElementById('ingredient').value
	};

	fetch(`${url}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'content-type': 'application/json'
		},
		body: JSON.stringify(result)
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status === 201) {
				alert(data.message);
				window.location.href = '';
			}
			addErrorVal.innerHTML = data.error.message;
		});
};
const getSingleRecipe = () => {
	fetch(`${url}/${id}`)
		.then((res) => res.json())
		.then((data) => {
			const { title, ingredient, direction } = data;

			const output = `<form method="post" enctype="multipart/form-data" class="edit_form">
			<div class="form-group">
				<label>Title:</label>
				<input type="text" name="title" id="editTitle" value="${title}">
			</div>
			<div class="form-group">
				<label>Ingredient:</label>
				<textarea name="ingredient" id="editIngredient" >${ingredient}</textarea>
			</div>
			<div class="form-group">
				<label>Direction:</label>
				<textarea name="direction" id="editDirection" >${direction}</textarea>
			</div>
			<p id="editErrorVal"></p>
			<button class="success" id="editRecipe" type="button" >Save</button>
			<button class="danger" type="reset">Cancel</button>
			</form>`;

			document.querySelector('.editModal').innerHTML = output;
		})
		.catch((err) => console.error(err));
};

const editPost = () => {
	const result = {
		title: document.getElementById('editTitle').value,
		direction: document.getElementById('editDirection').value,
		ingredient: document.getElementById('editIngredient').value
	};
	const editErrorVal = document.getElementById('editErrorVal');

	fetch(`${url}/${id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'content-type': 'application/json'
		},
		body: JSON.stringify(result)
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status === 201) {
				alert(data.message);
				window.location.href = '';
			}
			editErrorVal.innerHTML = data.error.message;
		});
};

const deletePost = () => {
	fetch(`${url}/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'content-type': 'application/json'
		}
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status == 200) console.log('success');
			window.location.href = '';
		});
};

loadAllRecipe = () => {
	fetch(`${url}`).then((res) => res.json()).then((data) => {
		const output = data.map((recipe) => {
			recipeContainer.innerHTML += `<div class="card">
					<div class="card-head">
					<h2>${recipe.title}</h2>
					<i class="fab fa-periscope"></i>
					</div>
					<div class="card-body" hidden>
					<p><strong>Ingredient:</strong>${recipe.ingredient}</p>
					<p><strong>Direction:</strong>${recipe.direction}</p>
					<span>
						<i class="far fa-edit" data-id=${recipe._id} data-title=${recipe.title} data-ingredient=${recipe.ingredient} data-direction=${recipe.direction}></i>
						<i class="far fa-trash-alt" data-id=${recipe._id}></i>
					</span>
					</div>
				</div>`;
		});
	});
};

// load all recipe once page is visited
window.addEventListener('load', () => {
	loadAllRecipe();
});

// event delegation
const toggleDone = (e) => {
	if (e.target.matches('i.fa-trash-alt')) {
		id = e.target.getAttribute('data-id');
		deletePost();
	}
	if (e.target.matches('i.fa-edit')) {
		id = e.target.getAttribute('data-id');
		editMenu();
	}
	if (e.target.matches('i.fab')) {
		const ln = e.target.parentElement.parentElement.childNodes[3];
		if (ln.hasAttribute('hidden')) {
			ln.removeAttribute('hidden');
		} else {
			ln.setAttribute('hidden', 'hidden');
		}
	}
	return;
};

const toggleEdit = (e) => {
	if (e.target.matches('button.success')) {
		editPost();
	}

	if (e.target.matches('button.danger')) {
		editModal.style.display = 'none';
	}
};

const addMenu = () => {
	modal.style.display = 'block';
};

const editMenu = () => {
	editModal.style.display = 'block';
	getSingleRecipe();
};

const exitModal = (e) => {
	if (e.target == modal || e.target == editModal) {
		modal.style.display = 'none';
		editModal.style.display = 'none';
	}
};

const close = () => {
	modal.style.display = 'none';
};

// default event/action
const Modal = () => {
	window.addEventListener('click', exitModal);
	document.querySelector('.add-item').addEventListener('click', addMenu);
	document.querySelector('.danger').addEventListener('click', close);
	recipeContainer.addEventListener('click', toggleDone);
	editModal.addEventListener('click', toggleEdit);
	addRecipe.addEventListener('click', addPost);
};

Modal();
