function randomNum (cant){
   let numeros = {}
   
   for (let i = 1; i < cant; i++){
   const random = Math.floor((Math.random() * 1000 + 1 ))
   numeros[random] ??= 0
   numeros[random] += 1
    }
   return numeros
 }

 process.on('message', (cant) =>{
    console.log('process on', cant)
    const resultado = randomNum(cant)
    
    process.send({a:1})
 })
 