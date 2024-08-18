import Button from "./components/button";
import Input from "./components/input";

export default function Home() {
  return (
    <main>
      <div>
        <div>
          <Input labelFor="searchInput" labelText="Search" />
          <Button type="button">Search</Button>
        </div>
      </div>
    </main>
  );
}
