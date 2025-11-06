import { Building2, MessageSquare, Image, TrendingUp, Zap, Clock } from "lucide-react";
import { KpiCard } from "@/components/KpiCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockOverview } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-dashboard.jpg";

export default function Overview() {
  const { kpis, trend, recentRuns } = mockOverview;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 text-white shadow-lg">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
          <img src={heroImage} alt="Dashboard" className="h-full w-full object-cover" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="mb-2 text-4xl font-bold">Bienvenido a MM-Yelp</h1>
          <p className="mb-6 text-lg opacity-90">
            Predice la satisfacción de tus clientes antes de que opinen
          </p>
          <Link to="/predict">
            <Button size="lg" variant="secondary" className="shadow-md">
              <Zap className="mr-2 h-5 w-5" />
              Crear predicción
            </Button>
          </Link>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Negocios"
          value={kpis.businesses.toLocaleString()}
          icon={Building2}
          trend={{ value: 5.2, isPositive: true }}
        />
        <KpiCard
          title="Reseñas"
          value={kpis.reviews.toLocaleString()}
          icon={MessageSquare}
          trend={{ value: 12.3, isPositive: true }}
        />
        <KpiCard
          title="Fotos"
          value={kpis.photos.toLocaleString()}
          icon={Image}
          trend={{ value: 8.7, isPositive: true }}
        />
        <KpiCard
          title="Alta valoración"
          value={`${kpis.highRatingPercent}%`}
          icon={TrendingUp}
          description="4-5 estrellas"
        />
      </div>

      {/* Model Performance & Trends */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tendencia de valoraciones</CardTitle>
            <CardDescription>Rating promedio y volumen de reseñas por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis yAxisId="left" className="text-xs" />
                <YAxis yAxisId="right" orientation="right" className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="rating_avg"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  name="Rating promedio"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="reviews"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="Reseñas"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modelo en producción</CardTitle>
            <CardDescription>Rendimiento actual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Versión</span>
                <Badge variant="secondary">{kpis.modelVersion}</Badge>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Latencia p95</span>
                <span className="font-medium">{kpis.latencyP95}ms</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Costo/día</span>
                <span className="font-medium">${kpis.costPerDay}</span>
              </div>
            </div>
            <Link to="/models" className="block">
              <Button variant="outline" className="w-full">
                Ver detalles
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad reciente</CardTitle>
          <CardDescription>Últimas ejecuciones del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRuns.map((run) => (
              <div
                key={run.id}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/50"
              >
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{run.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(run.timestamp).toLocaleString("es-ES")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      run.status === "success"
                        ? "default"
                        : run.status === "running"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {run.status === "success"
                      ? "Completado"
                      : run.status === "running"
                        ? "En curso"
                        : "Error"}
                  </Badge>
                  {run.duration && <span className="text-sm text-muted-foreground">{run.duration}s</span>}
                  {run.progress && <span className="text-sm text-muted-foreground">{run.progress}%</span>}
                  <Link to={`/runs/${run.id}`}>
                    <Button variant="ghost" size="sm">
                      Ver detalle
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
