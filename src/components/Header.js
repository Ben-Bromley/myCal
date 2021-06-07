import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
	return (
		<nav id="navigation">
			<div id="nav-header-container">
				<FontAwesomeIcon 
				icon={faCalendarAlt} 
				id="calendar-icon"
				/>
				<h1>myCal</h1>
			</div>
			<div>
				<ul id="nav-list">
					<li>Home</li>
					<li>Calendar</li>
					<li>About</li>
				</ul>
			</div>
		</nav>
	)
}

export default Header;

// function Welcome(props) {  return <h1>Hello, {props.name}</h1>;
// }

// const element = <Welcome name="Sara" />;ReactDOM.render(
//   element,
//   document.getElementById('root')
// );

