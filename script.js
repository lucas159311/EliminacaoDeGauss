function GeraMatriz(indice){
    let local = document.getElementById('Matriz');
    LimparMatriz();
    let matriz = "";
    for(var i = 1; i <= indice; i++){
        for(var j = 1; j <= indice; j++){
            if(j == indice){
                matriz += '<input type="number" id="'+i+'x'+j+'">';
            }else{
                matriz += '<input type="number" id="'+i+'x'+j+'"> +';
            }
        }
        matriz += '‎ ‎ ‎ = <input type="number" id="'+i+'x'+j+'">';
        matriz += '<br>';
    }
    matriz += '<p align="center"><input type="button" class="btn btn-danger" value="Limpar" onclick="LimparMatriz()"> <input type="button" class="btn btn-success" value="Calcular" onclick="CriaMatrizParaCalculo('+indice+')"></p>';
    local.innerHTML = matriz;
}

function LimparMatriz(){
    document.getElementById('Matriz').innerHTML = "";
}

function CriaMatrizParaCalculo(indice){
    //alert("O valor do indice é de: "+indice);
    //devo pegar todos os dados da matriz e transformar em uma array para enviar a função calculagauss ex: matriz = [[2,4,5],[4,3,10]];
    const linhas = indice;
    const colunas = indice + 1;
    const resultadoFinal = Array();
    //percorre todos os inputs e armazena em um array
    for(let i=1; i<=linhas; i++){
      const resultado = Array();
      for(let j=1; j<=colunas; j++){
        try {
          resultado.push(document.getElementById(i+"x"+j).value);
          //fica faltando conseguir armazenar os valores em uma matriz
        } catch (error) {
          console.log(error);
          break;
        }
      }
      resultadoFinal.push(resultado);
    }
    CalculaGauss(resultadoFinal);
}

function CalculaGauss(matriz) {
    const linhas = matriz.length;
    const colunas = matriz[0].length;

    //eliminação de gauss
    for(let i=0; i<linhas; i++){
      let maximoLinhasIndex = i; //encontra a linha com o maior valor absoluto na coluna atual
      for(let j=(i+1); j<linhas; j++){
        if(Math.abs(matriz[j][i]) > Math.abs(matriz[maximoLinhasIndex][i])){
          maximoLinhasIndex = j;
        }
      }

      //troca as linhas se for preciso
      if(maximoLinhasIndex !== i){
        [matriz[i], matriz[maximoLinhasIndex]] = [matriz[maximoLinhasIndex],matriz[i]];
      }

      //eliminação de gauss na coluna atual
      for(let j=(i+1); j<linhas; j++){
        const elemento = matriz[j][i] / matriz[i][i];
        for(let k=i; k<colunas; k++){
          matriz[j][k] -= (elemento * matriz[i][k]);
        }
      }
    }

    //solucionando o sistema de equações
    const result = new Array(linhas).fill(0);
    for(let i=(linhas-1); i>=0; i--){
      let soma = 0;
      for(let j=(i+1); j<(colunas - 1); j++){
        soma += matriz[i][j] * result[j];
      }
      result[i] = ((matriz[i][colunas-1] - soma) / matriz[i][i]);
    }
    console.log(result);
    ExibeResultado(result);
}

function ExibeResultado(resultado){
  console.log(resultado);
  for(var i=0; i < resultado.length; i++){
      if(typeof resultado[i] === "number"){
          document.getElementById('Matriz').innerHTML += resultado[i];
          document.getElementById('Matriz').innerHTML += "<br>";
      }else{
           document.getElementById('Matriz').innerHTML += "o indice "+i+" não tem solução!";
           document.getElementById('Matriz').innerHTML += "<br>";   
      }
  }
}
