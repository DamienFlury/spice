import Link from "next/link";

const AppBar: React.FC = () => (
  <div className="bg-primary text-white sticky top-0 p-4 flex">
    <Link href="/">
      <a className="mx-4">Home</a>
    </Link>
    <Link href="/recipes">
      <a className="mr-4">Recipes</a>
    </Link>
    <Link href="/ingredients">
      <a className="mr-4">Ingredients</a>
    </Link>
  </div>
)

export default AppBar;