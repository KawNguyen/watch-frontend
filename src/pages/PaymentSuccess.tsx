import { CheckCircle, ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"

export default function PaymentSuccessPage() {
  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center py-10 px-4 bg-gradient-to-b from-gray-50/50">
      <Card className="w-full max-w-lg p-8 shadow-xl border-gray-100">
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-gray-100 p-6 mb-6 shadow-inner">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
            Payment Successful!
          </h1>

          <p className="text-lg text-muted-foreground mt-6 mb-10 leading-relaxed">
            Thank you for your purchase!
            <br />
            We've sent a confirmation email to your address.
            <br />
            We truly appreciate your trust in our products.
          </p>
          
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 w-full">
            <Button 
              asChild 
              size="lg" 
              className="bg-gray-900 hover:bg-gray-800 shadow-md"
            >
              <Link to="/profile?tab=orders" className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                View My Orders
              </Link>
            </Button>
            <Button 
              variant="outline" 
              asChild 
              size="lg" 
              className="border-gray-200 hover:bg-gray-50 shadow-sm"
            >
              <Link to="/" className="flex items-center">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </main>
  )
}
