const resultat = document.querySelector("#resultat");
const formulari = document.querySelector("#formulari");

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