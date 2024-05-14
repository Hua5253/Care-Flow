import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
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

  it("should apply correct styles based on resources location pathname", () => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { pathname: "/resources" },
    });

    const { getByTestId } = render(
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

    const resourceSidebarItem = getByTestId("Resource");
    expect(resourceSidebarItem).toHaveStyle({ backgroundColor: "#cfe8fc" });
    fireEvent.mouseEnter(resourceSidebarItem);
    expect(resourceSidebarItem).toHaveStyle({ backgroundColor: "#cfe8fc" });
    expect(resourceSidebarItem).toHaveStyle({
      borderRight: "5px solid #2196f3",
    });

    const pathwaySidebarItem = getByTestId("Pathway");
    expect(pathwaySidebarItem).toHaveStyle({ backgroundColor: "inherit" });
    expect(pathwaySidebarItem).toHaveStyle({
      borderRight: "none",
    });
    const templateSidebarItem = getByTestId("Template");
    expect(templateSidebarItem).toHaveStyle({ backgroundColor: "inherit" });
    expect(templateSidebarItem).toHaveStyle({
      borderRight: "none",
    });
    const messageSidebarItem = getByTestId("Message");
    expect(messageSidebarItem).toHaveStyle({ backgroundColor: "inherit" });
    expect(messageSidebarItem).toHaveStyle({
      borderRight: "none",
    });
  });

  it("should apply correct styles based on manager-pathway location pathname", () => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { pathname: "/manager-pathway" },
    });

    const { getByTestId } = render(
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

    const pathwaySidebarItem = getByTestId("Pathway");
    expect(pathwaySidebarItem).toHaveStyle({ backgroundColor: "#cfe8fc" });
    fireEvent.mouseEnter(pathwaySidebarItem);
    expect(pathwaySidebarItem).toHaveStyle({ backgroundColor: "#cfe8fc" });
    expect(pathwaySidebarItem).toHaveStyle({
      borderRight: "5px solid #2196f3",
    });

    const resourceSidebarItem = getByTestId("Resource");
    expect(resourceSidebarItem).toHaveStyle({ backgroundColor: "inherit" });
    expect(resourceSidebarItem).toHaveStyle({
      borderRight: "none",
    });
    const templateSidebarItem = getByTestId("Template");
    expect(templateSidebarItem).toHaveStyle({ backgroundColor: "inherit" });
    expect(templateSidebarItem).toHaveStyle({
      borderRight: "none",
    });
    const messageSidebarItem = getByTestId("Message");
    expect(messageSidebarItem).toHaveStyle({ backgroundColor: "inherit" });
    expect(messageSidebarItem).toHaveStyle({
      borderRight: "none",
    });
  });
});
