import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

/**
 * Returns the rendered Column component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Column component.
 * @constructor
 */
export const Column = styled.span`
	font-size: 14px;
	padding-left: 40px;
	
	text-align: ${ props => props.textAlign };

	 &::before {
 		position: absolute;
 		left: -9999em;
 		top: -30px;
 		font-size: 1.286em;
 		line-height: 0;
 		content: "${ props => props.label }";
 	}
	
	flex: 0 0 ${ props => props.ColumnWidth };
	@media screen and ( max-width: 1355px ) {
		padding-left: 20px;
		flex: 1 0 ${ props => props.ColumnWidth };
		${ props => props.hideOnTablet ? "display: none;" : "" }
	}
	@media screen and ( max-width: 660px ) {
		flex: 1 1 ${ props => props.ColumnWidth };
		${ props => props.hideOnMobile ? "display: none;" : "" }
	}
`;

Column.propTypes = {
	children: React.PropTypes.any,
	ColumnWidth: React.PropTypes.string,
	label: React.PropTypes.string,
	hideOnMobile: React.PropTypes.bool,
	hideOnTablet: React.PropTypes.bool,
	textAlign: React.PropTypes.string,
};

Column.defaultProps = {
	ColumnWidth: "auto",
	label: "",
	hideOnMobile: false,
	hideOnTable: false,
	textAlign: "left",
};

export const ColumnText = styled( Column )`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

/**
 * Returns the rendered Row component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Row component.
 * @constructor
 */
export const Row = styled.li`
	background: ${ props => props.background };
	
	height: 100px;
	display: flex;
	padding-right: 40px;
	align-items: center;
	justify-content: space-around;
	
	@media screen and ( max-width: 1355px ) {
		justify-content: space-between;
	}
`;

Row.propTypes = {
//	children: React.PropTypes.objectOf( Columns ).isRequired,
	background: React.PropTypes.string,
};

Row.defaultProps = {
	background: "none",
};

/**
 * Returns the rendered Table component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Table component.
 * @constructor
 */
export const Table = styled.ul`
	margin: 50px 0 0 0;
 	padding: 0;
 	list-style: none;
 	position: relative;
 	width: 100%;
 	
 	li:first-child {
        & *::before {
            left: auto;
        }
    }
`;

Table.propTypes = {
	children: React.PropTypes.array || React.PropTypes.objectOf( Row ),
};

/**
 * Returns the rendered Zebra component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Zebra component.
 * @constructor
 */
export function Zebra( props ) {
	let zebraProps = Object.assign( {}, ...props );
	let children = props.children;

	// Todo: improve.
	if ( ! children.map ) {
		children = [ children ];
	}

	zebraProps.children = children.map( ( child, key ) => {
		return React.cloneElement( child, {
			background: ( key % 2 === 0 ) ? colors.$palette_white : colors.$palette_grey_light,
		} );
	} );

	return (
		<span { ...zebraProps }/>
	);
}

Zebra.propTypes = {
	children: React.PropTypes.any,
};
