interface GameLifeProps {
  count: number;
}

const emoji = ['🧡', '💔'];

const GameLife = ({ count }: GameLifeProps) => {
  const data = [];
  for (let i = 0; i < 5; i++) {
    const idx = i < count ? 0 : 1;
    data.push(emoji[idx]);
  }

  return (
    <>
      {data.map((item, idx) => (
        <div style={{ fontSize: '2rem' }} key={idx}>
          {item}
        </div>
      ))}
    </>
  );
};

export default GameLife;
