import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from "@testing-library/react";
import DeleteAccountPopup from "../../DeleteAccountPopup/DeleteAccountPopup";
import { useAuth } from '@/contexts/AuthContext';

jest.mock('contexts/AuthContext', () => ({
    useAuth() {
        return {
            currentUser: {},
            authUser: {
                providerData: [{ providerId: "google.com" }],  // account is email/password
            },
            reauthenticateEmail: jest.fn(), //(email:"test@test.com", password:"testpw") => {return true}
            reauthenticateOAuth: jest.fn()  // used for credential update test
        }
    }
}));



const intersectionObserverMock = () => ({
    observe: () => null,
    disconnect: () => jest.fn()
})

window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

it("renders oauth delete account popup given an oauth user (oauth)", async () => {
    const { findByTestId } = render(
        <DeleteAccountPopup show={true} onHide={jest.fn()} onDeleteAccount={jest.fn().mockResolvedValue(jest.fn())} />
    );
    const oAuthPopup = await findByTestId("delete-acc-oauth");
    expect(oAuthPopup).toBeInTheDocument();
});

// WIP
// it("deletes account given correct password", async () => {
//     const onDel = jest.fn().mockResolvedValue(true);
//     const { findByTestId } = render(
//         <DeleteAccountPopup show={true} onHide={jest.fn()} onDeleteAccount={onDel} />
//     );
//     const deleteButton = await findByTestId("del-acc-oauth");
//     fireEvent.click(deleteButton);
//     await waitFor(() => expect(onDel).toBeCalledTimes(1));
// });

it("closes the modal on close (oauth)", async () => {
    const onHide = jest.fn();

    const { findByTestId } = render(
        <DeleteAccountPopup show={true} onHide={onHide} onDeleteAccount={jest.fn()} />
    );

    const closeButton = await findByTestId("close-popup-oauth");
    fireEvent.click(closeButton);
    await waitFor(() => expect(onHide).toBeCalledTimes(1));
});

// throws 'TypeError: loginWithGoogle is not a function'
// it("updates credentials on click (oauth)", async () => {
//     const onHide = jest.fn();


//     const { findByTestId } = render(
//         <DeleteAccountPopup show={true} onHide={onHide} onDeleteAccount={jest.fn()} />
//     );

    
//     const updateButton = await findByTestId("update-credentials-oauth");
//     fireEvent.click(updateButton);
//     await waitFor(() => expect(jest.fn()).toBeCalledTimes(1));
// });