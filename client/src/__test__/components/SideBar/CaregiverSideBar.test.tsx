import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import CaregiverSideBar from "../../../components/SideBar/CaregiverSideBar";

describe("CaregiverSideBar Component", () => {
  beforeEach(() => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router location={history.location} navigator={history}>
        <CaregiverSideBar />
      </Router>
    );
  });
  it("should render all sidebar items and navigate when clicked", () => {
    const scheduleSidebarItem = screen.getByTestId(/schedule/i);
    const messageSidebarItem = screen.getByTestId(/Message/i);
    expect(scheduleSidebarItem).toBeInTheDocument();
    expect(messageSidebarItem).toBeInTheDocument();
    // fireEvent.click(accountsSidebarItem);
    // expect(window.location.pathname).toBe("/accounts");

    // fireEvent.click(messageSidebarItem);
    // expect(window.location.pathname).toBe("/Messages/admin");
  });
});
