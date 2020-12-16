import "./App.css";
function App() {
    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
                <a className='navbar-brand' href='/'>
                    Navbar
                </a>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarColor01'
                    aria-controls='navbarColor01'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse' id='navbarColor01'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item active'>
                            <a className='nav-link' href='/'>
                                Home
                                <span className='sr-only'>(current)</span>
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/'>
                                Features
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/'>
                                Pricing
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/'>
                                About
                            </a>
                        </li>
                        <li className='nav-item dropdown'>
                            <a
                                className='nav-link dropdown-toggle'
                                data-toggle='dropdown'
                                href='/'
                                role='button'
                                aria-haspopup='true'
                                aria-expanded='false'>
                                Dropdown
                            </a>
                            <div className='dropdown-menu'>
                                <a className='dropdown-item' href='/'>
                                    Action
                                </a>
                                <a className='dropdown-item' href='/'>
                                    Another action
                                </a>
                                <a className='dropdown-item' href='/'>
                                    Something else here
                                </a>
                                <div className='dropdown-divider'></div>
                                <a className='dropdown-item' href='/'>
                                    Separated link
                                </a>
                            </div>
                        </li>
                    </ul>
                    <form className='form-inline my-2 my-lg-0'>
                        <input
                            className='form-control mr-sm-2'
                            type='text'
                            placeholder='Search'
                        />
                        <button
                            className='btn btn-secondary my-2 my-sm-0'
                            type='submit'>
                            Search
                        </button>
                    </form>
                </div>
            </nav>
            {/* <div className='custom-shape-divider-bottom-1608063174'>
                <svg
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 1200 120'
                    preserveAspectRatio='none'>
                    <path
                        d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z'
                        className='shape-fill'></path>
                </svg>
            </div> */}
            <div className='jumbotron'>
                <h1 className='display-3'>Hello, world!</h1>
                <p className='lead'>
                    This is a simple hero unit, a simple jumbotron-style
                    component for calling extra attention to featured content or
                    information.
                </p>
                <hr className='my-4' />
                <p>
                    It uses utility classes for typography and spacing to space
                    content out within the larger container. sd
                </p>
                <p className='lead'>
                    <a
                        className='btn btn-primary btn-lg'
                        href='/'
                        role='button'>
                        Learn more
                    </a>
                </p>
            </div>
        </div>
    );
}

export default App;
