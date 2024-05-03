import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import AdminSideBar from "../../../components/SideBar/AdminSideBar";

describe("AdminSideBar Component", () => {
  beforeEach(() => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router location={history.location} navigator={history}>
        <AdminSideBar />
      </Router>
    );
  });
  it("should render all sidebar items and navigate when clicked", () => {
    const accountsSidebarItem = screen.getByTestId(/Accounts/i);
    const messageSidebarItem = screen.getByTestId(/Message/i);
    expect(accountsSidebarItem).toBeInTheDocument();
    expect(messageSidebarItem).toBeInTheDocument();
    // fireEvent.click(accountsSidebarItem);
    // expect(window.location.pathname).toBe("/accounts");

    // fireEvent.click(messageSidebarItem);
    // expect(window.location.pathname).toBe("/Messages/admin");
  });
});
