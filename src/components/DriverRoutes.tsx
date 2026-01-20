import {
  LogOut,
  MapPin,
  Users,
  Clock,
  DollarSign,
  History,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { DriverRoute } from "../App";

const mockRoutes: DriverRoute[] = [
  {
    id: "1",
    name: "Centro → Zona Norte",
    startPoint: "Av. Reforma 123",
    endPoint: "Zona Norte, Calle Principal",
    totalPassengers: 3,
    estimatedDuration: "45 min",
    price: 3.5,
    status: "active",
    pickupPoints: [
      {
        id: "p1",
        address: "Av. Reforma 123",
        passengers: 1,
        passengerNames: ["María González"],
        passengerPrices: [15],
        position: [45, 40],
        time: "08:00 AM",
      },
      {
        id: "p2",
        address: "Calle Juárez 456",
        passengers: 1,
        passengerNames: ["Carlos Ramírez"],
        passengerPrices: [12],
        position: [45, 40],
        time: "08:10 AM",
      },
      {
        id: "p3",
        address: "Av. Hidalgo 789",
        passengers: 1,
        passengerNames: ["Ana Martínez"],
        passengerPrices: [18],
        position: [60, 55],
        time: "08:20 AM",
      },
    ],
  },
  {
    id: "2",
    name: "Universidad → Centro",
    startPoint: "Ciudad Universitaria",
    endPoint: "Centro Histórico",
    totalPassengers: 2,
    estimatedDuration: "35 min",
    price: 3.0,
    status: "scheduled",
    pickupPoints: [
      {
        id: "p4",
        address: "Ciudad Universitaria, Puerta 3",
        passengers: 1,
        passengerNames: ["Luis Hernández"],
        passengerPrices: [15],
        position: [25, 70],
        time: "02:00 PM",
      },
      {
        id: "p5",
        address: "Av. Universidad 234",
        passengers: 1,
        passengerNames: ["Sofia Torres"],
        passengerPrices: [15],
        position: [40, 60],
        time: "02:15 PM",
      },
    ],
  },
  {
    id: "3",
    name: "Aeropuerto → Centro",
    startPoint: "Terminal 2",
    endPoint: "Centro Comercial Plaza",
    totalPassengers: 4,
    estimatedDuration: "50 min",
    price: 8.0,
    status: "scheduled",
    pickupPoints: [
      {
        id: "p6",
        address: "Aeropuerto Terminal 2",
        passengers: 2,
        passengerNames: ["Roberto Silva", "Patricia Morales"],
        passengerPrices: [20, 20],
        position: [20, 20],
        time: "06:00 PM",
      },
      {
        id: "p7",
        address: "Av. Aeropuerto Km 5",
        passengers: 2,
        passengerNames: ["Diego López", "Carmen Ruiz"],
        passengerPrices: [20, 20],
        position: [35, 35],
        time: "06:20 PM",
      },
    ],
  },
];

type DriverRoutesProps = {
  onSelectRoute: (route: DriverRoute) => void;
  onLogout: () => void;
  onViewHistory: () => void;
};

export default function DriverRoutes({
  onSelectRoute,
  onLogout,
  onViewHistory,
}: DriverRoutesProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">En Curso</Badge>;
      case "scheduled":
        return (
          <Badge className="bg-blue-600">Programada</Badge>
        );
      case "completed":
        return (
          <Badge className="bg-gray-600">Completada</Badge>
        );
      default:
        return null;
    }
  };

  const activeRoutes = mockRoutes.filter(
    (r) => r.status === "active",
  );
  const scheduledRoutes = mockRoutes.filter(
    (r) => r.status === "scheduled",
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-green-600">
              Panel del Conductor
            </h1>
            <p className="text-gray-500">Gestiona tus rutas</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onViewHistory}
              title="Ver historial"
            >
              <History className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <Card className="p-3 text-center">
            <p className="text-gray-500 mb-1">Rutas hoy</p>
            <span className="text-green-600">
              {mockRoutes.length}
            </span>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-gray-500 mb-1">Pasajeros</p>
            <span className="text-blue-600">
              {mockRoutes.reduce(
                (acc, r) => acc + r.totalPassengers,
                0,
              )}
            </span>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-gray-500 mb-1">Ingresos</p>
            <span className="text-green-600">
              ${mockRoutes.reduce((acc, r) => acc + r.price, 0)}
            </span>
          </Card>
        </div>
      </div>

      {/* Routes List */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeRoutes.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3">Rutas Activas</h2>
            <div className="space-y-3">
              {activeRoutes.map((route) => (
                <Card
                  key={route.id}
                  className="p-4 hover:shadow-lg transition-all cursor-pointer border-2 border-green-200"
                  onClick={() => onSelectRoute(route)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3>{route.name}</h3>
                        {getStatusBadge(route.status)}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{route.startPoint}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span>{route.endPoint}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>
                        {route.totalPassengers} pasajeros
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{route.estimatedDuration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 ml-auto">
                      <DollarSign className="w-4 h-4" />
                      <span>${route.price}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {scheduledRoutes.length > 0 && (
          <div>
            <h2 className="mb-3">Rutas Programadas</h2>
            <div className="space-y-3">
              {scheduledRoutes.map((route) => (
                <Card
                  key={route.id}
                  className="p-4 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => onSelectRoute(route)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3>{route.name}</h3>
                        {getStatusBadge(route.status)}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{route.startPoint}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span>{route.endPoint}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>
                        {route.totalPassengers} pasajeros
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{route.estimatedDuration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 ml-auto">
                      <DollarSign className="w-4 h-4" />
                      <span>${route.price}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}