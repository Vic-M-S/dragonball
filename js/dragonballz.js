const xhttp = new XMLHttpRequest();
const url =
    `https://dragonball-api.com/api/characters?limit=100`;
xhttp.open("GET", url);
xhttp.responseType = 'json';
xhttp.send();
console.log(xhttp.response);
xhttp.onload = function () {
    const dados = xhttp.response;
    const personagens = dados.items;
    console.log(personagens.length);
    const total = personagens.length;
    let cards = '';
    for (let i = 0; i < total; i++) {
        const id = personagens[i].id;
        const nome = personagens[i].name;
        const imagem = personagens[i].image;
        cards += `<div class="card-db bg-white shadow rounded-4 position-relative d-flex flex-column">`;
        cards += `<img src="${imagem}" class="escala position-absolute w-100 img-db">`;
        cards += `<p class="favorito p-3 text-end"><i id="favorito${id}" onclick="favoritar(${id});" class="fa-regular fa-star text-warning" type="button"></i></p>`;
        cards += `<p class="mt-auto text-center texto-db">${nome}</p>`;
        cards += `</div>`;
    }
    document.getElementById("personagens").innerHTML = cards;
    if (localStorage.getItem("usar-cookie") === "false"){
        for (let i = 0; i < total; i++) {
            const id = personagens[i].id;
            document.getElementById(`favorito${id}`).classList.add("d-none");
    }
    }
    // Favoritar os cards escolhidos
    console.log(document.cookie);
    cookies = document.cookie.split(";");
    console.log(cookies);
    for (let c = 0; c < cookies.length; c++) {
        const favorito = cookies[c].split("=");
        console.log(favorito);
        console.log(favorito[1]);
        
        if (favorito[1]) {favoritar(favorito[1]);}
    }

};


function favoritar(codigo) {

    const fav = document.getElementById(`favorito${codigo}`)
    if (fav.classList.contains("fa-regular")) {
        fav.classList.remove("text-warning", "fa-regular");
        fav.classList.add("text-danger", "fa-solid");
        let now = new Date();
        let time = now.getTime();
        let expireTime = time + (1000 * 60 * 60 * 24 * 365);
        now.setTime(expireTime)
        document.cookie =
            `favorito${codigo}=${codigo}; expires=${now.toUTCString()};`;
    }
    else {
        fav.classList.add("text-warning", "fa-regular");
        fav.classList.remove("text-danger", "fa-solid");
        document.cookie = `favorito${codigo}=${codigo}; expires=Thu, 01-Jan-1970 00:00:01 GMT;`;
    }

}

