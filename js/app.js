// Uzrakstīt ko katra no šīm lietām dara. Kā arā atrast HTML vai JS kādas niepilnābas ko varētu noverst.

// 1.
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// 2.
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

// 3.
let LIST, id;

// 4.
let data = localStorage.getItem('TODO');

// 5.
if (data) {
	LIST = JSON.parse(data);
	id = LIST.length; // 6.
	loadList(LIST); // 7.
} else {
	LIST = [];
	id = 0;
}

// 8.
function loadList(array) {
	array.forEach(function(item) {
		addToDo(item.name, item.id, item.done, item.trash);
	});
}

// 9.
clear.addEventListener('click', function() {
	localStorage.clear();
	location.reload();
});

// 10.
const options = { weekday: 'long', month: 'short', day: 'numeric' };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// 11.
function addToDo(toDo, id, done, trash) {
	if (trash) {
		return;
	}

	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : '';

	const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">Tudiš pi ${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;

	const position = 'beforeend';

	list.insertAdjacentHTML(position, item);
}

// 12.
document.addEventListener('keyup', function(even) {
	if (event.keyCode == 13) {
		const toDo = input.value;

		// 13.
		if (toDo) {
			addToDo(toDo, id, false, false);

			LIST.push({
				name: toDo,
				id: id,
				done: false,
				trash: false
			});

			// 13.
			localStorage.setItem('TODO', JSON.stringify(LIST));

			id++;
		}
		input.value = '';
	}
});

// 14.
function completeToDo(element) {
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

	LIST[element.id].done = LIST[element.id].done ? false : true;
}

// 15.
function removeToDo(element) {
	element.parentNode.parentNode.removeChild(element.parentNode);

	LIST[element.id].trash = true;
}

// 16.
list.addEventListener('click', function(event) {
	const element = event.target; // 17.
	const elementJob = element.attributes.job.value; // 18.

	if (elementJob == 'complete') {
		// 19.
		completeToDo(element);
	} else if (elementJob == 'delete') {
		// 20.
		removeToDo(element);
	}

	localStorage.setItem('TODO', JSON.stringify(LIST));
});
