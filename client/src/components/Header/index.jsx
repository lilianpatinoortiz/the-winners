import { BadgeAvatar } from "../StyledBadge";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

function Header() {
  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  return (
    <header className="MuiPaper-root MuiPaper-elevation MuiPaper-elevation4 MuiAppBar-root MuiAppBar-colorPrimary MuiAppBar-positionAbsolute css-im4i5j">
      <div className="MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular css-xgqgls">
        <button
          className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-edgeStart MuiIconButton-sizeMedium css-179x4hi"
          tabIndex="0"
          type="button"
          aria-label="open drawer"
        >
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="MenuIcon"
          >
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>
          <span className="MuiTouchRipple-root css-w0pj6f"></span>
        </button>
        <h1 className="MuiTypography-root MuiTypography-h6 MuiTypography-noWrap css-11shd7s">
          Task Guru 2.0
        </h1>
        <BadgeAvatar name={user.name}></BadgeAvatar>
      </div>
    </header>
  );
}

export { Header };
