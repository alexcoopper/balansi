// src/components/transactions-list/LoadingMessage.tsx

import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-top: 20px;
`;

const LoadingMessage: React.FC = () => <Message>Loading...</Message>;

export default LoadingMessage;
