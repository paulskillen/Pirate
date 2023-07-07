import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { ModalProps, Button, Modal as DModal } from "d-react-components";
import React from "react";

export interface IModalProps extends ModalProps {
    [key: string]: any;
}

const Modal: React.FC<IModalProps> = ({
    open,
    onClose,
    showFooter,
    children,
    ...props
}) => {
    const renderFooter = () => {
        return (
            <FooterStyled className="flex-center-y mt-3 w-full justify-evenly">
                <Button size="small" color="dark" className="rounded-full pirate-mobile-modal__cancel-button" onClick={onClose}>
                    {Messages.cancel}
                </Button>
                <Button
                    size="small"
                    className="rounded-full pirate-mobile-modal__save-button"
                >
                    {Messages.save}
                </Button>
            </FooterStyled>
        );
    };

    return (
        <DModal
            closable={false}
            maskClosable={false}
            bodyStyle={{
                backgroundColor: "black",
            }}
            className="bg-black pirate-mobile-modal"
            classNameContent="bg-black border border-gold rounded-2xl"
            {...props}
            open={open}
            onClose={onClose}
            showFooter={false}
            showHeader={false}
        >
            {children}
            {showFooter && renderFooter()}
        </DModal>
    );
};

export default Modal;

const FooterStyled = styled.div`
    .pirate-mobile-modal__save-button {
        border: 1px solid var(--color-gold) !important;
    }
`;
