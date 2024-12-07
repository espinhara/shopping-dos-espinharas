import React, { useState } from "react";
import { Box, Button, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BarcodeScanner: React.FC = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleUpdate = (error: unknown | any, result?: { text: string } | any) => {
    if (result?.text) {
      setScannedData(result.text);
      setIsScanning(false); // Parar o escaneamento após sucesso
    }
    if (error) {
      console.error("Erro no scanner:", error);
    }
  };

  const startScanning = () => {
    setScannedData(null); // Limpa o resultado anterior
    setIsScanning(true); // Inicia o escaneamento
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f9f9f9", padding: 2 }}
    >
      <Card sx={{ width: "100%", maxWidth: 600, padding: 2, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Leitor de Código de Barras
          </Typography>

          {isScanning ? (
            <Box position="relative" width="100%">
              <BarcodeScannerComponent
                onUpdate={handleUpdate}
                width={400}
                height={300}
                facingMode="environment"
                delay={500} // Processa frames a cada 500ms
              />
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Posicione o código de barras à frente da câmera
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="body1" gutterBottom>
                Clique no botão abaixo para iniciar o escaneamento.
              </Typography>
              <Button variant="contained" color="primary" onClick={startScanning}>
                Iniciar Scanner
              </Button>
            </>
          )}

          {scannedData && (
            <Box mt={2}>
              <Typography variant="h6" color="success.main">
                Código Escaneado:
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {scannedData}
              </Typography>
            </Box>
          )}

          {isScanning && (
            <Box mt={2}>
              <CircularProgress />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BarcodeScanner;
