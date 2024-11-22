type Action = {
    id: number;
    name: string;
    score: number;
    category: string;
    image: string;
};

type UserAction = {
    created_at: number;
    actions: Action[];
}