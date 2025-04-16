import React from 'react'
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CartItemType } from './User/Cart.tsx'

export type Props = {
    item: CartItemType
    onQuantityChange: (id: number, quantity: number) => void
}

const CartCard: React.FC<Props> = ({ item, onQuantityChange }) => {
    const handleIncrease = () => onQuantityChange(item.id, item.quantity + 1)
    const handleDecrease = () => {
        if (item.quantity > 1) {
            onQuantityChange(item.id, item.quantity - 1)
        }
    }

    return (
        <Card className="flex flex-col sm:flex-row overflow-hidden">
            <div className="relative w-full h-48 sm:h-auto sm:w-40 flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-l-xl sm:rounded-l-xl sm:rounded-r-none"
                />
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={handleDecrease}>
                            <MinusIcon className="w-4 h-4 text-gray-600" />
                        </Button>
                        <span className="text-gray-900 font-medium">{item.quantity}</span>
                        <Button variant="ghost" size="icon" onClick={handleIncrease}>
                            <PlusIcon className="w-4 h-4 text-gray-600" />
                        </Button>
                        <span className="text-xl font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                    <Button variant="ghost" className="text-red-500 hover:text-red-600 px-2 py-1">
                        <TrashIcon className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Card>

    )
}


export default CartCard
