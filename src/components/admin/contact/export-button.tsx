'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { getAllContactSubmissions } from "@/app/actions/contact";
import * as XLSX from 'xlsx';
import { toast } from "sonner";

export function ExportSubmissionsButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const submissions = await getAllContactSubmissions();
      
      if (submissions.length === 0) {
        toast.error("No hay datos para exportar");
        return;
      }

      const dataToExport = submissions.map(s => ({
        ID: s.id,
        Nombre: s.name,
        Email: s.email,
        Teléfono: s.phone || 'N/A',
        Mensaje: s.message,
        Fecha: new Date(s.createdAt).toLocaleString('es-ES'),
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Contactos");
      
      // Auto-size columns
      const maxLengths = dataToExport.reduce((acc: any, row: any) => {
        Object.keys(row).forEach(key => {
          const val = String(row[key]);
          acc[key] = Math.max(acc[key] || 0, val.length);
        });
        return acc;
      }, {});
      
      worksheet['!cols'] = Object.keys(maxLengths).map(key => ({
        wch: Math.min(Math.max(maxLengths[key], 10), 50)
      }));

      XLSX.writeFile(workbook, `Contactos_Gobai_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success("Excel exportado correctamente");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Error al exportar a Excel");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={handleExport} 
      disabled={isExporting}
      className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold"
    >
      <Download className="h-4 w-4 mr-2" />
      {isExporting ? "Exportando..." : "Exportar Excel"}
    </Button>
  );
}
