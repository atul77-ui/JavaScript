// const doesnt change value it is like a closed box
const appname = "cinelog";
// let can change the value like a open box thar can be modified
let currentpage = "homepage";

console.log(appname);
console.log(currentpage);

currentpage = "watchlist";
console.log(currentpage);


let movieTitle = "Spiderman";
let movieYear = 2001;
let isWatched = false;
let movieRating = null;

console.log(typeof movieTitle)
console.log(typeof movieYear)
console.log(typeof isWatched)
console.log(typeof movieRating)

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



// check point 1
// let firstMovie = movies[0];
// let badgeClass = "";
// let badgeText = "";

// if (firstMovie.status === "want") {
//     badgeClass = "badge-want";
//     badgeText = "want to watch";
// } 
// else if (firstMovie.status === "watching"){
//     badgeClass = "badge-watching";
//     badgeText = "watching";
// }
// else if (firstMovie.status === "watched"){
//     badgeClass = "badge-watched";
//     badgeText = "watched";
// }
// else {
//     badgeClass = "badge-text"
//     badgeText = "unknown";
// }

// console.log(`${firstMovie.title}> badge:${badgeClass} text:${badgeText}`);

// let movieYear = movies[0].year;
// let movieGenre = movies[0].genre;

// let isAnimatedAndOld = movieGenre === "Animation" && movieYear < 2010;
// console.log(isAnimatedAndOld);

// let isScifiOrThriller = movieGenre === "Sci-fi" || movieGenre === "Thriller";
// console.log(isScifiOrThriller);

// let isNotWatched = !(firstMovie.status === "Watched");
// console.log(isNotWatched);

// let secondMovie = movies[1];
// switch (secondMovie.status){
//     case "want":
//         console.log(`${secondMovie.title}:"want to watch"`);
//         break;
//     case "watching":
//         console.log(`${secondMovie.title}:"currently watching"`);
//         break;
//     case "watched":
//         console.log(`${secondMovie.title}:"already watched"`);
//         break;
//     default: 
//     console.log(`${secondMovie.title}:"unknown"`);
// }

// let thirdMovie = movies[2];
// switch (thirdMovie) {
//     case "want":
//         console.log(`${thirdMovie.title}:"want to watch"`);
//         break;
//     case "watching":
//         console.log(`${thirdMovie.title}:"currently watching"`);
//         break;
//     case "watched":
//         console.log(`${thirdMovie.title}:"already watched"`);
//         break;
//     default:
//         console.log(`${thirdMovie.title}:"unknown"`);
// }



// check point 2
// FOR LOOP
// console.log("--for loop--");
// for (let i = 0; i < movies.length; i++) {
//     console.log(i, movies[i].title, movies[i].year);
// }


// // FOR...OF LOOP
// console.log("--for..of loop--");
// for (let movie of movies){
//     console.log(`${movie.title}, ${movie.status}`);
// }


// // LOOP + IFELSE
// console.log("--loop+ifalse--");
// for (let movie of movies){
//     let badgeClass = "";
//     let badgeText = "";

//     if(movie.status === "want"){
//         badgeClass = "badge-want";
//         badgeText = "want to watch";
//     }
//     else if(movie.status === "watching") {
//         badgeClass = "badge-watching";
//         badgeText = "watching";
//     }
//     else if(movie.status === "warched"){
//         badgeClass = "badge-watched";
//         badgeText = "already watched";
//     }
//     else {
//         badgeClass = "badge-want";
//         badgeText = "unknown";
//     }
//     console.log(`${movie.title} > class: ${badgeClass} text: ${badgeText}`)
// }

// console.log("--while loop--");
// let position = 0;
// while (position < 3) {
//     console.log(` position ${position}: ${movies[position].title}`);
//     position++;
// }


// CHECK POINT 3
// function getBadge(status) {
//     if (status === "want") {
//         return{
//             Class: "badge-want",
//             Text: "want to want"
//         };
//     }
//     else if(status === "watching") {
//         return{
//             Class: "badge-watching",
//             Text: "watching"
//         };
//     }
//     else if(status === "watched") {
//         return{
//             Class: "badge-watched",
//             Text: "already watched"
//         };
//     }
//     else {
//         return{
//             Class: "badge-want",
//             Text: "unknown"
//         };
//     }
// }

// console.log(getBadge("want"));