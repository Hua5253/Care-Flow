import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminSideBar from "../../../components/SideBar/AdminSideBar";

jest.mock("@mui/material/useMediaQuery");

describe("AdminSideBar Component", () => {
  it("should render all sidebar items and navigate when clicked", () => {
    const { getByTestId, container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <AdminSideBar />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="/accounts"
            element={<div className="AccountsPage">Accounts Page</div>}
          />
          <Route
            path="/Messages/admin"
            element={
              <div className="MessagesAdminPage">Messages Admin Page</div>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    let pageContent = container.querySelector(".AccountsPage");
    expect(pageContent).not.toBeInTheDocument();

    const accountsSidebarItem = getByTestId("Accounts");
    userEvent.click(accountsSidebarItem);

    pageContent = container.querySelector(".AccountsPage");
    expect(pageContent).toBeInTheDocument();

    const messageSidebarItem = getByTestId("Message");
    userEvent.click(messageSidebarItem);

    pageContent = container.querySelector(".MessagesAdminPage");
    expect(pageContent).toBeInTheDocument();
  });
  it("should set drawer width to 0 when between xs and md", () => {
    const useMediaQuery = require("@mui/material/useMediaQuery").default;
    useMediaQuery.mockImplementation(() => true);
    const { container } = render(
      <MemoryRouter>
        <AdminSideBar />
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
        <AdminSideBar />
      </MemoryRouter>
    );
    const drawer = container.querySelector(".MuiDrawer-paper");
    expect(drawer).toHaveStyle("width: 240px");
  });
});
