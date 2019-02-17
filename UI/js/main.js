// add modal function
const modal = document.querySelector('.modal');

const addMenu = () => {
	modal.style.display = 'block';
};

// const editMenu = () => {
// 	const edit = document.querySelectorAll('.edit');
// 	edit.forEach((i) => {
// 		i.addEventListener('click', () => {
// 			modalbg.style.display = 'block';
// 			document.querySelector('.addModal').style.marginTop = '0px';
// 		});
// 	});
// };

const exitModal = (e) => {
	if (e.target == modal) {
		modal.style.display = 'none';
	}
};

// const close = () => {
// 	let close = document.querySelectorAll('.close');

// 	close.forEach((i) => {
// 		i.addEventListener('click', () => {
// 			modal.style.display = 'none';
// 		});
// 	});
// };

const Modal = () => {
	window.addEventListener('click', exitModal);
	document.querySelector('.add-item').addEventListener('click', addMenu);
	// editMenu();
	// close();
};

Modal();

// end
