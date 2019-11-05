/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = (props) => {
  
    /* Uses the following props:
       modalTitle  : Header Text
       buttonLabel : Text to shown in button
       className   : Class For the Modal
       toggle      : references a function to toggle state
       modalState  : Open/Close state
       props.children : Dialog Body Contents
    */

    const {
    buttonLabel,
    className
  } = props;

  
  return (
    <div>
      <Modal isOpen={props.modalState} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>{props.modalTitle}</ModalHeader>
        <ModalBody>
          {props.children}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>{props.buttonLabel}</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;
