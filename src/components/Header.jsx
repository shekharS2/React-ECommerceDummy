import './Header.css';

const Header = (props) => {
  return (
    <div className="header">
        <h1>{props.headerText}</h1>
    </div>
  );
};

export default Header;