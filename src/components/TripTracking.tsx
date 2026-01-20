import { useState, useEffect } from 'react';
import { ArrowLeft, Phone, MessageCircle, Navigation, Clock, Star, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import MapView from './MapView';
import Chat from './Chat';
import PaymentMethodSelector, { PaymentMethod } from './PaymentMethodSelector';
import CancellationPolicy from './CancellationPolicy';
import { Driver } from '../App';

type TripTrackingProps = {
  driver: Driver;
  destination: string;
  onBack: () => void;
};

export default function TripTracking({ driver, destination, onBack }: TripTrackingProps) {
  const [timeRemaining, setTimeRemaining] = useState(driver.estimatedTime);
  const [progress, setProgress] = useState(0);
  const [driverPosition, setDriverPosition] = useState<[number, number]>([30, 30]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false);

  const userPosition: [number, number] = [50, 50];
  const destinationPosition: [number, number] = [70, 70];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });

      setProgress((prev) => {
        const newProgress = prev + (100 / (driver.estimatedTime * 60));
        return newProgress >= 100 ? 100 : newProgress;
      });

      // Simulate driver moving towards user
      setDriverPosition((prev) => {
        const xDiff = (userPosition[0] - prev[0]) * 0.02;
        const yDiff = (userPosition[1] - prev[1]) * 0.02;
        return [prev[0] + xDiff, prev[1] + yDiff];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [driver.estimatedTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCancelTrip = () => {
    setShowCancellationPolicy(true);
  };

  const handleConfirmCancel = () => {
    setShowCancellationPolicy(false);
    // Aquí iría la lógica de cancelación
    alert('Viaje cancelado. El conductor ha sido notificado.');
    onBack();
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
            <h2>Tu viaje</h2>
            <p className="text-gray-500">Destino: {destination}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancelTrip}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <XCircle className="w-4 h-4 mr-1" />
            Cancelar viaje
          </Button>
        </div>

        {/* Time and Progress */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-blue-900">Tiempo estimado de llegada</span>
            </div>
            <span className="text-blue-600">{formatTime(timeRemaining)}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-gray-600 mt-2">
            {timeRemaining > 0 ? 'El conductor está en camino' : '¡El conductor ha llegado!'}
          </p>
        </div>
      </div>

      {/* Map */}
      <MapView
        userPosition={userPosition}
        driverPosition={driverPosition}
        destination={destinationPosition}
      />
      {/* <div className="flex-1 relative">
        <MapView 
          userPosition={userPosition}
          driverPosition={driverPosition}
          destination={destinationPosition}
        />
      </div> */}

      {/* Driver Info Card */}
      <div className="bg-white shadow-2xl p-4">
        {/* Payment Method Selector */}
        <PaymentMethodSelector
          selectedMethod={paymentMethod}
          onMethodChange={setPaymentMethod}
        />

        <Card className="p-4 border-2 border-blue-100">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={driver.image} alt={driver.name} />
              <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h3>{driver.name}</h3>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{driver.rating}</span>
              </div>
              <p className="text-gray-500">{driver.vehicle}</p>
            </div>

            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full">
                <Phone className="w-5 h-5 text-green-600" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => setIsChatOpen(true)}
              >
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </Button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <div>
              <p className="text-gray-500">Precio del viaje</p>
              <span className="text-green-600">${driver.price}</span>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Distancia</p>
              <span>3.2 km</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Chat Component */}
      <Chat
        driver={driver}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Cancellation Policy Dialog */}
      <CancellationPolicy
        isOpen={showCancellationPolicy}
        onClose={() => setShowCancellationPolicy(false)}
        onAccept={handleConfirmCancel}
        price={driver.price}
      />
    </div>
  );
}