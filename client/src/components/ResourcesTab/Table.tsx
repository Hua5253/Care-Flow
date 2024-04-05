import {
  Button,
  IconButton,
  Paper,
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

interface MedicalEquipment {
  name: string;
  id: string;
  category: string;
  quantity: string;
  status: string;
}

const dataSource: MedicalEquipment[] = [
  {
    name: "Surgical Masks",
    id: "LAB-0238",
    category: "Surgical Masks",
    quantity: "1200 units",
    status: "In Stock",
  },
  {
    name: "Surgical Masks",
    id: "LAB-0237",
    category: "Stethoscope",
    quantity: "35 units ",
    status: "Low Stock",
  },
  {
    name: "Surgical Masks",
    id: "LAB-0236",
    category: "IV Drip Bags",
    quantity: "500 units",
    status: "Out of Stock",
  },
  {
    name: "Surgical Masks",
    id: "LAB-0235",
    category: "Hand Sanitizer",
    quantity: "150 units",
    status: "On Order",
  },
];

export default function Table() {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "In Stock": "#409832",
      "Low Stock": "#B1840F",
      "Out of Stock": "#B1190F",
      "On Order": "#2686AF",
    };
    return colors[status] || "#000";
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "100%", border: "solid 0.1em grey", shadow: "inherit" }}
    >
      <MaterialTable
        aria-label="simple table"
        stickyHeader
        sx={{ width: "100%" }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell align="right">
              <TableSortLabel active={true}>Item ID</TableSortLabel>
            </TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Quantity Available</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((data, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data.name}
              </TableCell>
              <TableCell align="right">{data.id}</TableCell>
              <TableCell align="right">{data.category}</TableCell>
              <TableCell align="right">{data.quantity}</TableCell>
              <TableCell
                align="right"
                style={{ color: getStatusColor(data.status) }}
              >
                {data.status}
              </TableCell>
              <TableCell align="right" size="medium">
                <Button variant="outlined" sx={{ fontSize: "13px" }}>
                  Edit
                </Button>
                <IconButton size="medium" sx={{ ml: 3 }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
}
