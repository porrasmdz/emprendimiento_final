import { useState } from 'react';
import { MapPin, Search, History } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import DriverCard from './DriverCard';
import MapView from './MapView';
import { Driver } from '../App';

const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    rating: 4.8,
    vehicle: 'Toyota Corolla 2020',
    price: 1.5,
    estimatedTime: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    route: 'Centro → Zona Norte',
    verified: true,
    institution: 'ESPOL',
    punctualityScore: 92,
    reviewsCount: 48
  },
  {
    id: '2',
    name: 'María García',
    rating: 4.9,
    vehicle: 'Honda Civic 2021',
    price: 1.2,
    estimatedTime: 8,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    route: 'Centro → Zona Norte',
    verified: true,
    institution: 'ESPOL',
    punctualityScore: 95,
    reviewsCount: 67
  },
  {
    id: '3',
    name: 'José Ramírez',
    rating: 4.7,
    vehicle: 'Nissan Sentra 2019',
    price: 1.8,
    estimatedTime: 6,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    route: 'Centro → Zona Norte',
    verified: true,
    institution: 'ESPOL',
    punctualityScore: 88,
    reviewsCount: 34
  },
  {
    id: '4',
    name: 'Ana Martínez',
    rating: 5.0,
    vehicle: 'Mazda 3 2022',
    price: 1.0,
    estimatedTime: 10,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    route: 'Centro → Zona Norte',
    verified: true,
    institution: 'ESPOL',
    punctualityScore: 98,
    reviewsCount: 125
  }
];

type HomeProps = {
  onSelectDriver: (driver: Driver, destination: string) => void;
  onViewHistory: () => void;
};

export default function Home({ onSelectDriver, onViewHistory }: HomeProps) {
  const [destination, setDestination] = useState('');
  const [showDrivers, setShowDrivers] = useState(false);

  const handleSearch = () => {
    if (destination.trim()) {
      setShowDrivers(true);
    }
  };

  // Example route path for visualization
  const exampleRoutePath: [number, number][] = [
    [20, 50],
    [35, 45],
    [50, 50],
    [65, 55],
    [80, 50]
  ];

  const examplePickupPoints = [
    { position: [20, 50] as [number, number], label: 'Punto 1' },
    { position: [50, 50] as [number, number], label: 'Punto 2' },
    { position: [80, 50] as [number, number], label: 'Punto 3' },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 z-10">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-blue-600">PoliDrive</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewHistory}
            className="flex items-center gap-2"
          >
            <History className="w-4 h-4" />
            Historial
          </Button>
        </div>

        {/* Destination Input */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="¿A dónde quieres ir?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Map */}
      <MapView
        routePath={showDrivers ? exampleRoutePath : []}
        pickupPoints={showDrivers ? examplePickupPoints : []}
        showRoute={showDrivers}
      />

      {/* Drivers List */}
      {showDrivers && (
        <div className="bg-white z-10 rounded-t-3xl shadow-2xl p-6 max-h-[50vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2>Choferes disponibles</h2>
              <p className="text-gray-500">
                {mockDrivers.length} conductores verificados en tu ruta
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {mockDrivers.map((driver) => (
              <DriverCard
                key={driver.id}
                driver={driver}
                onSelect={() => onSelectDriver(driver, destination)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}