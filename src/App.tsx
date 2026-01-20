import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import TripTracking from './components/TripTracking';
import DriverRoutes from './components/DriverRoutes';
import RouteDetail from './components/RouteDetail';
import TripHistory from './components/TripHistory';

export type Driver = {
  id: string;
  name: string;
  rating: number;
  vehicle: string;
  price: number;
  estimatedTime: number;
  image: string;
  route: string;
  verified: boolean;
  institution: string;
  punctualityScore: number;
  reviewsCount: number;
};

export type PickupPoint = {
  id: string;
  address: string;
  passengers: number;
  passengerNames: string[];
  passengerPrices: number[];
  position: [number, number];
  time: string;
};

export type DriverRoute = {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  totalPassengers: number;
  estimatedDuration: string;
  price: number;
  pickupPoints: PickupPoint[];
  status: 'active' | 'completed' | 'scheduled';
  routePath?: [number, number][];
};

export type TripHistoryItem = {
  id: string;
  date: string;
  route: string;
  driver: string;
  price: number;
  status: 'completed' | 'cancelled';
  rating?: number;
  review?: string;
};

type UserType = 'user' | 'driver' | null;
type ViewType = 'register' | 'login' | 'home' | 'tracking' | 'driverRoutes' | 'routeDetail' | 'history';

export default function App() {
  const [userType, setUserType] = useState<UserType>(null);
  const [currentView, setCurrentView] = useState<ViewType>('register');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<DriverRoute | null>(null);
  const [destination, setDestination] = useState<string>('');

  const handleRegisterComplete = () => {
    setCurrentView('login');
  };

  const handleLogin = (type: 'user' | 'driver') => {
    setUserType(type);
    if (type === 'user') {
      setCurrentView('home');
    } else {
      setCurrentView('driverRoutes');
    }
  };

  const handleSelectDriver = (driver: Driver, dest: string) => {
    setSelectedDriver(driver);
    setDestination(dest);
    setCurrentView('tracking');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedDriver(null);
    setDestination('');
  };

  const handleSelectRoute = (route: DriverRoute) => {
    setSelectedRoute(route);
    setCurrentView('routeDetail');
  };

  const handleBackToRoutes = () => {
    setCurrentView('driverRoutes');
    setSelectedRoute(null);
  };

  const handleViewHistory = () => {
    setCurrentView('history');
  };

  const handleBackFromHistory = () => {
    if (userType === 'user') {
      setCurrentView('home');
    } else {
      setCurrentView('driverRoutes');
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentView('register');
    setSelectedDriver(null);
    setSelectedRoute(null);
    setDestination('');
  };

  return (
    <div className="h-screen w-full bg-gray-50">
      {currentView === 'register' && (
        <Register onComplete={handleRegisterComplete} />
      )}
      {currentView === 'login' && (
        <Login onLogin={handleLogin} />
      )}
      {currentView === 'home' && (
        <Home onSelectDriver={handleSelectDriver} onViewHistory={handleViewHistory} />
      )}
      {currentView === 'tracking' && selectedDriver && (
        <TripTracking 
          driver={selectedDriver} 
          destination={destination}
          onBack={handleBackToHome}
        />
      )}
      {currentView === 'driverRoutes' && (
        <DriverRoutes 
          onSelectRoute={handleSelectRoute}
          onLogout={handleLogout}
          onViewHistory={handleViewHistory}
        />
      )}
      {currentView === 'routeDetail' && selectedRoute && (
        <RouteDetail 
          route={selectedRoute}
          onBack={handleBackToRoutes}
        />
      )}
      {currentView === 'history' && (
        <TripHistory onBack={handleBackFromHistory} userType={userType} />
      )}
    </div>
  );
}