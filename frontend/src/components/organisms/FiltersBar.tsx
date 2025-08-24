import { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { FormButton } from '../atoms/FormButton';
import { FilterChip } from '../atoms/FilterChip';
import { FilterMenu } from '../molecules/FilterMenu';
import { getClasesNiza } from '../../services/claseNizaService';
import { getPaises } from '../../services/paisService';
import type { ClaseNiza } from '../../types/claseNiza';
import type { Pais } from '../../types/pais';
import type { MarcaFilterParams } from '../../types/marca';
import { estadoLabels, EstadoMarca } from '../../types/estadoMarca';
import { useSnackbar } from '../../hooks/useSnackbar';

interface FiltersBarProps {
  onFiltersChange?: (filters: MarcaFilterParams) => void;
}

export const FiltersBar = ({ onFiltersChange }: FiltersBarProps) => {
  const [filters, setFilters] = useState<MarcaFilterParams>({});
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [clasesNiza, setClasesNiza] = useState<ClaseNiza[]>([]);
  const menuOpen = Boolean(menuAnchorEl);
  const { showSnackbar } = useSnackbar();
  
  useEffect(() => {
    Promise.all([getPaises(), getClasesNiza()])
      .then(([paisesData, clasesData]) => {
        setPaises(paisesData);
        setClasesNiza(clasesData);
      })
      .catch(() => {
        showSnackbar('Error al cargar datos para filtros', 'error');
      });
  }, []);

  const handleAddFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleFiltersApply = (appliedFilters: MarcaFilterParams) => {
    setFilters(appliedFilters);
    onFiltersChange?.(appliedFilters);
  };

  const handleRemoveFilter = (filterKey: keyof MarcaFilterParams) => {
    const { [filterKey]: _, ...updatedFilters } = filters;
    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const renderFilterChips = () => {
    return Object.entries(filters).map(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return null;
      }

      let label = '';
      let displayValue: string | undefined = '';

      switch (key as keyof MarcaFilterParams) {
        case 'nombre':
          label = 'Marca';
          displayValue = value as string;
          break;
        case 'titular':
          label = 'Titular';
          displayValue = value as string;
          break;

        case 'estados':
          label = 'Estado';
          displayValue = (value as EstadoMarca[]).map(e => estadoLabels[e]).join(', ');
          break;
        case 'fecha_desde':
          label = 'Fecha desde';
          displayValue = value as string;
          break;
        case 'fecha_hasta':
          label = 'Fecha hasta';
          displayValue = value as string;
          break;
        case 'pais_id':
          label = 'País';
          displayValue = paises.find(p => p.id === value)?.nombre;
          break;
        case 'clase_niza_id':
          label = 'Clase Niza';
          const clase = clasesNiza.find(c => c.id === value);
          displayValue = clase ? `Clase ${clase.codigo}` : '';
          break;
        default:
          return null;
      }

      if (!displayValue) return null;

      return (
        <FilterChip
          key={key}
          label={label}
          value={displayValue}
          onRemove={() => handleRemoveFilter(key as keyof MarcaFilterParams)}
        />
      );
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="column" spacing={2} alignItems="start" flexWrap="wrap" gap={1}>
        <FormButton
          variant="outlined"
          onClick={handleAddFilterClick}
          sx={{ 
            minWidth: 'auto',
            flexShrink: 0
          }}
        >
          <FilterList sx={{ mr: 1, fontSize: '1rem' }} />
          Agregar Filtro
        </FormButton>

        {Object.keys(filters).length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {renderFilterChips()}
          </Box>
        )}
      </Stack>

      <FilterMenu
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        onFiltersApply={handleFiltersApply}
        initialFilters={filters}
        paises={paises}
        clasesNiza={clasesNiza}
      />
    </Box>
  );
};