import Header from '../components/header/Header';
import '../style/Call.css';
import CallView from '../components/call/CallView';

export default function Call() {

  return (
    <div>
      <Header />
      <h1>Appelez quelqu'un </h1>
      <br />
      <CallView />
    </div>
  );
}
