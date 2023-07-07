import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import {
    ModalProps,
    Button,
    Modal as DModal,
    WrapperComponent,
} from "d-react-components";
import React from "react";
import Icon from "../icon/Icon";

export interface IModalProps extends ModalProps {
    [key: string]: any;
    wrapper?: any;
}

const Modal: React.FC<IModalProps> = ({
    open,
    onClose,
    showFooter,
    children,
    wrapper,
    title,
    ...props
}) => {
    const renderCloseButton = () => {
        return (
            <div
                className="flex justify-end w-fit pirate-mobile-modal__close-icon"
                onClick={onClose}
            >
                <Icon
                    icon="close-outline"
                    useIconSet="carbon"
                    size={24}
                    className="text-gold"
                />
            </div>
        );
    };

    const renderTitle = () => {
        return <div className="h5 text-gold text-center w-full">{title}</div>;
    };

    const renderFooter = () => {
        return (
            <div className="flex-center-y mt-3 w-full justify-evenly">
                <Button
                    size="small"
                    color="dark"
                    className="rounded-full pirate-mobile-modal__cancel-button"
                    onClick={onClose}
                >
                    {Messages.cancel}
                </Button>
                <Button
                    iconName="send"
                    size="small"
                    className="rounded-full pirate-mobile-modal__save-button"
                >
                    <div>{Messages.save}</div>
                </Button>
            </div>
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
            {/*@ts-ignore  */}
            <WrapperComponent
                element={wrapper || <ModalStyled className="test" />}
            >
                {renderCloseButton()}
                {title && renderTitle()}
                {children}
                {showFooter && renderFooter()}
            </WrapperComponent>
        </DModal>
    );
};

export default Modal;

const ModalStyled = styled.div`
    position: relative;
    padding: 16px;
    .pirate-mobile-modal__close-icon {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .pirate-mobile-modal__save-button {
        border: 1px solid var(--color-gold) !important;
    }
`;
