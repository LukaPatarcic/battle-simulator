import React, { FC } from 'react';
import Header from '@element/Header/Header';

const Default: FC = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

export default Default;
