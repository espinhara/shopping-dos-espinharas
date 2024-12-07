import { Box, FormControl, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, ChangeEvent, FormEvent } from "react";
import { Product } from '../interfaces/product';
import { search } from '../providers/product';

// Definição de tipos para as props
interface SearchInputProps {
  data: {
    searchInput?: string;
  };
  onSearch: (list: Product[]) => void;
  setLoading: (flag: boolean) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ data, onSearch, setLoading }) => {
  const [dados, setDados] = useState({
    ...data,
    searchInput: data.searchInput || "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchParams = dados.searchInput
    await search(1, setLoading, searchParams).then(res => {
      if (res?.items)
        onSearch(res.items)
    })
  };

  const handleChange = (value: string, name: string) => {
    setDados((prevDados) => ({
      ...prevDados,
      [name]: value, // Atualiza apenas o campo específico
    }));
  };

  return (
    <Box component="section" sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
        <FormControl fullWidth margin="normal">
          <TextField
            id="searchInput"
            label="Pesquisar"
            variant="outlined"
            value={dados.searchInput}
            fullWidth
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value, "searchInput")
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end" aria-label="Pesquisar">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </form>
    </Box>
  );
};

export default SearchInput;
