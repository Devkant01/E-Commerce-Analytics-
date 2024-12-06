let month = 'January';
const search = "de";
const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;
const regex = new RegExp(search, 'i'); // case-insensitive search
const query = {
    a: 2,
    b: 3
}
query.a += 1;
console.log(query["a"]);    ;
