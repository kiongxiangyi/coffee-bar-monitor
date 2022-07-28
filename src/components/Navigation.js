import { useContext } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LocaleContext from "../LocaleContext";
import i18n from "../i18n";

function Navigation() {
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);

  function changeLocale(l) {
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  }

  return (
    <Navbar className="nav-right">
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto ">
          <NavDropdown title={t("language")} id="basic-nav-dropdown">
            <NavDropdown.Item href="#" onClick={() => changeLocale("de")}>
              DE
            </NavDropdown.Item>
            <NavDropdown.Item href="#" onClick={() => changeLocale("en")}>
              EN
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
