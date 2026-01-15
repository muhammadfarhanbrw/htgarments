import Slides from './components/slides';
import Shop from './shop/page';
import Services from './services/page';
import About from './about/page';
export default function Home() {
  return (
  <div>
    <Slides/>

<Shop/>
<Services/>
<About/>
  </div>
  );
}
