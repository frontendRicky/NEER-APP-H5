import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gobackIcon from "../assets/iconfont/goback.svg";
import searchIcon from "../assets/iconfont/search.svg";
import Area from "../i18n/area/area.json";
import type { CountryItem } from "../type/SelectCountry";
import useUserStore from "../store/user.ts";
import { useNavigate } from "react-router-dom";
import "./SelectCountry.scss";
function SelectCountry() {
  const { t,i18n } = useTranslation();
  const { UpdateSelectCountry, UpdatePreviousPathName } = useUserStore();
  const [searchText, setSearchText] = useState<string>("");
  const [filteredArea, setFilteredArea] = useState<CountryItem[] | []>([]);
  const lang = i18n.language
  const filterArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text: string = e.target.value;
    setSearchText(text);
    const lowerCaseSearchText = String(text).toLowerCase();
    const areaList = Area.filter(
      (item) =>
        item.cn.toLowerCase().includes(lowerCaseSearchText) ||
        item.en.toLowerCase().includes(lowerCaseSearchText) ||
        item.code.includes(lowerCaseSearchText)
    );
    setFilteredArea(areaList);
  };
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const navigate = useNavigate();
  const gotoSignIn = () => {
    UpdatePreviousPathName(window.location.pathname);
    navigate("/");
  };
  const handleSelectCountry = (item: CountryItem, index: number) => {
    setSelectedItemIndex(index);
    UpdateSelectCountry(item);
    gotoSignIn();
  };
  return (
    <div className="selectCountry-container">
      <div className="selectCountry-heder">
        <img
          className="back-icon"
          src={gobackIcon}
          alt=""
          onClick={gotoSignIn}
        />
        {t("Select country/region")}
      </div>
      <div className="selectCountry-content">
        <div className="search-box">
          <img src={searchIcon} alt="" />
          <input type="text" onChange={(e) => filterArea(e)} />
        </div>
        <div className="area-box">
          {searchText.length > 0
            ? filteredArea.map((item, index) => {
                const isSelected = index === selectedItemIndex;
                return (
                  <div
                    key={index}
                    className={`area-item ${isSelected && "selected"}`}
                    onClick={() => handleSelectCountry(item, index)}
                  >
                    <span>{item[lang]}</span>
                    <span>{item.code}</span>
                  </div>
                );
              })
            : Area.map((item, index) => {
                const isSelected = index === selectedItemIndex;
                return (
                  <div
                    key={index}
                    className={`area-item ${isSelected && "selected"}`}
                    onClick={() => handleSelectCountry(item, index)}
                  >
                    <span>{item[lang]}</span>
                    <span>{item.code}</span>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default SelectCountry;
