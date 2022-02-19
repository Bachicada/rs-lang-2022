interface SprintStarsProps {
  count: number;
}

const SprintStars = (props: SprintStarsProps) => {
  const starsArr = [];
  for (let i = 0; i <= props.count; i++) {
    starsArr.push('*');
  }
  return (
    <p>
      {starsArr}
    </p>
  )
}

export default SprintStars