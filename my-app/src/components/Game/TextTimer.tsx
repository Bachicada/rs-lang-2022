import { Typography } from '@mui/material';

type Props = {
  seconds: number;
};

const TextTimer = ({ seconds }: Props) => {
  return <Typography>{seconds}с</Typography>;
};

export default TextTimer;
