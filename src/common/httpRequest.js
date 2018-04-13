 export const postData = (url, data) => {
   // Default options are marked with *
   return fetch(url, {
   //  body: JSON.stringify(data), // must match 'Content-Type' header
     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     credentials: 'same-origin', // include, *omit
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     method: 'POST', // *GET, PUT, DELETE, etc.
     mode: 'cors', // no-cors, *same-origin
     redirect: 'follow', // *manual, error
     referrer: 'no-referrer', // *client
   })
    .then(response => response.json()) // parses response to JSON
 }
 export const putData = (url, data) => {
  // Default options are marked with *
   return fetch(url, {
     body: JSON.stringify(data), // must match 'Content-Type' header
     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     credentials: 'same-origin', // include, *omit
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     method: 'PUT', // *GET, PUT, DELETE, etc.
     mode: 'cors', // no-cors, *same-origin
     redirect: 'follow', // *manual, error
     referrer: 'no-referrer', // *client
   })
   .then(response => response.json()) // parses response to JSON
 }



