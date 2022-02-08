import React from 'react';



const PopupLevel = () => {
  return (
  <div style={{ minHeight: 'calc(100vh - 64px - 25px - 48px)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
    <div style={{ width: '500px', height: '350px', background: 'yellow'}}> 
      <p>Выберите уровень</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </div>
  </div>
  );
};

export default PopupLevel;
