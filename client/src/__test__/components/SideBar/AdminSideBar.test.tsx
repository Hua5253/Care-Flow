import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
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

  it("should apply correct styles based on location pathname", () => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { pathname: "/accounts" },
    });

    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/accounts"]}>
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

    const accountsSidebarItem = getByTestId("Accounts");
    expect(accountsSidebarItem).toHaveStyle({ backgroundColor: "#cfe8fc" });
    fireEvent.mouseEnter(accountsSidebarItem);
    expect(accountsSidebarItem).toHaveStyle({ backgroundColor: "#cfe8fc" });
    expect(accountsSidebarItem).toHaveStyle({
      borderRight: "5px solid #2196f3",
    });

    const messageSidebarItem = getByTestId("Message");
    expect(messageSidebarItem).toHaveStyle({ backgroundColor: "inherit" });
    expect(messageSidebarItem).toHaveStyle({
      borderRight: "none",
    });
  });
});
