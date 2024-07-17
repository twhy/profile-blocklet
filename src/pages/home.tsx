import logo from '../assets/blocklet.svg';
import { Profile } from '../components/profile';

function Home() {
  return (
    <div className="container mx-auto mt-16">
      <div className="flex justify-center">
        <a href="https://www.arcblock.io/docs/blocklet-developer/getting-started" target="_blank" rel="noreferrer">
          <img src={logo} alt="Blocklet" />
        </a>
      </div>
      <Profile id="1" />
    </div>
  );
}

export default Home;
