#Multi Level Circle Chart - beta
Crie questionarios circulares com respostas numéricas dinâmicamente.
###Portabilidade
Deixei as dependências livres dentro do repositório para fácil manejo para quem não utiliza `Bower` 
##Iniciando
```
$ git clone git@github.com:ifalldev/d3-chart.git
$ bower i
```
###Dependências
Jquery, D3

##Exemplo de uso
```
const a = new MultiLevelCircleChart('.circle-chart', ['naruto sasuke\nitachi konohamaru', 'vida morte\nsuicidio homicidio', 'cerveja cevada\ncachaca agua', 'arroz feijao\nfrango macarrao', 'claro escuro\nluz ausencia', 'teste outro\nateh bom'], 5)
      .create()
      .promiseWhenDone(callback);
      
const callback = () => {
      const uri = a.svgUri;
      const image = new Image();

      image.src = uri;
      
      document.body.appendChild(image);
      alert('finalizado!');
    };
```
##Documentação
###Construtor
new MultiLevelCircleChart(nó pai, array com títulos das perguntas, quantidade de níveis para cada pergunta)

*obs.: para quebrar linhas nos títulos insira um `\n`. ex.:['teste\nteste']*
###Métodos
* **create()** - imprime o questionário.
* **promiseWhenDone()** - aloca um callback para quando todas as perguntas forem respondidas.
* **isDone()** - retorna o status do questionário (verdadeiro caso todas as perguntas estiverem respondidas).

###Atributos
* **score** - retorna um array com objetos referêntes as perguntas e suas respostas. ex.: *{id: identificador númerico para a pergunta, value: resposta escolhida}*
* **svgUri** - retorna a `URI` construída a partir do svg do questionário após este ser inteiramente respondido.

##Limitações
* Os títulos devem conter o **mesmo números de linhas**.
* Melhores resultados para questionários com no *máximo 5 níveis de respostas*.

##Autor
* **Caio Batista** - twitter: @caiorbat

##Observações
Dentro da lib existem métodos e atributos que não estão listados aqui por ainda estarem em desenvolvimento.
