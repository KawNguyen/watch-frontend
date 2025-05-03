// import React, { useState } from 'react';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";

// interface CustomerInfo {
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
// }

// interface Product {
//     id: number;
//     name: string;
//     price: number;
//     image?: string;
// }

// interface OrderProduct extends Product {
//     quantity: number;
// }

// const CreateOrders = () => {
//     const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
//         name: '',
//         email: '',
//         phone: '',
//         address: ''
//     });
//     const [searchQuery, setSearchQuery] = useState('');
//     const [quantity, setQuantity] = useState(1);
//     const [notes, setNotes] = useState('');
//     const [searchResults, setSearchResults] = useState<Product[]>([]);
//     const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([]);

//     const mockProducts: Product[] = [
//         { id: 1, name: "Rolex Submariner Black", price: 15000 },
//         { id: 2, name: "Rolex Daytona Steel", price: 25000 },
//         { id: 3, name: "Rolex GMT-Master II", price: 18000 },
//         { id: 4, name: "Omega Speedmaster Professional", price: 8000 },
//         { id: 5, name: "Omega Seamaster Diver", price: 7500 },
//     ];

//     const handleSearch = (query: string) => {
//         setSearchQuery(query);
//         if (query.trim() === '') {
//             setSearchResults([]);
//             return;
//         }
//         const filtered = mockProducts.filter(product =>
//             product.name.toLowerCase().includes(query.toLowerCase())
//         );
//         setSearchResults(filtered);
//     };

//     const addProduct = (product: Product) => {
//         setSelectedProducts(prev => {
//             const existing = prev.find(p => p.id === product.id);
//             if (existing) {
//                 return prev.map(p =>
//                     p.id === product.id
//                         ? { ...p, quantity: p.quantity + quantity }
//                         : p
//                 );
//             }
//             return [...prev, { ...product, quantity }];
//         });
//         setQuantity(1);
//         setSearchQuery('');
//         setSearchResults([]);
//     };

//     const calculateSubtotal = () => {
//         return selectedProducts.reduce((total, product) => {
//             return total + (product.price * product.quantity);
//         }, 0);
//     };

//     return (
//         <div className="p-6 mx-auto">
//             <Card>
//                 <CardContent>
//                     <form className="space-y-6">
//                         <div className="grid grid-cols-2 gap-6 mt-6">
//                             {/* Left Side - Customer Information */}
//                             <div className="space-y-4">
//                                 <h3 className="font-semibold">Customer Information</h3>
//                                 <div className="space-y-4">
//                                     <div className="space-y-2">
//                                         <label className="text-sm font-medium">Customer Name</label>
//                                         <Input
//                                             value={customerInfo.name}
//                                             onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
//                                             placeholder="Enter customer name"
//                                         />
//                                     </div>
//                                     <div className="space-y-2">
//                                         <label className="text-sm font-medium">Email</label>
//                                         <Input
//                                             type="email"
//                                             value={customerInfo.email}
//                                             onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
//                                             placeholder="Enter email"
//                                         />
//                                     </div>
//                                     <div className="space-y-2">
//                                         <label className="text-sm font-medium">Phone</label>
//                                         <Input
//                                             value={customerInfo.phone}
//                                             onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
//                                             placeholder="Enter phone number"
//                                         />
//                                     </div>
//                                     <div className="space-y-2">
//                                         <label className="text-sm font-medium">Address</label>
//                                         <Textarea
//                                             value={customerInfo.address}
//                                             onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
//                                             placeholder="Enter address"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className=" ">
//                                 <div className="flex justify-between items-center my-4">
//                                     <h3>Order Summary</h3>
//                                     <div className="text-right space-y-1">
//                                         <p className="text-sm text-gray-600">Subtotal: ${calculateSubtotal().toLocaleString()}</p>
//                                         <p className="text-sm text-gray-600">Tax (10%): ${(calculateSubtotal() * 0.1).toLocaleString()}</p>
//                                         <p className="font-semibold">Total: ${(calculateSubtotal() * 1.1).toLocaleString()}</p>
//                                     </div>
//                                 </div>
//                                 <div className="space-y-2">
//                                     <label className="text-sm font-medium">Order Notes</label>
//                                     <Textarea
//                                         value={notes}
//                                         onChange={(e) => setNotes(e.target.value)}
//                                         placeholder="Take notes (optional)"
//                                         rows={2}
//                                         className='h-[248px]'
//                                     />
//                                 </div>

//                             </div>
//                             {/* Right Side - Product Selection */}

//                         </div>
//                         <div className="space-y-4 ">
//                             <h3 className="font-semibold">Product Selection</h3>
//                             <div className="space-y-4">
//                                 <div className="space-y-2 relative">
//                                     <label className="text-sm font-medium">Search Products</label>
//                                     <Input
//                                         type="search"
//                                         placeholder="Search products..."
//                                         value={searchQuery}
//                                         onChange={(e) => handleSearch(e.target.value)}
//                                     />
//                                     {searchResults.length > 0 && (
//                                         <div className="absolute w-full bg-white border rounded-md shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
//                                             {searchResults.map(product => (
//                                                 <div
//                                                     key={product.id}
//                                                     className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
//                                                     onClick={() => addProduct(product)}
//                                                 >
//                                                     <span>{product.name}</span>
//                                                     <span className="font-semibold">${product.price.toLocaleString()}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className="space-y-2">
//                                     <label className="text-sm font-medium">Quantity</label>
//                                     <Input
//                                         type="number"
//                                         min="1"
//                                         value={quantity}
//                                         onChange={(e) => setQuantity(Number(e.target.value))}
//                                     />
//                                 </div>
//                                 <div className="border rounded-lg p-4 min-h-[200px]">
//                                     {selectedProducts.length === 0 ? (
//                                         <p className="text-gray-500 text-center">Selected products will appear here</p>
//                                     ) : (
//                                         <ul className="space-y-2">
//                                             {selectedProducts.map((product) => (
//                                                 <li key={product.id} className="flex justify-between">
//                                                     <span>{product.name} x {product.quantity}</span>
//                                                     <span>${(product.price * product.quantity).toLocaleString()}</span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                         <Button type="submit" className="w-full mt-4">
//                             Create Order
//                         </Button>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };
// export default CreateOrders;
const CreateOrders = () => {
  return <div>Coming soon</div>;
};

export default CreateOrders;
