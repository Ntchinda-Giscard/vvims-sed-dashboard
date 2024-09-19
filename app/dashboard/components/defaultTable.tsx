import React from 'react';
import { Stack, Skeleton } from '@mantine/core';

const FullWidthSkeletonStack = ({ count = 7 }) => {
  return (
    <Stack>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} height={30} width="100%" />
        ))}
    </Stack>
  );
};

export default FullWidthSkeletonStack;