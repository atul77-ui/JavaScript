const movies = [
    {title: "Spirated away", year: 2001,genre: "animation", status: "want"},
    {title: "Inception", year: 2010, genre: "Sci-fi", status: "watched"},
    {title: "Fifey first dates", year: 2004, genre: "Romance", status: "Watching"},
    {title: "Spider-man", year: 2002, genre: "Action", status: "watched"},
    {title: "Sholay", year: 1975, genre: "Action, Romantic", status: "watched"},
    {title: "TENET", year: 2020, genre: "Sci-fi", status:"want"},
    {title: "A silent voice", year: 2016, genre: "Romance", status: "watched"},
];

// console.log("total movies:", movies.length);
// // should return 3
// console.log("first movie:", movies[0]);
// // return the whole object
// console.log("first movie title:", movies[0].title);
// // retur the title of the first movie
// console.log("first movie year:", movies[0].year);
// // returns the year of the first movie
// console.log("second movie status:", movies[1].status);

// let isWatched = false;
// let movieRating = null;

// console.log("waatched:", isWatched);
// // returns the boolean value of the movie status
// console.log("rating:",movieRating);
// // returns the value of movierating
// console.log("type of title:", typeof movies[0].title);
// //returns the typeof value for the movie title
// console.log("type of year:", typeof movies[0].year);
// // returns the type of data for the movie year

// const currentYear = 2026;
// let yearsAgo = currentYear - movies[0].year;

// let isOldfilm = movies[0].year < 2000;
// let isClassic = movies[0].year <= 2010;
// let isExact = movies[0].year === 2001;

// console.log(isOldfilm);
// console.log(isClassic);
// console.log(isExact);


let firstMovie = movies[0];
let badgeClass = "";
let badgeText = "";

if (firstMovie.status === "want") {
    badgeClass = "badge-want";
    badgeText = "want to watch";
} 
else if (firstMovie.status === "watching"){
    badgeClass = "badge-watching";
    badgeText = "watching";
}
else if (firstMovie.status === "watched"){
    badgeClass = "badge-watched";
    badgeText = "watched";
}
else {
    badgeClass = "badge-text"
    badgeText = "unknown";
}

console.log(`${firstMovie.title}> badge:${badgeClass} text:${badgeText}`);

let movieYear = movies[0].year;
let movieGenre = movies[0].genre;

let isAnimatedAndOld = movieGenre === "Animation" && movieYear < 2010;
console.log(isAnimatedAndOld);

let isScifiOrThriller = movieGenre === "Sci-fi" || movieGenre === "Thriller";
console.log(isScifiOrThriller);

let isNotWatched = !(firstMovie.status === "Watched");
console.log(isNotWatched);

let secondMovie = movies[1];
switch (secondMovie.status){
    case "want":
        console.log(`${secondMovie.title}:"want to watch"`);
        break;
    case "watching":
        console.log(`${secondMovie.title}:"currently watching"`);
        break;
    case "watched":
        console.log(`${secondMovie.title}:"already watched"`);
        break;
    default: 
    console.log(`${secondMovie.title}:"unknown"`);
}

let thirdMovie = movies[6];
switch (thirdMovie) {
    case "want":
        console.log(`${thirdMovie.title}:"want to watch"`);
        break;
    case "watching":
        console.log(`${thirdMovie.title}:"currently watching"`);
        break;
    case "watched":
        console.log(`${thirdMovie.title}:"already watched"`);
        break;
    default:
        console.log(`${thirdMovie.title}:"unknown"`);
}