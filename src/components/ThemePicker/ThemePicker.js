import { useContext, Fragment } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

import { FullDiv } from "../../common/FullDiv";
import { themes } from "../../contexts/ThemeContext";
import { capitalizeFirstLetter } from "../../utils/CommonVariables";

import { Styles } from "./ThemePicker.styles";

export default function ThemePicker() {
  const availableThemes = themes;
  const context = useContext(ThemeContext);
  const selectedTheme = context.theme;
  const { setTheme } = context;

  const renderThemes = (themes) => {
    const elements = [];

    for( let theme of Object.keys(themes) )
    elements.push(ThemeButton(themes[theme]));

    return elements;
  };

  const ThemeButton = (theme) => {
    const id = "ThemePicker_" + theme;

    return(
      <Fragment key={id}>
        <br />
        <input
          id={id}
          type="radio"
          checked={selectedTheme === theme}
          onChange={() => {
            setTheme(theme);
          }}
        />
        <label htmlFor={id}>
          {capitalizeFirstLetter(theme)}
        </label>
      </Fragment>
    );
  };

  return(
    <FullDiv>
      Theme:
      {renderThemes(availableThemes)}
    </FullDiv>
  );
}
