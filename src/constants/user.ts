

export const cartData: CartItemType[] = [
    {
        id: 1,
        title: "Rolex Submariner",
        description: "Luxury diving watch with classic design",
        image: "/Images/products/rolex-submariner.jpg",
        price: 12000,
        quantity: 1,
    },
    {
        id: 2,
        title: "Omega Speedmaster",
        description: "Professional chronograph space watch",
        image: "/Images/products/omega-speedmaster.jpg",
        price: 6500,
        quantity: 1,
    },
    {
        id: 3,
        title: "TAG Heuer Carrera",
        description: "Elegant automatic chronograph",
        image: "/Images/products/tag-carrera.jpg",
        price: 4800,
        quantity: 1,
    },
];

export const favoritesData: FavoriteItemType[] = [
    {
        id: 1,
        title: "Patek Philippe Nautilus",
        description: "Iconic luxury sports watch",
        image: "/Images/products/patek-nautilus.jpg",
    },
    {
        id: 2,
        title: "Audemars Piguet Royal Oak",
        description: "Prestigious octagonal design watch",
        image: "/Images/products/ap-royal-oak.jpg",
    },
    {
        id: 3,
        title: "Cartier Santos",
        description: "Classic square case luxury watch",
        image: "/Images/products/cartier-santos.jpg",
    },
];

export const ordersData: OrderType[] = [
    {
        id: "ORD-2023-001",
        date: "November 15, 2023",
        status: "delivered",
        products: [
            {
                id: "PROD-001",
                name: "IWC Portugieser",
                price: 7500,
                image: "/Images/products/iwc-portugieser.jpg",
                quantity: 1,
            },
            {
                id: "PROD-002",
                name: "Panerai Luminor",
                price: 8200,
                image: "/Images/products/panerai-luminor.jpg",
                quantity: 1,
            },
        ],
    },
    {
        id: "ORD-2023-002",
        date: "November 10, 2023",
        status: "shipped",
        products: [
            {
                id: "PROD-003",
                name: "Jaeger-LeCoultre Reverso",
                price: 9500,
                image: "/Images/products/jlc-reverso.jpg",
                quantity: 1,
            },
        ],
    },
    {
        id: "ORD-2023-003",
        date: "November 5, 2023",
        status: "processing",
        products: [
            {
                id: "PROD-004",
                name: "Vacheron Constantin Overseas",
                price: 21000,
                image: "/Images/products/vc-overseas.jpg",
                quantity: 1,
            },
        ],
    },
];