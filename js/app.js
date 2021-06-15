const resultat = document.querySelector("#resultat");
const formulari = document.querySelector("#formulari");
const paginacio = document.querySelector("#paginacio");
const registresPerPagina = 50;
//Variable amb el total de pagines
//Es calcularà cada cop que fem una petició a l'API
let totalPagines = 0;
//Es un generator de javascript
let iterador;

window.onload = ()=>{
    formulari.addEventListener('submit',validarForm);
}

function validarForm(e){
    e.preventDefault();

    const termeSearch = document.querySelector('#terme').value;

    //Comprovem que hi ha algun terme per cercar
    if(termeSearch===''){
        mostrarAlerta("Agrega un terme de cerca");
        //Fi funció
        return;
    }

    //Si no està buit fem la consulta 
    buscarImatge(termeSearch);
}

function mostrarAlerta(missatge){

    //Check si existeix ja una alerta
    const existeixAlerta = document.querySelector('.bg-red-100');

    if(!existeixAlerta){
        const alerta = document.createElement('p');
        //Afegic classes CSS tailwind per donar estil alerta
        alerta.classList.add('bg-red-100','border-red-700','text-red-700', 'px-4', 'py-3', 
        'rounded', 'max-w-lg', 'mx-auto', 'mt-6','text-center');
        //Posem el text a l'alerta
        alerta.innerHTML = `
            <strong class='bold'>ERROR</strong>
            <span class="block sm:inline">${missatge}</span>
        `;
    
        //Afegim l'alerta al final del formulari
        formulari.appendChild(alerta);
    
        //Fem que passat 5s desapareixi
        setTimeout(()=>{
            formulari.removeChild(alerta);
        },5000);
    }
    
}

function buscarImatge(terme){
    const key='7058939-4555f72e178817d994d21d7d5';
    const url = `https://pixabay.com/api/?key=${key}&q=${terme}&per_page=${registresPerPagina}`;

    fetch(url)
    .then((resultat)=>{
        //Agafem el resultats que retorna i indiquem que els converteixi a JSON
        return resultat.json();
    })
    .then((resultatJSON) => {
        //Ens calcularà el total de pàgines que tenim
        totalPagines = calcularPagines(resultatJSON.totalHits);
        //Recuperem els resultats convertits JSON i treballem amb ells en aquest cas els enviem a una funció per mostrar les imatges
        mostrarImatge(resultatJSON.hits);
    })
}

function calcularPagines(total){
    //Agafem el falor de la divisió del total de pàgines que tenim entre el número d'elemements a mostrar per pagina
    //Fem u Math.ceul perquè arrodoneixi cap amunt
    //Convertim el resultat en Int.
    return parseInt(Math.ceil(total/registresPerPagina));
}

//Generador que registrarà la quantitat d'elements acord les pàgines
function *crearPaginador(total){

    for(let i=1; i<=total; i++){

        yield(i);
    }
}

function mostrarImatge(resultats){
    //Buidem la llista de resultats que esten nmostrant en cas de que hi hagi algun
    while(resultat.firstChild){
        resultat.removeChild(resultat.firstChild);
    }

    //Iterem per cada imatge que hi ha dins de hits del resultat
    resultats.forEach((imatge) =>{
        //Restructuring per obtenir només l'atribut previewURL
        const {previewURL, likes, views, largeImageURL} = imatge;
        resultat.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
            <div class="bg-white ">
                <img class="w-full" src=${previewURL} alt={tags} />
                <div class="p-4">
                    <p class="card-text">${likes} Me Gusta</p>
                    <p class="card-text">${views} Vistas </p>

                    <a href=${largeImageURL} 
                    rel="noopener noreferrer" 
                    target="_blank" class="bg-blue-800 w-full p-1 block mt-5 rounded text-center font-bold uppercase hover:bg-blue-500 text-white">Ver Imagen</a>
                </div>
            </div>
        </div>
        `;

    });

    //Netejar el paginador previ
    while(paginacio.firstChild){
        paginacio.removeChild(paginacio.firstChild);
    }
    //Generem el paginador nou
    imprimirPaginador();

}

function imprimirPaginador(){
    //Es un generator de javascript
    iterador = crearPaginador(totalPagines);
    //Aquest iterador tindrà tants elements com pàgines necessitem
    //Podem accedir a fer coses a cada pàgina amb la funció .next();
    while(true){
        const { value, done } = iterador.next();

        if(done){
            return;
        }

        //Si no has arribat al final
        //Genera un boto al paginador
        const boto = document.createElement('a');

        boto.href="#";
        boto.dataset.pagina = value;
        boto.textContent = value;

        boto.classList.add('siguiente','bg-yellow-400','px-4','py-1','mr-2','font-bold','mb-2','uppercase','rounded');
        paginacio.appendChild(boto);

    }
}