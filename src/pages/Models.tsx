import { Box, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockModels } from "@/lib/mockData";

export default function Models() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Modelos</h1>
          <p className="text-muted-foreground">Gestiona y compara modelos de predicción</p>
        </div>
        <Button variant="gradient">
          <Box className="mr-2 h-4 w-4" />
          Entrenar nuevo modelo
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockModels.map((model) => (
          <Card
            key={model.id}
            className={
              model.status === "production"
                ? "border-2 border-primary shadow-glow transition-all hover:shadow-lg"
                : "transition-all hover:shadow-lg"
            }
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {model.type}
                    {model.status === "production" && <Award className="h-5 w-5 text-primary" />}
                  </CardTitle>
                  <CardDescription className="mt-1">Versión {model.version}</CardDescription>
                </div>
                <Badge
                  variant={
                    model.status === "production"
                      ? "default"
                      : model.status === "staging"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {model.status === "production"
                    ? "Producción"
                    : model.status === "staging"
                      ? "Staging"
                      : "Candidato"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">F1 Macro</span>
                  <span className="font-medium">{model.metrics.f1_macro.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">PR-AUC</span>
                  <span className="font-medium">{model.metrics.pr_auc.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Brier Score</span>
                  <span className="font-medium">{model.metrics.brier_score.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ECE</span>
                  <span className="font-medium">{model.metrics.ece.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Ver detalles
                </Button>
                {model.status !== "production" && (
                  <Button variant="success" size="sm" className="flex-1">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Promover
                  </Button>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                Creado el {new Date(model.created_at).toLocaleDateString("es-ES")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Model Comparison Section */}
      <Card>
        <CardHeader>
          <CardTitle>Comparación de métricas</CardTitle>
          <CardDescription>Benchmark de todos los modelos disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-medium">Modelo</th>
                  <th className="py-3 text-center font-medium">F1 Macro</th>
                  <th className="py-3 text-center font-medium">PR-AUC</th>
                  <th className="py-3 text-center font-medium">Brier</th>
                  <th className="py-3 text-center font-medium">ECE</th>
                  <th className="py-3 text-center font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {mockModels.map((model) => (
                  <tr key={model.id} className="border-b last:border-0">
                    <td className="py-3">
                      <div>
                        <p className="font-medium">{model.type}</p>
                        <p className="text-xs text-muted-foreground">{model.version}</p>
                      </div>
                    </td>
                    <td className="py-3 text-center">{model.metrics.f1_macro.toFixed(2)}</td>
                    <td className="py-3 text-center">{model.metrics.pr_auc.toFixed(2)}</td>
                    <td className="py-3 text-center">{model.metrics.brier_score.toFixed(2)}</td>
                    <td className="py-3 text-center">{model.metrics.ece.toFixed(2)}</td>
                    <td className="py-3 text-center">
                      <Badge variant={model.status === "production" ? "default" : "secondary"}>
                        {model.status}
                      </Badge>
                    </td>
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
