/**
 * This file should be referenced by React-components that need to 
 * reference external assets, graphics, for example.
 */

import chart from "./images/img_chart.svg";
import folderWhite from "./images/img_folder_white.svg";
import folderAddWhite from "./images/img_folder_add_white.svg";
import gear from "./images/img_gear.svg";
import closeSquareWhite from "./images/img_close_square_white.svg";
import closeSquareBlack from "./images/img_close_square_black.svg";
import importWhite from "./images/img_import_white.svg";
import brushBlack from "./images/img_brush_black.svg";
import plusGreen from "./images/img_plus_green.svg";
import openExternalWhite from "./images/img_open_external_white.svg";
import fileBlank from "./images/img_file_blank.svg";
import fileText from "./images/img_file_text.svg";
import fileImage from "./images/img_file_image.svg";
import filePDF from "./images/img_file_pdf.svg";
import minusRedWhite from "./images/img_minus_redwhite.svg";
import changeWhite from "./images/img_change_white.svg";

/**
 * Contains references to all available image assets coupled with
 * their identifiers (keys).
 */
export const images = {
    chart: chart,
    folder: {
        white: folderWhite,
        add: {
            white: folderAddWhite
        }
    },
    close: {
        square: {
            white: closeSquareWhite,
            black: closeSquareBlack
        }
    },
    import: {
        white: importWhite
    },
    brush: {
        black: brushBlack
    },
    gear: gear,
    plus: {
        green: plusGreen
    },
    openExternal: {
        white: openExternalWhite
    },
    file: {
        blank: fileBlank,
        text: fileText,
        image: fileImage,
        pdf: filePDF
    },
    minus: {
        redWhite: minusRedWhite
    },
    change: {
        white: changeWhite
    }
};

/**
 * Contains the frequently used styling for styled-components.
 */
export const UIstyle = {
    majorBorder: {
        style: "solid",
        width: "2px",
        light: {
            color: "#C1C1C1"
        },
        dark: {
            color: "#F7F7F7"
        }
    },
    colorScheme: {
        light: {
            background: "white",
            backgroundDistant: "#E5E5E5",
            distinct: "#F7F7F7"
        },
        dark: {
            background: "#808080",
            backgroundDistant: "#404040",
            distinct: "#ADADAD"
        }
    }
};
