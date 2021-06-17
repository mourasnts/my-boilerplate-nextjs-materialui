import React from 'react';

import WithAuthBase from '../../components/layout/withAuthBase';
import withAuth from '../../components/auth/withAuth';

import { Title } from '../../styles/pages/Home';

const MainDashboard: React.FC = () => {
  return (
    <WithAuthBase>
      <Title>Dashboard Principal</Title>
    </WithAuthBase>
  );
};

export default withAuth(MainDashboard);
