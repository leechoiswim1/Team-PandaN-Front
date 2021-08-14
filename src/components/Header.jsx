import React, { useEffect } from "react";

/* == Library */
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";
import { Container, Col, Row, Button, Dropdown } from "react-bootstrap";

/* == Library - Icon (react-feather) */
// https://feathericons.com/
import { AlignRight } from "react-feather";

/* == Custom - Icon */
import { ReactComponent as IconSearch } from "../styles/images/ico-search.svg";
import { ReactComponent as IconMemberAdd } from "../styles/images/ico-member-add.svg";
import { ReactComponent as IconProfile } from "../styles/images/ico-profile.svg";

/* == Redux - actions */
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../modules/user";

// * == (Header) -------------------- * //

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userActions.__logout());
  };

  useEffect(() => {
    dispatch(userActions.__getUserDetail());
    dispatch(userActions.__setLogin());
  }, []);

  const user = useSelector((state) => state.user);

  return (
    <header className="header" id="header">
      <Container fluid>
        <Row>
          <Col className="d-inline-flex justify-content-end">
            <Dropdown>
              <Dropdown.Toggle variant="success" align="end">
                <IconProfile width="35" height="35" fill="#9A9A9A" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-group">
                <Dropdown.ItemText className="text-center">
                  <IconProfile width="40" height="40" fill="#9A9A9A" className="dropdown-profile" />
                  <p className="dropdown-name">{user.name}</p>
                  <p className="dropdown-email">{user.email}</p>
                </Dropdown.ItemText>
                <Dropdown.Divider style={{ height: "0" }} />
                <Dropdown.ItemText>
                  {/* == 로그아웃 */}
                  <Button variant="primary" size="sm" className="d-block w-100" onClick={logout}>
                    로그아웃
                  </Button>
                </Dropdown.ItemText>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
