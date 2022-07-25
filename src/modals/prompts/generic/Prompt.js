import ModalAPI from "../../../apis/ModalAPI";

import { Fragment } from "react";
import { FullImage } from "../../../common/FullImage";
import { getKey } from "../../../utils/KeyManager";
import { Styles } from "./Prompt.styles";
import { images } from "../../../assets/assets";


/**
 * Generates HTML-element(s) from a string. If there are new line
 * characters present, they will be replaced with br-tags. In such
 * cases the string will be split using React.Fragments that will
 * each be assigned a key. The key can be configured with a custom
 * prefix.
 * 
 * @param {String} str String to convert to HTML.
 * @param {String} customKey Custom prefix for the keys of potential
 * React.Fragments.
 * 
 * @returns String(s) inside a fragment.
 */
export const formatStringToHTML = (str, customKey = "formatted-string") => {
    const paragraphs = [];
    let nextNewlineAt = 0;
    let prevNewLineAt = 0;

        // Place a <br> tag where a new line character should be
    while( (nextNewlineAt = str.indexOf("\n", nextNewlineAt)) >= 0 )
    {
        paragraphs.push(
            <Fragment key={customKey + "-" + paragraphs.length}>
                {str.substring(prevNewLineAt, nextNewlineAt)}
                <br />
            </Fragment>
        );

        nextNewlineAt ++;
        prevNewLineAt = nextNewlineAt;
    }

    paragraphs.push(str.substring(prevNewLineAt));

    return <>{paragraphs}</>;
};


export default function ModalView(props) {
    const title = props.title;
    const disableClose = props.disableClose || false;
    const disableBackground = props.disableBackground || false;
    const controls = props.controls;
    const onClose = props.onClose || ModalAPI.close;
    const onBackground = props.onBackground || onClose;
    const Body = props.body || <></>;
    const dimensions = props.dimensions;


    const renderTitle = (title, attrs) => {
        if( !title ) return <></>;

        return (
            <Styles.Caption>
                {title}

                {
                    attrs.renderClose &&
                    (
                        <Styles.CloseButton onClick={onClose}>
                            <FullImage src={images.close.square.black} />
                        </Styles.CloseButton>
                    )
                }   
            </Styles.Caption>
        );
    };

    const renderControlButton = (ctrl) => {
        if( !ctrl ) return <></>;

        return (
            <Styles.ControlButton
                key={"prompt-control-button-" + getKey()}
                onClick={ctrl.onClick}
            >
                {ctrl.caption}
            </Styles.ControlButton>
        );
    };

    const renderControls = (ctrls) => {
        if( !ctrls ) return <></>;

        return (
            <Styles.ControlContainer>
                {
                    ctrls.map((ctrl) => {
                        return renderControlButton(ctrl);
                    })
                }
            </Styles.ControlContainer>
        );
    };

    const determineBodyContainerStyle = (customDimensions, controls) => {
        if( customDimensions )
        {
            const style = {};

            if( customDimensions.width )
            style.width = customDimensions.width;

            if( customDimensions.height )
            style.height = customDimensions.height;

            return style;
        }

        if( controls )
        return { width: "100%", height: `calc(100% - ${Styles.dimensions.Caption.height})` }
        
        return {}
    };

    return (
        <Styles.Content>
            {
                !disableBackground &&
                (<Styles.Background onClick={onBackground} />)
            }

            <Styles.View
                style={dimensions ? {
                    width: dimensions.width,
                    height: dimensions.height
                } : {}}
            >
                {renderTitle(title, { renderClose: !disableClose })}

                <Styles.BodyContainer
                    style={controls ? {} : {
                        width: "100%",
                        height: `calc(100% - ${Styles.dimensions.Caption.height})`
                    }}
                >
                    {Body}
                </Styles.BodyContainer>

                {renderControls(controls)}
            </Styles.View>
        </Styles.Content>
    );
}
