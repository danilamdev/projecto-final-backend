export default function register(credentials){
   return fetch('/api/auth/register', {
      method:'POST',
      headers: {
         'content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
   })

}

