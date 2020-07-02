import { Button } from 'antd';
import { useEffect } from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span.attrs({
  className: 'mx-4 text-red-600',
})``;

const Example = ({ count, addCount, minusCount, fetchCount }) => {
  useEffect(() => {
    fetchCount();
  }, []);
  return (
    <div className="p-4">
      <Button onClick={minusCount}>-</Button>
      <StyledSpan>{count}</StyledSpan>
      <Button onClick={addCount}>+</Button>
    </div>
  );
};

export default Example;
