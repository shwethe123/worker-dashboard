import React from 'react';
import PermitCard from './PermitCard';

const worker = {
  id: 'W12345',
  name: 'John Doe',
  phone: '123-456-7890',
  date1: '2025-03-10',
  date2: '2025-03-20',
  approverName: 'Jane Smith',
};

function App() {
  return (
    <div className="p-6">
      <PermitCard worker={worker} />
    </div>
  );
}

export default App;
