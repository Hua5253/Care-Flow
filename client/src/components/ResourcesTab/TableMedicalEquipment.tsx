import {
  Button,
  IconButton,
  Paper,
  Table,
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

export default function TableMedicalEquipment() {
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
      <Table aria-label="simple table" stickyHeader sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Item Name</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Item ID</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Category</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Quantity Available</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Status</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((data, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                {data.name}
              </TableCell>
              <TableCell align="left">{data.id}</TableCell>
              <TableCell align="left">{data.category}</TableCell>
              <TableCell align="left">{data.quantity}</TableCell>
              <TableCell
                align="left"
                style={{ color: getStatusColor(data.status) }}
              >
                {data.status}
              </TableCell>
              <TableCell align="left" size="medium">
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
      </Table>
    </TableContainer>
  );
}