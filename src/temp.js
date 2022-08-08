import { FadeLoader } from 'react-spinners';
import { Loading, ReactSpinner } from './loading';
import './temp.css';

export default function Temp() {
  return (
    <div>
      <Loading />
      <ReactSpinner icon={<FadeLoader />} />
    </div>
  );
}
