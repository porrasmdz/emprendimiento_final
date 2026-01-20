import { Navigation, MapPin } from 'lucide-react';

type MapViewProps = {
  driverPosition?: [number, number];
  destination?: [number, number];
  userPosition?: [number, number];
  pickupPoints?: Array<{ position: [number, number]; label: string }>;
};

export default function MapView({
  driverPosition,
  destination,
  userPosition = [50, 50],
  pickupPoints = [],
}: MapViewProps) {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      <img
        src="/location1.png"
        alt="Mapa"
        className="max-w-full max-h-full object-contain"
      />
      {/* PICKUP POINTS */}
      {pickupPoints.map((point, index) => (
        <div
          key={index}
          className="absolute -ml-4 -mt-4 z-20"
          style={{
            left: `${point.position[0]}%`,
            top: `${point.position[1]}%`,
          }}
        >
          <div className="relative">
            <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
              {point.label}
            </span>
          </div>
        </div>
      ))}

      {/* USUARIO
      <div
        className="absolute -ml-6 -mt-6 z-30"
        style={{
          left: `${userPosition[0]}%`,
          top: `${userPosition[1]}%`,
        }}
      >
        <div className="w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow flex items-center justify-center animate-pulse">
          <Navigation className="w-6 h-6 text-white" />
        </div>
      </div> */}

      {/* CONDUCTOR */}
      {driverPosition && (
        <div
          className="absolute -ml-7 -mt-7 z-40 transition-all duration-1000"
          style={{
            left: `${driverPosition[0]}%`,
            top: `${driverPosition[1]}%`,
          }}
        >
          <div className="w-14 h-14 bg-green-600 rounded-full border-4 border-white shadow flex items-center justify-center text-2xl">
            🚗
          </div>
        </div>
      )}

      {/* DESTINO */}
      {destination && (
        <div
          className="absolute -ml-6 -mt-12 z-30"
          style={{
            left: `${destination[0]}%`,
            top: `${destination[1]}%`,
          }}
        >
          <div className="w-10 h-10 bg-red-600 rounded-full border-4 border-white shadow flex items-center justify-center">
            📍
          </div>
        </div>
      )}
    </div>
  );
}
