import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import CartCard from '../CartCard'
import { formatPrice } from '@/lib/utils'

export type CartItemType = {
    id: number
    title: string
    description: string
    image: string
    price: number
    quantity: number
}

const initialItems: CartItemType[] = [{
    id: 1,
    title: 'Classic Chronograph',
    description: 'Elegant stainless steel chronograph with leather strap',
    image:
        'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 10,
    quantity: 1,
},
{
    id: 2,
    title: 'Smart Watch Pro',
    description: 'Advanced fitness tracking with OLED display',
    image:
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 10,
    quantity: 1,
},
{
    id: 3,
    title: 'Dive Master 500',
    description: 'Professional diving watch with 500m water resistance',
    image:
        'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 10,
    quantity: 1,
},]

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItemType[]>(initialItems)

    const handleQuantityChange = (id: number, quantity: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )
    const shipping = 10.0
    const total = subtotal + shipping

    return (
        <div className="w-full mx-auto px-4 py-8 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
                        <div className="flex flex-col gap-4">
                            {cartItems.map((item) => (
                                <CartCard
                                    key={item.id}
                                    item={item}
                                    onQuantityChange={handleQuantityChange}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                <Card className="w-full lg:w-80 h-fit">
                    <CardContent className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Order Summary
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-gray-900">{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-gray-900">{formatPrice(shipping)}</span>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex justify-between text-base font-semibold">
                                <span className="text-gray-900">Total</span>
                                <span className="text-gray-900">{formatPrice(total)}</span>
                            </div>
                        </div>

                        <Button className="w-full mt-6">Checkout</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Cart
