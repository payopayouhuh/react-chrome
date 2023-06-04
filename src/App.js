import './App.css';
import  ChromeHistoryAnalysis from './ChromeHistoryAnalysis.jsx';

function App() {
  return (
    <div className='App'>
      <ChromeHistoryAnalysis />

    </div>
  );
}

export default App;


/* App.js
import './App.css';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import  ChromeHistoryAnalysis from './ChromeHistoryAnalysis.jsx';

function App() {
  const [category, setCategory] = useState('');

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  /*
    const response = await fetch('http://localhost:8000/api/category/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ category })
    });

    if (response.ok) {
      // response handling logic
    }
  */
 /*
    console.log(category);
  };

  

  return (
    <div className="App">
      <ChromeHistoryAnalysis />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>カテゴリー</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="カテゴリーを入力してください" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          送信
        </Button>
      </Form>
    </div>
  );
}

export default App;

*/