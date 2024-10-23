import React, { useState,  } from 'react';
import { TextField,IconButton, Button, Grid, Typography, Box } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from 'react-router-dom'
interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: File[];  // Array de arquivos para upload das imagens
}

const AdminProduct: React.FC = () => {
  const navigate = useNavigate()
  const [images, setImages] = useState<File[]>([]);
  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    images: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setProduct({ ...product, images: Array.from(e.target.files).slice(0, 4) });
  //   }
  // };

  // Função para lidar com o upload de novas imagens
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Converter FileList em array e adicionar à fila de imagens
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
      setProduct({...product, images: Array.from(e.target.files).slice(0, 4)})
    }
  };

  // Função para remover uma imagem da fila
  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('quantity', product.quantity.toString());
    
    // Adiciona as imagens ao formData
    product.images.forEach((image) => {
      formData.append('images', image);
    });
  
    try {
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Produto cadastrado com sucesso:', response.data);
      navigate('/admin/products', {replace: true})
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Cadastrar Produto
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome"
              name="name"
              variant="outlined"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descrição"
              name="description"
              variant="outlined"
              value={product.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Preço"
              name="price"
              type="number"
              variant="outlined"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantidade"
              name="quantity"
              type="number"
              variant="outlined"
              value={product.quantity}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
            >
              Upload Imagens
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                multiple
                hidden
                // onChange={handleImageChange}
              />
            </Button>
          </Grid>
          <Grid m={4} container spacing={2}>
            {images.map((image, index) => (
              <Grid item xs={3} key={index}>
                <Box
                  sx={{
                    position: 'relative',
                    width: 120,
                    height: 120,
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: '2px solid #ccc',
                  }}
                >
                  {/* Mostrar preview da imagem */}
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`imagem ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Botão de excluir no canto superior direito */}
                  <IconButton
                    size="small"
                    color="secondary"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Cadastrar Produto
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AdminProduct;
