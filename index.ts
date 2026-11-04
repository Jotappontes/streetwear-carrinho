// 1. Definição do formato do Produto
interface Produto {
    id: number;
    nome: string;
    preco: number;
    tamanho: 'P' | 'M' | 'G' | 'GG';
    estoque: number;
}

// 2. Simulação do seu Banco de Dados de Streetwear
const bancoDeProdutos: Produto[] = [
    { id: 1, nome: "Moletom Oversized Cyberpunk", preco: 249.90, tamanho: "G", estoque: 5 },
    { id: 2, nome: "Camiseta Boxy Heavyweight", preco: 119.90, tamanho: "M", estoque: 10 },
    { id: 3, nome: "Calça Cargo Parachute", preco: 189.90, tamanho: "P", estoque: 2 },
];

// 3. Item que vai dentro do Carrinho
interface ItemCarrinho {
    produto: Produto;
    quantidade: number;
}

// 4. A Lógica do Carrinho
class CarrinhoDeCompras {
    private itens: ItemCarrinho[] = [];

    adicionarProduto(idProduto: number, quantidade: number): string {
        // 1. Procurar o produto no bancoDeProdutos pelo ID
        const produtoEncontrado = bancoDeProdutos.find(p => p.id === idProduto);

        if (!produtoEncontrado) {
            return "Erro: Produto não encontrado.";
        }

        // 2. Verificar se o estoque é suficiente
        if (produtoEncontrado.estoque < quantidade) {
            return `Erro: Estoque insuficiente! Apenas ${produtoEncontrado.estoque} unidades disponíveis.`;
        }

        // 3. Verificar se o produto já existe no carrinho
        const itemExistente = this.itens.find(item => item.produto.id === idProduto);

        if (itemExistente) {
            // Se já existe, verificamos se a quantidade total ultrapassa o estoque
            const novaQuantidade = itemExistente.quantidade + quantidade;
            if (produtoEncontrado.estoque < novaQuantidade) {
                return `Erro: Quantidade total excede o estoque disponível (${produtoEncontrado.estoque}).`;
            }
            itemExistente.quantidade = novaQuantidade;
        } else {
            // Se não existe, adiciona um novo item ao array
            this.itens.push({
                produto: produtoEncontrado,
                quantidade: quantidade
            });
        }

        return `Sucesso: ${quantidade}x "${produtoEncontrado.nome}" adicionado(s) ao carrinho!`;
    }

    calcularTotal(): number {
        // Usa o método .reduce() para percorrer os itens, multiplicar preço pela quantidade e somar tudo
        return this.itens.reduce((total, item) => {
            return total + (item.produto.preco * item.quantidade);
        }, 0);
    }

    exibirCarrinho() {
        console.log("=== Seu Carrinho Streetwear ===");
        this.itens.forEach(item => {
            console.log(`- ${item.quantidade}x ${item.produto.nome} (Tamanho: ${item.produto.tamanho}) - R$ ${(item.produto.preco * item.quantidade).toFixed(2)}`);
        });
        console.log(`Valor Total: R$ ${this.calcularTotal().toFixed(2)}\n`);
    }
}

// --- Testando seu código ---
const meuCarrinho = new CarrinhoDeCompras();

console.log(meuCarrinho.adicionarProduto(1, 2)); // Adiciona 2 moletons (R$ 249.90 cada)
console.log(meuCarrinho.adicionarProduto(2, 3)); // Adiciona 3 camisetas (R$ 119.90 cada)
console.log(meuCarrinho.adicionarProduto(3, 2)); // Tenta adicionar 5 calças (mas o estoque é só 2, deve dar erro)

meuCarrinho.exibirCarrinho();
