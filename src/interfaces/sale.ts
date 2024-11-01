interface ProductInSale {
  _id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Sale {
  _id: string;             // ID único da venda
  products: ProductInSale[]; // Array de produtos na venda
  createdAt: string;           // Data da venda (em formato ISO ou string)
  // productId: string;      // ID do produto vendido
  // productName: string;    // Nome do produto vendido
  // quantity: number;       // Quantidade de itens vendidos
  // price: number;          // Preço unitário do produto
  total: number;          // Total da venda (price * quantity)
  pickupName: string;     // ID do cliente que fez a compra
  customerName: string;   // Nome do cliente (opcional, se precisar exibir)
  status?: 'paid' | 'pending';        // Status da venda (opcional, ex.: "concluído", "pendente")
  paymentMethod?: 'in_sight' | 'in_installments'; // Método de pagamento (opcional, ex.: "cartão", "pix")
}