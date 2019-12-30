import React from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

const ModalComponent = ({header, body, onClose, footer, size}) => {

    const closeBtn = <button className="close" onClick={onClose}>&times;</button>;

    return <div>
        <div>
            <Modal isOpen={true} toggle={onClose} size={size ? size : 'lg'}>
                <ModalHeader close={closeBtn} toggle={onClose}> {header}</ModalHeader>
                <ModalBody>
                    {body}
                </ModalBody>
                {footer && <ModalFooter>
                    {footer}
                </ModalFooter>}
            </Modal>
        </div>
    </div>

};

export default ModalComponent;