import { Settings as SettingsIcon, Database, Key, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">Administra las opciones del sistema</p>
      </div>

      <Tabs defaultValue="connections" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl">
          <TabsTrigger value="connections">
            <Database className="mr-2 h-4 w-4" />
            Conexiones
          </TabsTrigger>
          <TabsTrigger value="thresholds">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Umbrales
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Usuarios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API y Almacenamiento</CardTitle>
              <CardDescription>Configura las conexiones a servicios externos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-base">URL base de API</Label>
                <Input id="api-base" placeholder="https://api.mm-yelp.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input id="api-key" type="password" placeholder="••••••••••••••••" />
                  <Button variant="outline">
                    <Key className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storage-bucket">Bucket de almacenamiento</Label>
                <Input id="storage-bucket" placeholder="s3://mm-yelp-data" />
              </div>

              <Button>Guardar conexiones</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thresholds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Umbrales de clasificación</CardTitle>
              <CardDescription>Define los valores límite para las predicciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="classification-threshold">Umbral de clasificación</Label>
                <Input id="classification-threshold" type="number" step="0.01" defaultValue="0.50" />
                <p className="text-xs text-muted-foreground">
                  Score mínimo para clasificar como "alta valoración"
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="drift-threshold">Umbral de drift (PSI)</Label>
                <Input id="drift-threshold" type="number" step="0.01" defaultValue="0.20" />
                <p className="text-xs text-muted-foreground">PSI máximo antes de alertar</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quality-threshold">Umbral de calidad (nulos)</Label>
                <Input id="quality-threshold" type="number" step="0.01" defaultValue="0.05" />
                <p className="text-xs text-muted-foreground">% máximo de valores nulos permitidos</p>
              </div>

              <Button>Guardar umbrales</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modo demo</CardTitle>
              <CardDescription>Activa datos simulados para pruebas</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="font-medium">Usar datos mock</p>
                <p className="text-sm text-muted-foreground">
                  Cuando está activo, se usan datos de ejemplo en lugar de la API real
                </p>
              </div>
              <Switch defaultChecked />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de usuarios</CardTitle>
              <CardDescription>Administra roles y permisos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">admin@mm-yelp.com</p>
                      <p className="text-sm text-muted-foreground">Rol: Administrador</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">analyst@mm-yelp.com</p>
                      <p className="text-sm text-muted-foreground">Rol: Analista</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>

                <Button variant="gradient">Invitar usuario</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
