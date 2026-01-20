import { ArrowLeft, CheckCircle, XCircle, Star, Calendar, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TripHistoryItem } from '../App';

const mockHistory: TripHistoryItem[] = [
  {
    id: '1',
    date: '2026-01-18',
    route: 'ESPOL → Kennedy Norte',
    driver: 'María García',
    price: 1.2,
    status: 'completed',
    rating: 5,
    review: 'Excelente viaje, muy puntual'
  },
  {
    id: '2',
    date: '2026-01-15',
    route: 'Centro → ESPOL',
    driver: 'Carlos Mendoza',
    price: 1.5,
    status: 'completed',
    rating: 4
  },
  {
    id: '3',
    date: '2026-01-12',
    route: 'ESPOL → Alborada',
    driver: 'José Ramírez',
    price: 1.8,
    status: 'cancelled'
  },
  {
    id: '4',
    date: '2026-01-10',
    route: 'Urdesa → ESPOL',
    driver: 'Ana Martínez',
    price: 1.0,
    status: 'completed',
    rating: 5,
    review: 'Muy amable y responsable'
  }
];

type TripHistoryProps = {
  onBack: () => void;
  userType: 'user' | 'driver' | null;
};

export default function TripHistory({ onBack, userType }: TripHistoryProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const completedTrips = mockHistory.filter(t => t.status === 'completed');
  const cancelledTrips = mockHistory.filter(t => t.status === 'cancelled');

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-blue-600">Historial de Viajes</h1>
            <p className="text-gray-500">
              {completedTrips.length} viajes completados
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <Card className="p-3 text-center bg-green-50 border-green-200">
            <p className="text-gray-600 text-sm mb-1">Completados</p>
            <div className="flex items-center justify-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-600">{completedTrips.length}</span>
            </div>
          </Card>
          <Card className="p-3 text-center bg-red-50 border-red-200">
            <p className="text-gray-600 text-sm mb-1">Cancelados</p>
            <div className="flex items-center justify-center gap-1">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-red-600">{cancelledTrips.length}</span>
            </div>
          </Card>
          <Card className="p-3 text-center bg-blue-50 border-blue-200">
            <p className="text-gray-600 text-sm mb-1">Total gastado</p>
            <span className="text-blue-600">
              ${completedTrips.reduce((acc, t) => acc + t.price, 0)}
            </span>
          </Card>
        </div>
      </div>

      {/* Trip List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {mockHistory.map((trip) => (
            <Card
              key={trip.id}
              className={`p-4 ${trip.status === 'completed'
                  ? 'border-l-4 border-l-green-500'
                  : 'border-l-4 border-l-red-500 bg-gray-50'
                }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {trip.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <Badge
                      className={
                        trip.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }
                    >
                      {trip.status === 'completed' ? 'Completado' : 'Cancelado'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(trip.date)}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{trip.route}</span>
                  </div>

                  <p className="text-gray-600">
                    Conductor: <strong>{trip.driver}</strong>
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-green-600 mb-2">
                    ${trip.price}
                  </div>
                  {trip.status === 'completed' && trip.rating && (
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{trip.rating}</span>
                    </div>
                  )}
                </div>
              </div>

              {trip.review && (
                <div className="bg-gray-50 rounded-lg p-3 mt-3 border border-gray-200">
                  <p className="text-sm text-gray-700 italic">"{trip.review}"</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
