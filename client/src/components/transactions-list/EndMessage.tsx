// src/components/transactions-list/EndMessage.tsx

import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-top: 20px;
`;

const EndMessage: React.FC = () => <Message>No more data to load</Message>;

export default EndMessage;
