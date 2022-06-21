/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { AiFillCaretDown } from 'react-icons/ai';
import './temp.css';

export default function Temp() {
  const showSubMenu = () => {
    document.getElementById('subMenuHolder').style.display = 'block';
  };
  return (
    <div>
      <AiFillCaretDown className="down" size="1rem" />
      <div className="triangle" onClick={showSubMenu} />
    </div>
  );
}
