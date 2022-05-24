window.onload = function () {
    let contador = {
        tamanho: 0,
        num: 0,
        conteudoLista: [],
    };

    inputBotao();
    apagaTudo();
    removeFinalizados();
    ItensSalvos();

    function inputBotao() {
        let pegarInput = document.querySelector('#inputBotao');
        let input = document.createElement('input');
        input.id = 'texto-tarefa';
        input.type = 'text';
        pegarInput.appendChild(input)

        let pegarBotao = document.querySelector('#inputBotao');
        let botao = document.createElement('button');
        botao.id = 'criar-tarefa';
        botao.innerHTML = 'Adicionar';
        pegarBotao.appendChild(botao);

        let testLista = lista();

        botao.addEventListener('click', function (event) {
            let storage = sessionStorage;
            let cont2 = sessionStorage.getItem('num');
            if (cont2 === null) {
                cont2 = 0;
            }
            cont2 = parseInt(cont2);
            cont2 += 1;
            sessionStorage.setItem('num', cont2);
            if (input.value != '') {
                let elementoLista = document.createElement('li');
                elementoLista.id = 'lista';
                elementoLista.innerHTML = input.value;
                testLista.appendChild(elementoLista);
                elementoLista.style.backgroundColor = 'white';
                input.value = '';

            }
            let pegarItem = document.getElementById('tarefas');
            let filho = pegarItem.lastChild;
            let filhoDoFilho = filho.lastChild;
            console.log(filhoDoFilho)

            filhoDoFilho.addEventListener('click', function () {


                filhoDoFilho.style.backgroundColor = 'rgb(128, 128, 128)';
                let pegarLista = document.querySelectorAll('li');



                for (let test = 0; test < pegarLista.length; test += 1) {

                    if (pegarLista[test].style.backgroundColor === 'rgb(128, 128, 128)' && pegarLista[test] != filhoDoFilho) {
                        pegarLista[test].style.backgroundColor = 'white';
                    }


                }


            })
            filhoDoFilho.addEventListener('dblclick', function () {
                let storage = sessionStorage;
                let cont = sessionStorage.getItem('tamanho');
                if (cont === null || cont === 'NaN') {
                    cont = 1;
                }
                cont = parseInt(cont);
                console.log(cont)

                if (filhoDoFilho.classList != 'completed') {
                    filhoDoFilho.classList.add('completed');
                    filhoDoFilho.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
                }
                else {
                    filhoDoFilho.classList.remove('completed');
                    filhoDoFilho.style.textDecoration = '';
                }
                cont += 1;
                sessionStorage.setItem('tamanho', cont);
            })
            console.log(filhoDoFilho)
            SalvaLista(filhoDoFilho)
        })
    }

    function lista() {
        let pegarPosiçao = document.querySelector("#tarefas");
        let tarefas = document.createElement('ol');
        tarefas.id = 'lista-tarefas';
        pegarPosiçao.appendChild(tarefas);
        return tarefas;
    }

    function apagaTudo() {

        let pegarBotao = document.querySelector('#inputBotao');
        let botao = document.createElement('button');
        botao.id = 'apaga-tudo';
        botao.innerHTML = 'Apagar Tudo';


        pegarBotao.appendChild(botao);

        botao.addEventListener('click', function () {
            let pegarItem = document.querySelectorAll('#lista');
            let storage = sessionStorage;
            let cont = sessionStorage.getItem('num');
            if (cont === null) {
                cont = 0;
            }

            for (let cont2 = 0; cont2 < pegarItem.length; cont2 += 1) {
                pegarItem[cont2].remove()
            }
        })
    }


    function removeFinalizados() {
        let pegarBotao = document.querySelector('#inputBotao');
        let botao = document.createElement('button');
        botao.id = 'remover-finalizados';
        botao.innerHTML = 'Remover Finalizados';

        pegarBotao.appendChild(botao);


        botao.addEventListener('click', function (event) {
            let storage = sessionStorage;
            let cont = sessionStorage.getItem('tamanho');
            if (cont === null) {
                cont = 0;
            }
            console.log(cont)
            let pegarItem = document.querySelectorAll('.completed');

            for (let cont2 = 0; cont2 < pegarItem.length; cont2 += 1) {
                pegarItem[cont2].remove()
            }

        })
    }

    botaoSalvar();

    function botaoSalvar() {

        let pegarBotao = document.querySelector('#inputBotao');
        let botao = document.createElement('button');
        botao.id = 'salvar-tarefas';
        botao.innerHTML = 'Salvar Tarefas';


        pegarBotao.appendChild(botao);
    }

    function SalvaLista(item) {
        botao = document.querySelector('#salvar-tarefas');
        botao.addEventListener('click', function () {
            let pegarItem = document.querySelectorAll('#lista');
            let storage = localStorage;
            for(let cont = 0; cont<5; cont+=1){ // teste mudar o numero 5
            localStorage.setItem('conteudoLista', JSON.stringify(item));
            console.log(localStorage.getItem('conteudoLista'));
            }
        })
    }
   
    function ItensSalvos() {
        let storage = localStorage;
        let itensLista = JSON.parse(localStorage.getItem('conteudoLista'));
        console.log(itensLista);
        if(itensLista != '[object HTMLLIElement]'){
        let testLista = document.querySelector('#lista-tarefas');
        if (itensLista != null) {
            console.log('teste')
            for (let cont = 0; cont < 5; cont += 1) { //teste mudar numero
                let elementoLista = document.createElement('li');                
                elementoLista.id = 'lista';
                elementoLista.innerHTML = itensLista;
                itensLista.push(elementoLista);
                localStorage.setItem('conteudoLista', JSON.stringify(itensLista));
                testLista.appendChild(elementoLista);
                elementoLista.style.backgroundColor = 'white';
                console.log(itensLista); 
        }
    }
    }
}
}

