export interface DeleteAccountPopupProps extends DeleteAccountPopupChildProps {
    show: boolean;
}

export interface DeleteAccountPopupChildProps {
    onHide: () => void
    onDeleteAccount: () => Promise<boolean>;
}