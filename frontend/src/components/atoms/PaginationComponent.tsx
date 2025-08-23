import { Box, Pagination, Typography, Select, MenuItem, FormControl } from '@mui/material';

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export const PaginationComponent = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}: PaginationComponentProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        py: 2,
        px: 1
      }}
    >
      {/* Información de elementos */}
      <Typography
        variant="body2"
        sx={{
          color: '#888888',
          fontSize: '0.875rem'
        }}
      >
        Mostrando {startItem}-{endItem} de {totalItems} marcas
      </Typography>

      {/* Controles de paginación */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Selector de elementos por página */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#888888',
              fontSize: '0.875rem',
              whiteSpace: 'nowrap'
            }}
          >
            Por página:
          </Typography>
          <FormControl size="small">
            <Select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              sx={{
                bgcolor: '#111111',
                color: '#ffffff',
                fontSize: '0.875rem',
                minWidth: 70,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#333333',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#555555',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff',
                },
                '& .MuiSelect-icon': {
                  color: '#888888',
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: '#111111',
                    border: '1px solid #333333',
                    '& .MuiMenuItem-root': {
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      '&:hover': {
                        bgcolor: '#222222',
                      },
                      '&.Mui-selected': {
                        bgcolor: '#333333',
                        '&:hover': {
                          bgcolor: '#444444',
                        }
                      }
                    }
                  }
                }
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Paginación */}
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
          color="primary"
          size="small"
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#888888',
              borderColor: '#333333',
              '&:hover': {
                bgcolor: '#111111',
                color: '#ffffff'
              },
              '&.Mui-selected': {
                bgcolor: '#ffffff',
                color: '#000000',
                '&:hover': {
                  bgcolor: '#f0f0f0'
                }
              }
            }
          }}
        />
      </Box>
    </Box>
  );
};