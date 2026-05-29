import Navbar from "@modules/shared/component/Navbar.tsx";
import FieldText from "@modules/shared/component/FieldText.tsx";
function Home() {
  return (
    <div className="container">
      <section className="center">
        <div className="bg-red-500">
          <div>
            <h1>Welcome to My App</h1>
          </div>
        </div>
      </section>
      <footer>
        <p>&copy; 2025 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
