import {
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Container,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AppBanner from "../../AppBanner/AppBanner";
import ManagerSideBar from "../../SideBar/ManagerSideBar";

const templates = [
  "PEDIATRIC SURGERY BUNDLE template",
  "PEDIATRIC SURGERY BUNDLE template 2",
  "PEDIATRIC SURGERY BUNDLE template 3",
];

function TemplateScreen() {
  const handleEdit = (templateName: string) => {
    console.log("Edit:", templateName);
  };

  const handleDelete = (templateName: string) => {
    console.log("Delete:", templateName);
  };

  return (
    <Container id="app">
      <Box sx={{ flexGrow: 1, mt: 10 }}>
        <AppBanner cred={true} />
        <ManagerSideBar />
        <Button
          startIcon={<AddCircleOutlineIcon />}
          variant="contained"
          sx={{ marginBottom: 2 }}
        >
          Create Template
        </Button>
        <Box sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}>
          <List>
            {templates.map((templateName, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <Box>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleEdit(templateName)}
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => handleDelete(templateName)}
                    >
                      Delete
                    </Button>
                  </Box>
                }
              >
                <ListItemText primary={templateName} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}

export default TemplateScreen;
