import { useState } from 'react';
import { ArrowLeft, MapPin, Users, Clock, DollarSign, Navigation, User, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import MapView from './MapView';
import DriverChat from './DriverChat';
import { DriverRoute, PickupPoint } from '../App';

type RouteDetailProps = {
  route: DriverRoute;
  onBack: () => void;
};

export default function RouteDetail({ route, onBack }: RouteDetailProps) {
  const [selectedPoint, setSelectedPoint] = useState<PickupPoint | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState<string>('');

  // Get all positions for the map
  const pickupPositions = route.pickupPoints.map(p => p.position) as [number, number][];
  const startPosition = pickupPositions[0];
  const endPosition = pickupPositions[pickupPositions.length - 1];

  // Create route path for visualization
  const routePath = route.routePath || pickupPositions;

  // Create pickup points labels for map
  const pickupPointsForMap = route.pickupPoints.map((p, idx) => ({
    position: p.position,
    label: `Parada ${idx + 1}`
  }));

  const handleOpenChat = (passengerName: string) => {
    setSelectedPassenger(passengerName);
    setChatOpen(true);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 z-10">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h2>{route.name}</h2>
            <p className="text-gray-500">{route.estimatedDuration}</p>
          </div>
          <Badge className={route.status === 'active' ? 'bg-green-600' : 'bg-blue-600'}>
            {route.status === 'active' ? 'En Curso' : 'Programada'}
          </Badge>
        </div>

        {/* Route Summary */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="bg-blue-50 rounded-lg p-2 text-center">
            <Users className="w-4 h-4 mx-auto mb-1 text-blue-600" />
            <p className="text-gray-600">{route.totalPassengers}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-2 text-center">
            <DollarSign className="w-4 h-4 mx-auto mb-1 text-green-600" />
            <p className="text-gray-600">${route.price}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-2 text-center">
            <MapPin className="w-4 h-4 mx-auto mb-1 text-purple-600" />
            <p className="text-gray-600">{route.pickupPoints.length} paradas</p>
          </div>
        </div>

        {/* Total Earnings Card */}
        <Card className="mt-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total a ganar</p>
              <span className="text-green-700">💰 ${route.price}</span>
            </div>
            <div className="text-right">
              <p className="text-gray-600 mb-1">Por pasajero</p>
              <span className="text-green-600">
                ~${(route.price / route.totalPassengers).toFixed(0)}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Map */}
      <MapView
        userPosition={startPosition}
        destination={endPosition}
        driverPosition={route.status === 'active' ? [35, 35] : undefined}
        pickupPoints={pickupPointsForMap}
        routePath={routePath}
        showRoute={true}
      />


      {/* Map Markers Info */}
      <div className="absolute top-4 left-4 right-4">
        <Card className="p-3 bg-white/95 backdrop-blur">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full" />
            <span className="text-sm">Inicio: {route.startPoint}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full" />
            <span className="text-sm">Destino: {route.endPoint}</span>
          </div>
        </Card>
      </div>


      {/* Pickup Points List */}
      <div className="bg-white rounded-t-3xl shadow-2xl p-4 max-h-[45vh] overflow-y-auto">
        <h2 className="mb-4">Puntos de Recogida</h2>

        <div className="space-y-3">
          {route.pickupPoints.map((point, index) => (
            <Card
              key={point.id}
              className={`p-4 transition-all cursor-pointer ${selectedPoint?.id === point.id ? 'border-2 border-blue-600 bg-blue-50' : 'hover:shadow-md'
                }`}
              onClick={() => setSelectedPoint(selectedPoint?.id === point.id ? null : point)}
            >
              <div className="flex items-start gap-3">
                {/* Step Number */}
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>

                <div className="flex-1">
                  {/* Address and Time */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span>{point.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{point.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="bg-gray-50 rounded-lg p-3 mt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-900">
                        {point.passengers} {point.passengers === 1 ? 'pasajero' : 'pasajeros'}
                      </span>
                    </div>

                    {selectedPoint?.id === point.id && (
                      <div className="space-y-2 mt-3">
                        {point.passengerNames.map((name, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <span>{name}</span>
                              <p className="text-green-600 text-sm">
                                ${point.passengerPrices[idx]}
                              </p>
                            </div>
                            <Button
                              size="icon"
                              variant="outline"
                              className="rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenChat(name);
                              }}
                            >
                              <MessageCircle className="w-4 h-4 text-blue-600" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {route.status === 'active' && (
          <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
            Iniciar Ruta
          </Button>
        )}
      </div>

      {/* Driver Chat */}
      {chatOpen && (
        <DriverChat
          passengerName={selectedPassenger}
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
}