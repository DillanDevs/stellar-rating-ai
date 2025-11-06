import { useState } from "react";
import { Search, Download, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockBusinesses } from "@/lib/mockData";
import { Link } from "react-router-dom";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredBusinesses = mockBusinesses.filter((business) =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Explorar datos</h1>
        <p className="text-muted-foreground">Busca y analiza negocios de la base de datos</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, ciudad, categoría..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Filtros
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Resultados ({filteredBusinesses.length})</CardTitle>
          <CardDescription>
            Mostrando {filteredBusinesses.length} de {mockBusinesses.length} negocios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Negocio</TableHead>
                  <TableHead>Ciudad</TableHead>
                  <TableHead>Categorías</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Reseñas</TableHead>
                  <TableHead>Fotos</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBusinesses.map((business) => (
                  <TableRow key={business.business_id} className="hover:bg-accent/50">
                    <TableCell className="font-medium">{business.name}</TableCell>
                    <TableCell>{business.city}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {business.categories.slice(0, 2).map((cat) => (
                          <Badge key={cat} variant="secondary" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{business.rating}</span>
                        <span className="text-warning">★</span>
                      </div>
                    </TableCell>
                    <TableCell>{business.review_count.toLocaleString()}</TableCell>
                    <TableCell>{business.photos_count}</TableCell>
                    <TableCell className="text-right">
                      <Link to={`/predict?business=${business.business_id}`}>
                        <Button size="sm" variant="ghost">
                          Predecir
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
