export interface DeleteAccountPopupProps {
    show: boolean;
    onHide: () => void;
    onDeleteAccount: (password: string) => Promise<boolean>;
}