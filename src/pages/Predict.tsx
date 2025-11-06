import { useState } from "react";
import { Zap, Upload, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function Predict() {
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPredictionResult({
        score: 0.82,
        label: "high",
        confidence: 0.89,
        explanation: {
          topTokens: ["excellent", "delicious", "friendly", "recommend"],
          topFeatures: ["review_count: 234", "rating: 4.5", "photos: 67"],
        },
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Predicciones</h1>
        <p className="text-muted-foreground">Ejecuta predicciones individuales o por lote</p>
      </div>

      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="single">Predicción individual</TabsTrigger>
          <TabsTrigger value="batch">Predicción por lote</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>Datos de entrada</CardTitle>
                <CardDescription>Completa los datos del negocio o reseña</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Nombre del negocio</Label>
                  <Input id="business-name" placeholder="Ej: The Artisan Café" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" placeholder="Ej: San Francisco" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restaurant">Restaurante</SelectItem>
                      <SelectItem value="cafe">Café</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="services">Servicios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-text">Texto de reseña (opcional)</Label>
                  <Textarea
                    id="review-text"
                    placeholder="Ej: Excelente servicio y comida deliciosa..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Imágenes (opcional)</Label>
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-primary">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Arrastra imágenes o haz clic para seleccionar
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Modelo</Label>
                  <Select defaultValue="production">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Producción (v2.3.1)</SelectItem>
                      <SelectItem value="staging">Staging (v2.2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" onClick={handlePredict} disabled={isLoading}>
                  {isLoading ? (
                    <>Procesando...</>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Predecir
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Resultado</CardTitle>
                <CardDescription>Predicción y explicación del modelo</CardDescription>
              </CardHeader>
              <CardContent>
                {!predictionResult && !isLoading && (
                  <div className="flex h-64 items-center justify-center text-center">
                    <div className="space-y-2">
                      <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Completa el formulario y presiona "Predecir" para ver resultados
                      </p>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="space-y-4">
                    <Progress value={66} />
                    <p className="text-center text-sm text-muted-foreground">Procesando predicción...</p>
                  </div>
                )}

                {predictionResult && !isLoading && (
                  <div className="space-y-6">
                    <div className="rounded-lg bg-accent/10 p-6 text-center">
                      <p className="text-sm text-muted-foreground">Score de valoración</p>
                      <p className="text-5xl font-bold text-accent">{predictionResult.score}</p>
                      <Badge className="mt-2" variant="default">
                        {predictionResult.label === "high" ? "Alta valoración" : "Baja valoración"}
                      </Badge>
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-medium">Confianza del modelo</p>
                      <Progress value={predictionResult.confidence * 100} className="h-2" />
                      <p className="mt-1 text-right text-xs text-muted-foreground">
                        {(predictionResult.confidence * 100).toFixed(1)}%
                      </p>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <p className="mb-2 font-medium">Factores más influyentes:</p>
                        <ul className="list-inside list-disc space-y-1 text-sm">
                          {predictionResult.explanation.topFeatures.map((feature: string, i: number) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>

                    <div>
                      <p className="mb-2 text-sm font-medium">Palabras clave detectadas:</p>
                      <div className="flex flex-wrap gap-2">
                        {predictionResult.explanation.topTokens.map((token: string) => (
                          <Badge key={token} variant="secondary">
                            {token}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        Guardar caso
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Compartir
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="batch">
          <Card>
            <CardHeader>
              <CardTitle>Predicción por lote</CardTitle>
              <CardDescription>Sube un archivo CSV o Parquet con múltiples negocios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  El archivo debe contener las columnas: business_id, name, city, categories, review_count
                </AlertDescription>
              </Alert>

              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-12 transition-colors hover:border-primary">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-sm font-medium">Arrastra tu archivo CSV o Parquet aquí</p>
                  <p className="mt-1 text-xs text-muted-foreground">o haz clic para seleccionar</p>
                  <Button variant="outline" className="mt-4">
                    Seleccionar archivo
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Zap className="mr-2 h-4 w-4" />
                  Iniciar predicción
                </Button>
                <Button variant="outline">Descargar plantilla</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
