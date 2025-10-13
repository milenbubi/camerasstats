import { blue } from "@mui/material/colors";
import { tableRowClasses } from "@mui/material/TableRow";
import { tableCellClasses } from "@mui/material/TableCell";
import { Theme, ThemeOptions, alpha } from "@mui/material/styles";



export function muiTable(theme: Theme): ThemeOptions["components"] {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: "relative"
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          [`&.${tableRowClasses.selected}`]: {
            backgroundColor: alpha(theme.palette.primary.dark, 0.04),
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.dark, 0.08)
            }
          },
          "&:last-of-type": {
            [`& .${tableCellClasses.root}`]: {
              borderColor: "transparent"
            },
            [`& .${tableCellClasses.body}`]: {
              borderColor: alpha(theme.palette.text.disabled, 0.2)
            }
          },
          "&:not(:last-of-type)": {
            [`& .${tableCellClasses.root}`]: {
              borderColor: alpha(theme.palette.text.disabled, 0.2)
            }
          },
          [`&.${tableRowClasses.head}`]: {
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          // borderBottomStyle: "dashed"
        },
        head: {
          fontSize: 14,
          color: theme.palette.text.secondary,
          fontWeight: theme.typography.fontWeightBold,
          backgroundColor: alpha(blue[500], 0.5)

        },
        stickyHeader: {
          backgroundColor: theme.palette.background.neutral,
        },
        paddingCheckbox: {
          paddingLeft: theme.spacing(1)
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          width: "100%"
        },
        toolbar: {
          // height: 64
        },
        actions: {
          marginRight: 8
        },
        select: {
          paddingLeft: 8,
          "&:focus": {
            borderRadius: theme.shape.borderRadius
          }
        },
        selectIcon: {
          right: 4,
          width: 16,
          height: 16,
          top: "calc(50% - 8px)"
        }
      }
    }
  };
}