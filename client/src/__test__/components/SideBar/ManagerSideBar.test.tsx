import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ManagerSideBar from "../../../components/SideBar/ManagerSideBar";

jest.mock("@mui/material/useMediaQuery");

describe("ManagerSideBar Component", () => {
  it("should render all sidebar items and navigate when clicked", () => {
    const { getByTestId, container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ManagerSideBar />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="/resources"
            element={<div className="ResourcePage">Resource Page</div>}
          />
          <Route
            path="/manager-pathway"
            element={<div className="PathwayPage">Pathway Page</div>}
          />
          <Route
            path="/manager-template"
            element={<div className="TemplatePage">Template Page</div>}
          />
          <Route
            path="/Messages/manager"
            element={<div className="MessagePage">Message Page</div>}
          />
        </Routes>
      </MemoryRouter>
    );

    let pageContent = container.querySelector(".ResourcePage");
    expect(pageContent).not.toBeInTheDocument();

    const resourceSidebarItem = getByTestId("Resource");
    userEvent.click(resourceSidebarItem);

    pageContent = container.querySelector(".ResourcePage");
    expect(pageContent).toBeInTheDocument();

    const pathwaySidebarItem = getByTestId("Pathway");
    userEvent.click(pathwaySidebarItem);

    pageContent = container.querySelector(".PathwayPage");
    expect(pageContent).toBeInTheDocument();

    const templateSidebarItem = getByTestId("Template");
    userEvent.click(templateSidebarItem);

    pageContent = container.querySelector(".TemplatePage");
    expect(pageContent).toBeInTheDocument();

    const messageSidebarItem = getByTestId("Message");
    userEvent.click(messageSidebarItem);

    pageContent = container.querySelector(".MessagePage");
    expect(pageContent).toBeInTheDocument();
  });
  it("should set drawer width to 0 when between xs and md", () => {
    const useMediaQuery = require("@mui/material/useMediaQuery").default;
    useMediaQuery.mockImplementation(() => true);
    const { container } = render(
      <MemoryRouter>
        <ManagerSideBar />
      </MemoryRouter>
    );
    const drawer = container.querySelector(".MuiDrawer-paper");
    expect(drawer).toHaveStyle("width: 0px");
  });

  it("should set drawer width to 240 when not between xs and md", () => {
    const useMediaQuery = require("@mui/material/useMediaQuery").default;
    useMediaQuery.mockImplementation(() => false);
    const { container } = render(
      <MemoryRouter>
        <ManagerSideBar />
      </MemoryRouter>
    );
    const drawer = container.querySelector(".MuiDrawer-paper");
    expect(drawer).toHaveStyle("width: 240px");
  });
});
