import React from 'react';

// Simple test component to verify React is working
const TestRender = () => {
  console.log('🧪 TestRender component is executing');
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'lightblue', 
      border: '2px solid red',
      margin: '20px',
      textAlign: 'center'
    }}>
      <h1>TEST RENDER - React is Working!</h1>
      <p>If you see this, React is rendering correctly.</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default TestRender;
