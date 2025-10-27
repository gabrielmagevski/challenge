import Minicart from '../../Molecules/Minicart/Minicart';

const Header = () => {

  return (
    <header>
      <nav className="header-navbar">
        <img className="logo" src="../../img/logo.svg" title='Logo Cadastra' alt="Logo Cadastra" width={165} height={25} />
        <Minicart />
      </nav>
    </header>
  )
}

export default Header;