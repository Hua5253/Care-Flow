import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CaregiverSideBar from "../../../components/SideBar/CaregiverSideBar";

jest.mock("@mui/material/useMediaQuery");

describe("CaregiverSideBar Component", () => {
  it("should render all sidebar items and navigate when clicked", () => {
    const { getByTestId, container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <CaregiverSideBar />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="/schedule"
            element={<div className="SchedulePage">Schedule Page</div>}
          />
          <Route
            path="/Messages/caregiver"
            element={<div className="MessagePage">Message Page</div>}
          />
        </Routes>
      </MemoryRouter>
    );

    let pageContent = container.querySelector(".SchedulePage");
    expect(pageContent).not.toBeInTheDocument();

    const scheduleSidebarItem = getByTestId("Schedule");
    userEvent.click(scheduleSidebarItem);

    pageContent = container.querySelector(".SchedulePage");
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
        <CaregiverSideBar />
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
        <CaregiverSideBar />
      </MemoryRouter>
    );
    const drawer = container.querySelector(".MuiDrawer-paper");
    expect(drawer).toHaveStyle("width: 240px");
  });
});
