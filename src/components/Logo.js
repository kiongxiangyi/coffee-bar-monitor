import React from "react";
import { useContext } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LocaleContext from "../LocaleContext";
import i18n from "../i18n";

function Logo() {
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);

  function changeLocale(l) {
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  }

  return (
    <div className="header">
      <img
        src="https://owncloud.guehring.de/index.php/apps/files_sharing/ajax/publicpreview.php?x=1920&y=478&a=true&file=Guehring-Logo.jpg&t=FMAnHaHgEv74o5f&scalingup=0"
        alt="logo"
      ></img>
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
    </div>
  );
}

export default Logo;
