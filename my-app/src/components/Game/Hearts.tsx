import { StarsWrapper } from './styles';

interface GameLifeProps {
  count: number;
}

const emoji = ['🧡', '💔'];

const Hearts = ({ count }: GameLifeProps) => {
  const data = [];
  for (let i = 0; i < 5; i++) {
    const idx = i < count ? 0 : 1;
    data.push(emoji[idx]);
  }

  return (
    <>
      <StarsWrapper sx={{ filter: 'hue-rotate(225deg)' }}>
        {data.map((item, idx) => (
          <div style={{ fontSize: '2rem' }} key={idx}>
            {item}
          </div>
        ))}
      </StarsWrapper>
    </>
  );
};

export default Hearts;
