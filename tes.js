
//resibe info
const submitBtn = document.getElementById('my-form').addEventListener('submit');
const nameInput = document.querySelector('#name');
const fs = require('fs');


function generateRandomId() {
    const randomNum = Math.random().toString(36).substring(2, 12);
    const prefix = 'ID-';
    const randomId = prefix + randomNum;
    return randomId;
  }
  const myRandomId = generateRandomId();

//---------------------------------------hace datos json

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const id = myRandomId.value;
  
const data = fs.readFileSync('tes.json');// Cargar el archivo JSON
// Crear un nuevo objeto para el nuevo usuario
const newUser = {
    "name": "name",
    "id" : "id",
  };
  
  // Agregar el nuevo objeto al array de usuarios
data.users.push(newUser)
  // Guardar los cambios en el archivo data.json
fs.writeFileSync("tes.json", JSON.stringify(data));
//fs.writeFileSync('ejemplo.json', newData);// Guardar los cambios en el archivo JSON
});
//-----------------------------------mustra datos json
fetch("tes.json")
.then(response => response.json())
.then(data => showInfo(data));

function showInfo(data){
    console.table(data.users)
}