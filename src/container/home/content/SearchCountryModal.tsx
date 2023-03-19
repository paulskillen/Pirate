import { Modal } from "d-react-components";
import React from "react";

export interface ISearchCountryModalProps {
    open: boolean;
    onClose?: any;
}

const SearchCountryModal: React.FC<ISearchCountryModalProps> = ({
    open,
    onClose,
}) => {
    const renderContent = () => {
        return <div />;
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            showFooter={false}
            showHeader={false}
        >
            {renderContent()}
        </Modal>
    );
};

export default SearchCountryModal;
