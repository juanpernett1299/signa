import { useState, useEffect } from 'react';
import { 
  Menu, 
  Select,
  FormControl,
  Box,
  Typography,
  OutlinedInput,
  Checkbox,
  Divider,
  MenuItem,
  TextField
} from '@mui/material';
import { 
  Copyright,
  Person,
  Flag,
  CalendarToday,
  Category,
  Assignment
} from '@mui/icons-material';
import { StatusChip } from '../atoms/StatusChip';
import { FormButton } from '../atoms/FormButton';
import { EstadoMarca } from '../../types/estadoMarca';
import type { ClaseNiza } from '../../types/claseNiza';
import type { Pais } from '../../types/pais';
import type { MarcaFilterParams } from '../../types/marca';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export type FilterType = 'marca' | 'titular' | 'estado' | 'fecha_desde' | 'fecha_hasta' | 'pais' | 'clase_niza';

interface FilterFormData {
  marca: string;
  titular: string;
  estado: EstadoMarca[];
  fecha_desde: string;
  fecha_hasta: string;
  pais: string;
  clase_niza: string;
}

interface FilterMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onFiltersApply: (filters: MarcaFilterParams) => void;
  initialFilters: MarcaFilterParams;
  paises?: Pais[];
  clasesNiza?: ClaseNiza[];
}

