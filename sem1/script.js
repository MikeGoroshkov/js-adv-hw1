// Создайте механизм для безопасного добавления метаданных к объектам книг с использованием Symbol

const reviewSymbol = Symbol('review');
const ratingSymbol = Symbol('rating');
const tagsSymbol = Symbol('tags');

function addMetadata(book, metadataType, data){
	if (!book[metadataType]){
		book[metadataType] = [];
	}
	book[metadataType].push(data);
}

function getMetadata(book, metadataType){
	return book[metadataType];
}

let book = {
	title: "1984",
	author: "George Orwell"
}

addMetadata(book, reviewSymbol, "Good book");
addMetadata(book, ratingSymbol, 5);
addMetadata(book, tagsSymbol, "dystopia");
console.log(getMetadata(book, reviewSymbol));
console.log(getMetadata(book, ratingSymbol));
console.log(getMetadata(book, tagsSymbol));

// Используя Symbol.iterator, создайте объект "Библиотека", который можно итерировать. Кждая итерация должна возвращать следующую книгу
// создайте объект library, который содержит массив книг и имеет свойство Symbol.iterator
// Реализуйте итератор для объекта library
// Используйте цикл for..of для перебора книг

const books = [
	{
		title: "1984",
		author: "George Orwell"
	},
	{
		title: "Brave New World",
		author: "AH"
	},
	{
		title: "Fahrenheit 451",
		author: "RB"
	}
]

const library = {
	books: [...books],
	[Symbol.iterator] : function() {
		let index = 0;
		return { 
			next: () => {
				if (index < this.books.length){
					return {value: this.books[index++], done: false};
				} else {
					return {done: true};
				}
			}
		}
	}
}

for (const book of library) {
	console.log(book.title, book.author);
}

// Учимся конвертировать коллекции DOM элементов в массивы и работать с ними

// Напишите функцию, которая собирает вме div на странице, преобразует их в массив 
// и фильтрует те, у которых есть атрибут data-active

const arrayOfDataActive = document.querySelectorAll('div');
const array = Array.from(arrayOfDataActive);
const newArray = array.filter((el) => el.hasAttribute('data-active'))
newArray.forEach(element => {
	console.log(element);
});


// Есть группа студентовю Надо отследить, кто посетил какие занятия и кто из преподов вео какие занятия

let lessons = new Map();
lessons.set("Математика", "Смирнов");
lessons.set("История", "Иванов");

let students = new Map();
let ivan = {name: "Ivan"};
let ivanLessons = new Set();
ivanLessons.add("Математика");
ivanLessons.add("История");
students.set(ivan, ivanLessons);

let elena = {name: "Elena"};
let elenaLessons = new Set();
elenaLessons.add("Математика");
elenaLessons.add("История");
elenaLessons.add("Физика");
elenaLessons.add("Физика");
students.set(elena, elenaLessons);

console.log(`Препод по Математике: ${lessons.get("Математика")}`);
console.log(`Уроки Ивана: ${[...students.get(ivan)]}`);

console.log(`Препод по Математике: ${lessons.get("История")}`);
console.log(`Уроки Елены: ${[...students.get(elena)]}`);