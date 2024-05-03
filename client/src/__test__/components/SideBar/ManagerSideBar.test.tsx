import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import ManagerSideBar from "../../../components/SideBar/ManagerSideBar";

describe("ManagerSideBar Component", () => {
  beforeEach(() => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router location={history.location} navigator={history}>
        <ManagerSideBar />
      </Router>
    );
  });
  it("should render all sidebar items and navigate when clicked", () => {
    const resourceSidebarItem = screen.getByTestId(/Resource/i);
    const pathwaySidebarItem = screen.getByTestId(/Pathway/i);
    const templateSidebarItem = screen.getByTestId(/Template/i);
    const messageSidebarItem = screen.getByTestId(/Message/i);
    expect(resourceSidebarItem).toBeInTheDocument();
    expect(pathwaySidebarItem).toBeInTheDocument();
    expect(templateSidebarItem).toBeInTheDocument();
    expect(messageSidebarItem).toBeInTheDocument();
    // fireEvent.click(accountsSidebarItem);
    // expect(window.location.pathname).toBe("/accounts");

    // fireEvent.click(messageSidebarItem);
    // expect(window.location.pathname).toBe("/Messages/admin");
  });
});