export const FilterMenu = ({ 
  anchorEl, 
  open, 
  onClose, 
  onFiltersApply,
  initialFilters,
  paises = [],
  clasesNiza = [],
}: FilterMenuProps) => {
  const [formData, setFormData] = useState<FilterFormData>({
    marca: '',
    titular: '',
    estado: [],
    fecha_desde: '',
    fecha_hasta: '',
    pais: '',
    clase_niza: ''
  });

  // Precargar valores del formulario cuando se abre el menú
  useEffect(() => {
    if (open) {
      setFormData({
        marca: initialFilters.nombre || '',
        titular: initialFilters.titular || '',
        estado: initialFilters.estados || [],
        fecha_desde: initialFilters.fecha_desde || '',
        fecha_hasta: initialFilters.fecha_hasta || '',
        pais: initialFilters.pais_id?.toString() || '',
        clase_niza: initialFilters.clase_niza_id?.toString() || ''
      });
    }
  }, [open, initialFilters]);

  const handleInputChange = (field: keyof FilterFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyFilters = () => {
    const appliedFilters: MarcaFilterParams = {};

    if (formData.marca.trim()) {
      appliedFilters.nombre = formData.marca.trim();
    }
    if (formData.titular.trim()) {
      appliedFilters.titular = formData.titular.trim();
    }
    if (formData.estado.length > 0) {
      appliedFilters.estados = formData.estado;
    }
    if (formData.fecha_desde) {
      appliedFilters.fecha_desde = formData.fecha_desde;
    }
    if (formData.fecha_hasta) {
      appliedFilters.fecha_hasta = formData.fecha_hasta;
    }
    if (formData.pais) {
      appliedFilters.pais_id = parseInt(formData.pais, 10);
    }
    if (formData.clase_niza) {
      appliedFilters.clase_niza_id = parseInt(formData.clase_niza, 10);
    }

    onFiltersApply(appliedFilters);
    onClose();
  };

  const handleClearFilters = () => {
    setFormData({
      marca: '',
      titular: '',
      estado: [],
      fecha_desde: '',
      fecha_hasta: '',
      pais: '',
      clase_niza: ''
    });
    onFiltersApply({});
    onClose();
  };

  const handleEstadoChange = (event: any) => {
    const value = event.target.value;
    handleInputChange('estado', typeof value === 'string' ? value.split(',') : value);
  };

  const formInputStyles = {
    '& .MuiOutlinedInput-root': {
      // height: 32,
      color: '#ffffff',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#333333',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#555555',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#ffffff',
      },
    },
    '& .MuiInputBase-input': {
      fontSize: '0.8125rem',
    },
    '& .MuiSvgIcon-root': {
      color: '#888888',
    },
  };

  const menuPaperStyles = {
    bgcolor: '#000000',
    border: '1px solid #333333',
    borderRadius: 2,
    minWidth: 280,
    maxWidth: 320,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    '& .MuiMenuItem-root': {
      color: '#ffffff',
      fontSize: '0.8125rem',
      py: 0.75,
      px: 2,
      minHeight: 'auto',
      borderBottom: '1px solid #1a1a1a',
      '&:last-child': {
        borderBottom: 'none'
      },
      '&:hover': {
        bgcolor: '#111111'
      }
    },
    '& .MuiListItemIcon-root': {
      color: 'inherit',
      minWidth: 28
    },
    '& .MuiDivider-root': {
      borderColor: '#333333'
    },
    '& .MuiSelect-root': {
      fontSize: '0.8125rem',
      minHeight: 'auto'
    },
    '& .MuiOutlinedInput-root': {
      bgcolor: '#1e1e1e',
      '& fieldset': {
        borderColor: '#333333',
      },
      '&:hover fieldset': {
        borderColor: '#555555',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ffffff',
      }
    },
    '& .MuiSelect-icon': {
      color: '#888888',
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          ...menuPaperStyles,
          minWidth: 320,
          maxWidth: 400
        }
      }}
      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
      <Box sx={{ p: 2 }}>
        {/* Campo Marca */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Copyright sx={{ fontSize: '0.875rem', mr: 1, color: '#888888' }} />
            <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '0.8125rem', fontWeight: 500 }}>
              Marca
            </Typography>
          </Box>
          <TextField
            size="small"
            fullWidth
            value={formData.marca}
            placeholder="Buscar por marca"
            onChange={(e) => handleInputChange('marca', e.target.value)}
            sx={formInputStyles}
          />
        </Box>

        {/* Campo Titular */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Person sx={{ fontSize: '0.875rem', mr: 1, color: '#888888' }} />
            <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '0.8125rem', fontWeight: 500 }}>
              Titular
            </Typography>
          </Box>
          <TextField
            size="small"
            fullWidth
            value={formData.titular}
            placeholder="Buscar por titular"
            onChange={(e) => handleInputChange('titular', e.target.value)}
            sx={formInputStyles}
          />
        </Box>

        {/* Campo Estado */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Assignment sx={{ fontSize: '0.875rem', mr: 1, color: '#888888' }} />
            <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '0.8125rem', fontWeight: 500 }}>
              Estado
            </Typography>
          </Box>
          <FormControl size="small" fullWidth>
            <Select
              multiple
              value={formData.estado}
              onChange={handleEstadoChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <StatusChip key={value} estado={value as EstadoMarca} />
                  ))}
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: '#000000',
                    border: '1px solid #333333',
                    '& .MuiMenuItem-root': {
                      color: '#ffffff',
                      fontSize: '0.8125rem',
                      py: 0.75,
                      '&:hover': {
                        bgcolor: '#111111',
                      }
                    }
                  }
                }
              }}
            >
              <MenuItem value="" disabled>
                Seleccionar estado
              </MenuItem>
              {Object.values(EstadoMarca).map((estado) => (
                <MenuItem
                  key={estado}
                  value={estado}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 0.75,
                  }}
                >
                  <Checkbox 
                    checked={formData.estado.indexOf(estado) > -1}
                    sx={{
                      color: '#888888',
                      '&.Mui-checked': {
                        color: '#ffffff',
                      },
                      '& .MuiSvgIcon-root': {
                        fontSize: '1rem'
                      }
                    }}
                  />
                  <StatusChip estado={estado} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Campo Fecha desde */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <CalendarToday sx={{ fontSize: '0.875rem', mr: 1, color: '#888888' }} />
            <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '0.8125rem', fontWeight: 500 }}>
              Fecha desde
            </Typography>
          </Box>
          <DatePicker
            value={formData.fecha_desde ? dayjs(formData.fecha_desde) : null}
            onChange={(date) => handleInputChange('fecha_desde', date ? date.format('YYYY-MM-DD') : '')}
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true,
                placeholder: 'MM/DD/YYYY',
                sx: formInputStyles
              }
            }}
          />
        </Box>

        {/* Campo Fecha hasta */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <CalendarToday sx={{ fontSize: '0.875rem', mr: 1, color: '#888888' }} />
            <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '0.8125rem', fontWeight: 500 }}>
              Fecha hasta
            </Typography>
          </Box>
          <DatePicker
            value={formData.fecha_hasta ? dayjs(formData.fecha_hasta) : null}
            onChange={(date) => handleInputChange('fecha_hasta', date ? date.format('YYYY-MM-DD') : '')}
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true,
                placeholder: 'MM/DD/YYYY',
                sx: formInputStyles
              }
            }}
          />
        </Box>

        {/* Campo País */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Flag sx={{ fontSize: '0.875rem', mr: 1, color: '#888888' }} />
            <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '0.8125rem', fontWeight: 500 }}>
              País
            </Typography>
          </Box>
          <FormControl size="small" fullWidth>
            <Select
              value={formData.pais}
              onChange={(e) => handleInputChange('pais', e.target.value)}
              displayEmpty
              sx={{
                ...formInputStyles, 
                '& .MuiPaper-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: '#000000',
                    border: '1px solid #333333',
                    '& .MuiMenuItem-root': {
                      color: '#ffffff',
                      fontSize: '0.8125rem',
                      py: 0.75,
                      '&:hover': {
                        bgcolor: '#111111',
                      }
                    }
                  }
                }
              }}
            >
              <MenuItem value="" disabled>
                Seleccionar país
              </MenuItem>
              {paises && paises.map((pais) => (
                <MenuItem
                  key={pais.id}
                  value={pais.id.toString()}
                >
                  {pais.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Campo Clase Niza */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Category sx={{ fontSize: '0.875rem', mr: 1, color: '#888888' }} />
            <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '0.8125rem', fontWeight: 500 }}>
              Clase Niza
            </Typography>
          </Box>
          <FormControl size="small" fullWidth>
            <Select
              value={formData.clase_niza}
              onChange={(e) => handleInputChange('clase_niza', e.target.value)}
              displayEmpty
              sx={formInputStyles}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: '#000000',
                    border: '1px solid #333333',
                    '& .MuiMenuItem-root': {
                      color: '#ffffff',
                      fontSize: '0.8125rem',
                      py: 0.75,
                      '&:hover': {
                        bgcolor: '#111111',
                      }
                    }
                  }
                }
              }}
            >
              <MenuItem value="" disabled>
                Seleccionar clase
              </MenuItem>
              {clasesNiza.map((clase) => (
                <MenuItem
                  key={clase.id}
                  value={clase.id.toString()}
                >
                  Clase {clase.codigo} - {clase.descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Divider sx={{ borderColor: '#333333', mb: 3 }} />

        {/* Botones de acción */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <FormButton
            variant="outlined"
            onClick={handleClearFilters}
          >
            Limpiar
          </FormButton>
          <FormButton
            onClick={handleApplyFilters}
          >
            Filtrar
          </FormButton>
        </Box>
      </Box>
    </Menu>
  );
};