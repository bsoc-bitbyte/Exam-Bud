import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import dropdown from "../../assets/home/dropdown.svg";
import dropdownArrow from "../../assets/home/dropdownArrow.svg";
import "./Home.css";

export default function Home() {
  const [sem, setSem] = useState(1);
  const [branch, setBranch] = useState("CSE");
  const [semDropdown, setSemDropdown] = useState(false);
  const [branchDropdown, setBranchDropdown] = useState(false);

  const [branches, setBranches] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/branches")
      .then((r) => r.json())
      .then((res) => setBranches(res.data));
  }, []);

  return (
    <div className="main">
      <div className="heading">
        <h1>Welcome Parth!</h1>
        <p className="sub-heading">
          Select your <br />
          Semester and Branch.
        </p>
      </div>
      <div className="controls">
        <div className="controls__semester">
          <div className="button">
            <p className="button__content">Semester</p>
            <div
              className="drop-arrow"
              onClick={() => {
                setSemDropdown(!semDropdown);
              }}
            >
              <img
                src={dropdown}
                alt="show dropdown"
                className={`arrow ${semDropdown ? "active" : ""}`}
              />
            </div>
          </div>
          <div className={`dropdown--semester ${semDropdown ? "" : "hide"}`}>
            <div className="arrowhead">
              <img src={dropdownArrow} alt="arrowhead" />
            </div>
            <div className="sem-list__container">
              <ul className="sem-list">
                <li
                  className="sem-list__item"
                  id="1"
                  onClick={() => {
                    setSem(1);
                    setSemDropdown(!semDropdown);
                  }}
                >
                  <p>1</p>
                </li>
                <li
                  className="sem-list__item"
                  id="2"
                  onClick={() => {
                    setSem(2);
                    setSemDropdown(!semDropdown);
                  }}
                >
                  <p>3</p>
                </li>
                <li
                  className="sem-list__item"
                  id="3"
                  onClick={() => {
                    setSem(3);
                    setSemDropdown(!semDropdown);
                  }}
                >
                  <p>3</p>
                </li>
                <li
                  className="sem-list__item"
                  id="4"
                  onClick={() => {
                    setSem(4);
                    setSemDropdown(!semDropdown);
                  }}
                >
                  <p>4</p>
                </li>
                <li
                  className="sem-list__item"
                  id="5"
                  onClick={() => {
                    setSem(5);
                    setSemDropdown(!semDropdown);
                  }}
                >
                  <p>5</p>
                </li>
                <li
                  className="sem-list__item"
                  id="6"
                  onClick={() => {
                    setSem(6);
                    setSemDropdown(!semDropdown);
                  }}
                >
                  <p>6</p>
                </li>
                <li
                  className="sem-list__item"
                  id="7"
                  onClick={() => {
                    setSem(7);
                    setSemDropdown(!semDropdown);
                  }}
                >
                  <p>7</p>
                </li>
                <li
                  className="sem-list__item"
                  id="8"
                  onClick={() => {
                    setSem(8);
                    setSemDropdown(!semDropdown);
                  }}
                >
                  <p>8</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="controls__branch">
          <div className="button">
            <p className="button__content">Branch</p>
            <div
              className="drop-arrow"
              onClick={() => {
                setBranchDropdown(!branchDropdown);
              }}
            >
              <img
                src={dropdown}
                alt="show dropdown"
                className={`arrow ${branchDropdown ? "active" : ""}`}
              />
            </div>
          </div>
          <div className={`dropdown--branches ${branchDropdown ? "" : "hide"}`}>
            <div className="arrowhead-branch">
              <img src={dropdownArrow} alt="arrowhead" />
            </div>
            <div className="branches__container">
              <ul className="branch-list">
                {branches.map((b) => {
                  return (
                    <li
                      className="branch-list__item"
                      onClick={() => {
                        setBranch(b.id);
                        setBranchDropdown(!branchDropdown);
                      }}
                      key={b.id}
                    >
                      {b.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="button-purple">
        <p>Done</p>
      </div>
    </div>
  );
}
