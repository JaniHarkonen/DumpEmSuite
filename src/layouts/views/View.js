import GridLayout from "../../components/GridLayout/GridLayout";

/**
 * Creates an element that can be passed onto GridLayout that
 * has the characteristics of a View component.
 * 
 * The element will be rendered at a given grid position spanning
 * a given number of grids.
 * 
 * @param {JSON} position A JSON containing the X- and Y-cell
 * coordinates of the element in the GridLayout constituting the
 * View.
 * 
 * @param {JSON} dimensions A JSON containing the width and height
 * of the element in cells.
 * 
 * @param {JSX} element JSX of the element that is to be drawn in
 * the GridLayout constituting the View.
 * 
 * @returns A JSON structured like a GridLayout component with the
 * characteristics of a View component.
 */
export const makeViewElement = (position, dimensions, element, customKey = null) => {
    return {
        position: position,
        dimensions: dimensions,
        element: element,
        customKey: customKey
    };
};


export default function View(props) {
    return (
        <GridLayout
            dimensions={{
                width: 2,
                height: 2
            }}
            elements={props.elements}
        />
    );
}
