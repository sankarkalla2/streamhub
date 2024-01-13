import Actions from "./actions";
import Logo from "./logo";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 bg-[#252731] px-4 lg:px-4 flex items-center gap-x-4 justify-between">
      <Logo />
      <Actions />
    </nav>
  );
};

export default Navbar;
