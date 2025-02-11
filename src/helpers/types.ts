interface Article {
    nom: string;
    quantite: number;
    prix: number
}

interface SaleState {
    id?: string;
    user?: string;
    date: string;
    articles: Article[];
    total: number
}

export type {
    Article,
    SaleState
}