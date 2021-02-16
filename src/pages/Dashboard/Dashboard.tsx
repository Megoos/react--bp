import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Link to="/login">To Login page</Link>
      Dashboard
    </div>
  );
};

export default Dashboard;
