//operazioni CRUD
//CREATE - READ - UPDATE - DELETE

//recupero endpoiint dal json-server(che espone)
const API_URL = 'http://localhost:3000/todos';

//seleziona il campo input per l inserimento di nuovi task
const newTaskInput = document.getElementById('new-task');

//seleziona il pulsante per aggiungere un nuovo task
const addTaskBtn = document.getElementById('add-task');

//seleziona l elemento <ul> dove andranno inseriti i nuovi task
const taskList = document.getElementById('task-list');

//FUNZIONE READ - recupera tutti i task della api e li mostra
function fetchTasks() {

    fetch(API_URL)// Invia una richiesta GET all endpoint API

        .then(res => res.json()) //converte la risposta i formato JSON
        .then(data => {  // una volta ottenuti i dati...

            taskList.innerHTML = ''; // bona pratica per svuotare il container che verrà popolato con i dati

            data.forEach(task => { // per ogni task ricevuto...

                const li = document.createElement('li'); //creo un nuovo elemento <li>
                const span = document.createElement('span') // creo uno span per il Titolo
                span.textContent = task.title; // imposto il testo del task

                //creo il pulsante per modificare il titolo
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.onclick = () => editTask(task); // collego la funzione di modifica al editBtn

                //creo il pulsante per eliminare il task
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => deleteTask(task.id); // collego la funzione di delete al btn

                //raggruppo i bottoni in un div
                const btnGroup = document.createElement('div');
                btnGroup.append(editBtn, deleteBtn);

                //aggiungo il titolo e i bottoni al <li>, poi alla lista
                li.append(span, btnGroup);
                taskList.appendChild(li);
            })
            console.log(data);
        })
}

//FUNZIONE CREATE
//prendo il button e associo un evento click 
addTaskBtn.addEventListener('click', function(){

    const title = newTaskInput.value.trim(); // prendo il valore in input e rimuvo gli spazi

    if(title){   // se il titolo è stato inserito

        fetch(API_URL, {

            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title}) // crea il task

        }).then(() => {

            newTaskInput.value = ''; //svuoto il campo input
            fetchTasks(); // richiamo la funzione per ricaricare i task e quindi vedere il nuovo task inserito
        });
    }
});

//FUNZIONE UPDATE
function editTask(task){

    const nuovoTitolo = prompt('Modifica il task:', task.title); //chiedo il nuovo titolo

    if(nuovoTitolo !== null && nuovoTitolo.trim() !== '') { //Se ho effettivamente un nuovo titolo

        fetch(`${API_URL}/${task.id}`,{

            method : 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...task, title: nuovoTitolo.trim()}) // prendo l oggetto task e invio il nuovo titolo

        }).then(fetchTasks); // ricarico i task
    } 
}

//FUNZIONE DELETE
function deleteTask(id){ //elimino un task in abse all ID

    fetch(`${API_URL}/${id}`,{

            method : 'DELETE' //Metodo DELETE per rimuovere
          
        }).then(fetchTasks); // ricarico i task
}

fetchTasks();

