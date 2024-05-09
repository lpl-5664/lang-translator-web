import React from 'react'
import DropDown from 'react-bootstrap/Dropdown';

const LanguageOption = ({ id, name, code, setSelectedLang }) => {
  return (
    <DropDown.Item eventKey={id} onClick={() => setSelectedLang(code)}>
        {name}
    </DropDown.Item>
  )
}

export default LanguageOption