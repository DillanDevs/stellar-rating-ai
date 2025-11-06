import { DollarSign, TrendingDown, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockFinOps } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function FinOps() {
  const { costByJob, latencyMetrics, recommendations } = mockFinOps;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">FinOps</h1>
        <p className="text-muted-foreground">Costos, latencia y optimizaciones</p>
      </div>

      {/* Cost Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Costo total/día</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">$127.50</p>
            <p className="mt-1 text-xs text-muted-foreground">
              <span className="text-accent">↓ 8.3%</span> vs. mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Latencia p95</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{latencyMetrics.p95}ms</p>
            <p className="mt-1 text-xs text-muted-foreground">
              <span className="text-accent">↓ 12%</span> vs. semana anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Jobs ejecutados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">209</p>
            <p className="mt-1 text-xs text-muted-foreground">últimos 7 días</p>
          </CardContent>
        </Card>
      </div>

      {/* Cost by Job Type */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Costos por tipo de job
          </CardTitle>
          <CardDescription>Desglose de gastos por operación</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costByJob}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="job" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, "Costo"]}
              />
              <Bar dataKey="cost" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Latency Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas de latencia</CardTitle>
          <CardDescription>Percentiles de tiempo de respuesta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">p50 (mediana)</p>
              <p className="text-3xl font-bold">{latencyMetrics.p50}ms</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">p95</p>
              <p className="text-3xl font-bold">{latencyMetrics.p95}ms</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">p99</p>
              <p className="text-3xl font-bold">{latencyMetrics.p99}ms</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            Recomendaciones de optimización
          </CardTitle>
          <CardDescription>Sugerencias para reducir costos y mejorar rendimiento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <Alert key={index}>
                <TrendingDown className="h-4 w-4 text-accent" />
                <AlertTitle>Oportunidad de ahorro</AlertTitle>
                <AlertDescription>{recommendation}</AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Job Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detalle de jobs</CardTitle>
          <CardDescription>Costo y volumen por tipo de operación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-medium">Tipo de Job</th>
                  <th className="py-3 text-center font-medium">Ejecuciones</th>
                  <th className="py-3 text-center font-medium">Costo total</th>
                  <th className="py-3 text-center font-medium">Costo promedio</th>
                </tr>
              </thead>
              <tbody>
                {costByJob.map((job) => (
                  <tr key={job.job} className="border-b last:border-0">
                    <td className="py-3 font-medium">{job.job}</td>
                    <td className="py-3 text-center">{job.count}</td>
                    <td className="py-3 text-center">${job.cost.toFixed(2)}</td>
                    <td className="py-3 text-center">${(job.cost / job.count).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
