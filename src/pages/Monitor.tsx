import { Activity, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockDriftData, mockQualityMetrics } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

export default function Monitor() {
  const starData = Object.entries(mockQualityMetrics.starDistribution).map(([star, value]) => ({
    star: `${star}★`,
    value: value * 100,
  }));

  const classData = Object.entries(mockQualityMetrics.classBalance).map(([label, value]) => ({
    name: label === "high" ? "Alta" : "Baja",
    value: value * 100,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Monitoreo</h1>
        <p className="text-muted-foreground">Calidad de datos y detección de drift</p>
      </div>

      {/* Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Drift detectado</AlertTitle>
          <AlertDescription>
            La distribución de longitud de texto ha cambiado significativamente (PSI: 0.22)
          </AlertDescription>
        </Alert>
        <Alert>
          <CheckCircle className="h-4 w-4 text-accent" />
          <AlertTitle>Calidad estable</AlertTitle>
          <AlertDescription>
            Tasa de nulos dentro del rango esperado (3%)
          </AlertDescription>
        </Alert>
      </div>

      {/* Drift Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Detección de drift (PSI)
          </CardTitle>
          <CardDescription>
            Population Stability Index por feature (referencia vs. reciente)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockDriftData.map((item) => (
            <div key={item.feature} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.feature}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">PSI: {item.psi.toFixed(2)}</span>
                  <Badge
                    variant={
                      item.status === "ok" ? "default" : item.status === "warning" ? "secondary" : "destructive"
                    }
                  >
                    {item.status === "ok" ? (
                      <CheckCircle className="mr-1 h-3 w-3" />
                    ) : item.status === "warning" ? (
                      <AlertTriangle className="mr-1 h-3 w-3" />
                    ) : (
                      <XCircle className="mr-1 h-3 w-3" />
                    )}
                    {item.status === "ok" ? "OK" : item.status === "warning" ? "Monitorear" : "Alerta"}
                  </Badge>
                </div>
              </div>
              <Progress
                value={Math.min(item.psi * 100, 100)}
                className={
                  item.status === "alert"
                    ? "bg-destructive/20 [&>div]:bg-destructive"
                    : item.status === "warning"
                      ? "bg-warning/20 [&>div]:bg-warning"
                      : ""
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Data Quality */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de estrellas</CardTitle>
            <CardDescription>Proporción de reseñas por rating</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={starData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="star" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, "Proporción"]}
                />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Balance de clases</CardTitle>
            <CardDescription>Proporción alta vs. baja valoración</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={classData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {classData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, "Proporción"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quality Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas de calidad</CardTitle>
          <CardDescription>Estadísticas generales de los datos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tasa de nulos</p>
              <p className="text-3xl font-bold">{(mockQualityMetrics.nulls * 100).toFixed(1)}%</p>
              <Progress value={mockQualityMetrics.nulls * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Longitud promedio de texto</p>
              <p className="text-3xl font-bold">{mockQualityMetrics.textLengthAvg}</p>
              <p className="text-xs text-muted-foreground">caracteres</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Rating promedio</p>
              <p className="text-3xl font-bold">4.1</p>
              <p className="text-xs text-muted-foreground">de 5 estrellas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
