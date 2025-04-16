// Favorites.tsx
import React, { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { FavoriteCard } from '../FavoriteCard'

type FavoriteItem = {
    id: number
    title: string
    description: string
    image: string
}

const initialFavorites: FavoriteItem[] = [
    {
        id: 1,
        title: 'Classic Chronograph',
        description: 'Elegant stainless steel chronograph with leather strap',
        image:
            'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 2,
        title: 'Smart Watch Pro',
        description: 'Advanced fitness tracking with OLED display',
        image:
            'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 3,
        title: 'Dive Master 500',
        description: 'Professional diving watch with 500m water resistance',
        image:
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 4,
        title: 'Vintage Automatic',
        description: 'Mechanical automatic movement with vintage design',
        image:
            'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 5,
        title: 'Minimalist Series',
        description: 'Ultra-thin case with simple dial design',
        image:
            'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
]

const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>(initialFavorites)

    const handleRemove = (id: number) => {
        setFavorites((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <div className="w-full mx-auto px-4 py-8 sm:px-6">
            <ScrollArea className="h-[calc(100vh-22rem)]">
                <div className="flex flex-col gap-4">
                    {favorites.map((item) => (
                        <FavoriteCard
                            key={item.id}
                            item={item}
                            onRemove={() => handleRemove(item.id)}
                        />
                    ))}
                </div>
            </ScrollArea>
            <Separator className="mt-8" />
        </div>
    )
}

export default Favorites
