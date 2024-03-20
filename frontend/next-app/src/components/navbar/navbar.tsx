import { NavLink } from './navlink';

import AccountIcon from '../../../public/icons/account_icon';
//import AccountIcon from '../../../public/icons/account_icon.svg';
import HistoryIcon from '../../../public/icons/history_icon';
import HomeIcon from '../../../public/icons/home_icon';
import RecommendationsIcon from '../../../public/icons/recommendations_icon';

export default function Navbar() {
    return (
        <nav>
            <h2 className="desktop">BookScanner</h2>
            <ul>
                <li>
                    <NavLink href="/main/home" exact>
                        <div className="desktop">Home</div>
                        <div className="mobile">
                            <HomeIcon />
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/main/search_history" exact>
                        <div className="desktop">History</div>
                        <div className="mobile">
                            <HistoryIcon />
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/main/recommendations" exact>
                        <div className="desktop">Recommendations</div>
                        <div className="mobile">
                            <RecommendationsIcon />
                        </div>
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink href="/main/bookmarks" exact>
                        <div className="desktop">Bookmarks</div>
                        <div className="mobile">
                            <BookmarksIcon />
                        </div>
                    </NavLink>
                </li> */}
                
                <li>
                    <NavLink href="/main/account" exact>
                        <div className="desktop">Account</div>
                        <div className="mobile">
                            <AccountIcon />
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
