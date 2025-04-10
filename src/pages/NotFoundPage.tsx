import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center px-4">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <div className="mt-4">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                    <p className="text-gray-600 mb-8">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg 
                                 hover:bg-gray-800 transition-colors duration-300"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;