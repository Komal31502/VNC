import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../context/AuthContext";

const Sidebar = ({ children }) => {
  const {setUserDetails,user}=useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItemBottom = [
    {
      path: "/",
      name: "VNC Academy",
      icon: "/images/wrapper181.svg",
    },
    {
      path: "/about",
      name: "Collabarate",
      icon: "/images/wrapper191.svg",
    }
    
  ];
  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: "/images/wrapper18.svg",
    },
    {
      path: "/scorecards",
      name: "Scorecards",
      icon: "/images/wrapper6.svg",
    },
    {
      path: "/analytics",
      name: "Dashboards",
      icon: "/images/wrapper141.svg",
    },
    {
      path: "/comment",
      name: "Integrations",
      icon: "/images/wrapper22.svg",
    },
    {
      path: "/product",
      name: "Connect Metrics",
      icon: "/images/wrapper151.svg",
    }
  ];
  const logout=()=>{
    sessionStorage.removeItem("vncuser");
    setUserDetails(user);
  }
  return (
    <div className="home">
      <div className="side-nav1" style={{ width: isOpen ? "260px" : "96px" }}>
        <div className="logo-wrapper2">
          <img className="logo-icon2" alt="" src="/images/logo.svg" />

          <div className="header-logo2">
            <div
              className="name2"
              style={{ display: isOpen ? "block" : "none" }}
            >
              <b className="vnc-designer2">VNC Designer</b>
            </div>
          </div>
          <div
            onClick={toggle}
            style={{ display: isOpen ? "none" : "block", cursor: "pointer" }}
          >
            <div className="icon">
              <img
                style={{ width: "22px", height: "22px" }}
                alt=""
                src="/images/button.svg"
              />
            </div>
          </div>
          <div
            className="icon32"
            onClick={toggle}
            style={{ display: isOpen ? "block" : "none", cursor: "pointer" }}
          >
            <img className="wrapper-icon44" alt="" src="/images/wrapper2.svg" />
          </div>
        </div>
        <div className="nav2">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="vertical-nav-item16"
              activeclassname="active"
            >
              <div className="wrapper20">
                <div className="icon33">
                  <img className="wrapper-icon44" alt="" src={item.icon} />
                </div>
                <div className="text91">
                  <div
                    className="text92"
                    style={{ display: isOpen ? "block" : "none" }}
                  >
                    {item.name}
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
        <div className="bottom2">
          <div
            className="nav-featured-card"
            style={{ display: isOpen ? "none" : "flex" }}
          >
            <div className="icon">
              <img className="wrapper-icon1" alt="" src="/images/wrapper.svg" />
            </div>
          </div>
          <div
            className="nav-featured-card3"
            style={{ display: isOpen ? "flex" : "none" }}
          >
            <div className="nav-featured-card4">
              <div className="icon33">
                <img
                  className="wrapper-icon44"
                  alt=""
                  src="/images/wrapper.svg"
                />
              </div>
            </div>
            <div className="text-and-supporting-text29">
              <b className="text103">Upgrade to Pro</b>
              <div className="supporting-text22">
                Get 1 month free and unlock Pro features
              </div>
            </div>
            <div className="button13">
              <div className="arrow17">
                <div className="width-change-size-here45">
                  <div className="ignore144"></div>
                  <div className="ignore144"></div>
                </div>
                <div className="icon-wrapper-h33">
                  <div className="height-change-size-here39">
                    <div className="ignore144"></div>
                    <div className="ignore144"></div>
                  </div>
                  <img
                    className="icon-wrapper54"
                    alt=""
                    src="/images/iconwrapper3.svg"
                  />
                </div>
              </div>
              <div className="text104">
                <div className="text105">Upgrade plan</div>
              </div>
              <div className="arrow17">
                <div className="width-change-size-here45">
                  <div className="ignore144"></div>
                  <div className="ignore144"></div>
                </div>
                <div className="icon-wrapper-h33">
                  <div className="height-change-size-here39">
                    <div className="ignore144"></div>
                    <div className="ignore144"></div>
                  </div>
                  <img
                    className="icon-wrapper54"
                    alt=""
                    src="/images/iconwrapper4.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="vertical-nav-item-container">
            {menuItemBottom.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="vertical-nav-item16"
                activeclassname="active"
              >
                <div className="wrapper20">
                  <div className="icon33">
                    <img className="wrapper-icon44" alt="" src={item.icon} />
                  </div>
                  <div className="text91">
                    <div
                      className="text92"
                      style={{ display: isOpen ? "block" : "none" }}
                    >
                      {item.name}
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
            
            <NavLink className="vertical-nav-item16"  to={'/login'} activeclassname="active" onClick={()=> logout()}>
            <div className="wrapper20">
            <div className="icon33">
               <LogoutIcon />
            </div>
            <div className="text91">
              <div
                className="text92"
                style={{ display: isOpen ? "block" : "none" }}
              >
              Logout
              </div>
            </div>
          </div>
            </NavLink>
          </div>
          <div className="account2">
            <div className="wrapper20">
              <img
                className="avatar-icon2"
                alt=""
                src="/images/auth/Avatar.svg"
              />
              <div
                className="text-and-supporting-text30"
                style={{ display: isOpen ? "block" : "none" }}
              >
                <div className="text110">Olivia Rhye</div>
                <div className="supporting-text23">olivia@untitledui.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main
        style={{ marginLeft: isOpen ? "260px" : "96px",width:isOpen?"calc(100% - 260px)":"calc(100% - 96px)"}}
      >
  
        {children}
      
      </main>
    </div>
  );
};

export default Sidebar;
