const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold">
          <a href="/">Home</a>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/register" className="hover:text-gray-300">
                Register
              </a>
            </li>
            <li>
              <a href="/checkout" className="hover:text-gray-300">
                Checkout
              </a>
            </li>
            <li>
              <a href="/past-orders" className="hover:text-gray-300">
                Past Orders
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-gray-300">
                Log In
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-gray-300">
                Cart
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
