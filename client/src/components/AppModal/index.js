/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Modal } from 'reactstrap';

const AppModal = (props) => {
  
    /* Uses the following props:
       className   : Class For the Modal
       toggle      : references a function to toggle state
       modalState  : Open/Close state
       props.children : Modal Contents
    */
  
  return (
    <div>
      <Modal isOpen={props.modalState} 
             toggle={props.toggle} 
             className={props.className}
             backdrop={props.backdrop}
             keyboard={props.keyboard}>
          {props.children}
      </Modal>
    </div>
  );
}

export default AppModal;
