import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationModal from "../../../components/Modals/ConfirmationModal";

describe("ConfirmationModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    render(
      <ConfirmationModal
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );
  });

  it("show the correct content", () => {
    const titleElement = screen.getByText(
      /Click confirm to start the procedure/i
    );
    const patientElement = screen.getByText(/Patient: john doe/i);
    const procedureElement = screen.getByText(/Procedure: MRI/i);

    expect(titleElement).toBeInTheDocument();
    expect(patientElement).toBeInTheDocument();
    expect(procedureElement).toBeInTheDocument();
  });

  it("onConfirm called correctly", () => {
    const confirmButton = screen.getByTestId(/confirm/i);
    fireEvent.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it("onClose are called correctly", () => {
    const cancelButton = screen.getByTestId(/cancel/i);
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
