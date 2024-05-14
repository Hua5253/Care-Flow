import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
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

  it("should apply correct styles based on location pathname", () => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { pathname: "/schedule" },
    });

    const { getByTestId } = render(
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

    const scheduleSidebarItem = getByTestId("Schedule");
    expect(scheduleSidebarItem).toHaveStyle({ backgroundColor: "#cfe8fc" });
    fireEvent.mouseEnter(scheduleSidebarItem);
    expect(scheduleSidebarItem).toHaveStyle({ backgroundColor: "#cfe8fc" });
    expect(scheduleSidebarItem).toHaveStyle({
      borderRight: "5px solid #2196f3",
    });

    const messageSidebarItem = getByTestId("Message");
    expect(messageSidebarItem).toHaveStyle({ backgroundColor: "inherit" });
    expect(messageSidebarItem).toHaveStyle({
      borderRight: "none",
    });
  });
});
