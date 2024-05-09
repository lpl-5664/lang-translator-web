import React from 'react';

const Header = () => {
  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start'
  };

  const imgStyle = {
    height: '40px',
    marginRight: '10px',
    marginLeft: '10px'
  }

  return (
    <header style={headerStyle}>
        <img src={`${process.env.PUBLIC_URL}/logo50.png`} alt="Logo" style={imgStyle} />
        <h2>My Translator</h2>
    </header>
  )
}

export default Header