/*
Make a request to the Numbers API (http://numbersapi.com/)
to get a fact about your favorite number.
(Make sure you get back JSON by including the json query key,
specific to this API. Details.
*/

const resp = axios
  .get("http://numbersapi.com/42?json")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

/*
Figure out how to get data on multiple numbers in a single request.
Make that request and when you get the data back,
put all of the number facts on the page.
*/

const numbersArray = [];

for (let i = 0; i < 4; i++) {
  numbersArray.push(axios.get(`http://numbersapi.com/${i}?json`));
}

Promise.all(numbersArray)
  .then((numArr) => {
    numArr.forEach((res) => {
      const fax = res.data.text;
      $("#num-facts").append(
        `<li class="font-bold text-2xl p-6 w-96">${fax}</li>`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

/*
Use the API to get 4 facts on your favorite number.
Once you have them all, put them on the page.
It’s okay if some of the facts are repeats.
*/

const requests = [];

for (let i = 0; i < 4; i++) {
  requests.push(axios.get(`http://numbersapi.com/4?json`));
}

Promise.all(requests)
  .then((responses) => {
    responses.forEach((response) => {
      const fax = response.data.text;
      $("#fav-num-facts").append(
        `<li class="font-bold text-xl p-6 w-96">${fax}</li>`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
