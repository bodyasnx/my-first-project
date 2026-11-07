function Header({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <div className="header-row">
          <a className="logo" href="#variants" aria-label="VXE R1 — на початок сторінки">
            VXE <span>R1</span>
          </a>
        </div>
        <nav className="nav-panel is-open" aria-label="Основна навігація">
          <ul className="nav-list">
            <li><a href="#variants">Версії</a></li>
            <li><a href="#footer">Контакти</a></li>
          </ul>
          <button type="button" className="theme-toggle" onClick={onToggleTheme}>
            {theme === 'dark' ? 'Світла тема' : 'Темна тема'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header