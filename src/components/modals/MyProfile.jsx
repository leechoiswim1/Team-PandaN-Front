import { React, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as userActions } from "../../modules/user";
import { ReactComponent as IconProfile } from "../../styles/images/ico-profile.svg";
const MyProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.__setUser());
  }, []);
  const user = useSelector((state) => state.user.user[0]);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" align="end">
          <IconProfile width="25" height="25" fill="#ffffff" />
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-group">
          <Dropdown.ItemText className="text-center">
            <IconProfile width="40" height="40" fill="#ffffff" className="dropdown-profile" />
            {/* <p className="dropdown-name">{user.name}</p> */}
            {/* <p className="dropdown-email">{user.email}</p> */}
          </Dropdown.ItemText>
          <Dropdown.Divider style={{ height: "0" }} />
          <Dropdown.ItemText>
            {/* == 로그아웃 */}
            <Button variant="primary" size="sm" className="d-block w-100">
              로그아웃
            </Button>
          </Dropdown.ItemText>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default MyProfile;
