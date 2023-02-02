import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from "@testing-library/react";
import DeleteAccountPopup from "../../DeleteAccountPopup/DeleteAccountPopup";

jest.mock('contexts/AuthContext', () => ({ 
    useAuth() {
        return {
            currentUser: {},
            authUser: {
                providerData: [{providerId: "google.com"}],  // account is email/password
            },
            reauthenticateEmail: jest.fn() //(email:"test@test.com", password:"testpw") => {return true}
        }
    } 
}));


it("renders oauth delete account popup given an oauth user", async () => {
    const { findByTestId } = render(
        <DeleteAccountPopup show={true} onHide={jest.fn()} onDeleteAccount={jest.fn().mockResolvedValue(jest.fn())} />
      );
      const oAuthPopup = await findByTestId("delete-acc-oauth");
      expect(oAuthPopup).toBeInTheDocument();
});