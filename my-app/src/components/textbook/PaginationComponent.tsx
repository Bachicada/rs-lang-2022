import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useNavigate } from 'react-router';
import { APP_ROUTES } from '../../utils/Constants';

type Props = {
  page: string;
  part: string;
};

const PaginationComponent = ({ page, part }: Props) => {
  const navigate = useNavigate();

  return (
    <Stack spacing={2}>
      <Pagination
        boundaryCount={4}
        siblingCount={2}
        page={parseInt(page ?? 1, 10)}
        count={30}
        variant="outlined"
        shape="rounded"
        onChange={(event: React.ChangeEvent<unknown>, value: number) => {
          navigate(`${APP_ROUTES.TEXTBOOK}/${part}/${value}`);
        }}
      />
    </Stack>
  );
};

export default PaginationComponent;
