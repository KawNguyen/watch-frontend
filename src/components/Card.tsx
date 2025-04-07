interface CardProps {
    image: string;
    name: string;
    price: string;
}

const Card: React.FC<CardProps> = ({ image, name, price }) => {
    return (
        <div className="container mx-auto ">
            <div className="p-4 rounded-xl shadow-md w-[198px] md:w-72 text-center">
                <img src={image} alt={name} className="w-full h-full mb-4 rounded-lg" />
                <h3 className="font-semibold">{name}</h3>
                <p className="text-gray-600">{price}</p>
            </div>
        </div>
    );
};

export default Card;
