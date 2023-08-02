import "./index.css";
import Dropdown from "./Components/DropDown";
import Sidemenu from "./Components/Sidemenu";
import Maintitle from "./Components/Maintitle";
import Uploading from "./Components/Uploading";
import Goftar from "./Components/Goftar";
import Maindescription from "./Components/Maindescription";

function App() {
  return (
    <>
      <header>
        <Maintitle></Maintitle>
        <Maindescription></Maindescription>
        <Dropdown></Dropdown>
      </header>

      <nav className="relative">
        <Sidemenu></Sidemenu>
      </nav>

      <main>
        <article>
          <Goftar></Goftar>
        </article>
        <article>
          <Uploading></Uploading>
        </article>
      </main>
    </>
  );
}

export default App;
