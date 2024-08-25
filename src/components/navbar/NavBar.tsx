import { Button, Nav, Navbar } from "react-bootstrap";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useEffect, useState } from "react";
import style from "./navbar.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

export function NavBar() {
  const windowWidth = useWindowWidth();

  const navBarText = "text-light hover:text-danger";

  const [isOnTop, setIsOnTop] = useState<boolean>(true);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    const navbarBackground = () => {
      if (window.scrollY === 0) {
        setIsOnTop(true);
      } else {
        setIsOnTop(false);
      }
    };

    window.addEventListener("scroll", navbarBackground);

    return () => {
      window.removeEventListener("scroll", navbarBackground);
    };
  }, []);

  const menuHandler = () => {
    if (openMenu) {
      setOpenMenu(false);
    } else if (!openMenu) {
      setOpenMenu(true);
    }
  };

  return (
    <>
      <Navbar
        className={` lg:h-[6.25rem] fixed w-[100%] z-[1000] justify-between ${
          isOnTop ? style.active : style.navbar
        }`}
      >
        <Navbar.Brand>
          <Link to="/">
            <img className="h-14 ml-4 md:ml-10" src={logo} alt="logo" />
          </Link>
        </Navbar.Brand>
        <Nav className="gap-4 text-xl w-auto">
          {windowWidth > 1000 ? (
            <>
              <Nav.Link as={Link} to="story" className={navBarText}>
                Story
              </Nav.Link>
              <Nav.Link as={Link} to="quiz" className={`${navBarText} mr-6`}>
                Quiz
              </Nav.Link>
              <Button className="mr-20 w-36 text-lg" variant="danger">
                <a href="mailto:jakub.z.roman@gmail.com">Contact Me</a>
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={menuHandler}
                className="mr-6 text-4xl rounded-full"
                variant="danger"
              >
                <HiBars3BottomRight />
              </Button>
              <div
                className={`${
                  openMenu ? style.activeMenu : style.menu
                } absolute w-full top-0 left-0 flex justify-end bg-[#13131c] h-24`}
              >
                <div className=" flex items-center justify-end w-full text-2xl">
                  <Nav.Link
                    as={Link}
                    to="story"
                    className={`${navBarText} mr-8`}
                  >
                    Story
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="quiz"
                    className={`${navBarText} mr-8`}
                  >
                    Quiz
                  </Nav.Link>
                  <Button
                    onClick={menuHandler}
                    className="mr-6 text-4xl bg-transparent border-none"
                    variant="danger"
                  >
                    <RxCross2 />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
}