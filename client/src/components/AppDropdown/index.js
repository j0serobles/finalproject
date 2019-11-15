import React, { useState } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './style.css';

const AppDropdown = (props) => {

    const [dropdownOpen, setDropdownOpen]   = useState(false);
    const [unitOfMeasure, setUnitOfMeasure] = useState("lbs")
  
    const toggle = () => setDropdownOpen(prevState => !prevState);
  
    const listItems =  props.items.map( (listItemString, index) =>  <DropdownItem key={index} onClick={(e) => onDropDownClick(listItemString) }>{ listItemString }</DropdownItem>);

    
    const onDropDownClick = (listItemString) => {
      setUnitOfMeasure(listItemString);
      props.parentCallback(listItemString); 
    }

    return (

      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} >
        <Button id="caret">{unitOfMeasure}</Button>
        <DropdownToggle caret >   </DropdownToggle>
        <DropdownMenu>
          {listItems}   
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
  
  export default AppDropdown;