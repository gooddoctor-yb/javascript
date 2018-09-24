import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import { FullHeightCard } from "../Card";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors";
import { linkSiteModalClose, linkSiteModalOpen,
	linkSite, updateSiteUrl } from "../../actions/sites";
import { LargeIconButton, makeButtonFullWidth } from "../Button";
import plus from "../../icons/plus.svg";
import addSiteImage from "../../images/addsite.svg";
import AddSiteModal from "../modal/AddSiteModal";

const messages = defineMessages( {
	addSite: {
		id: "home.addSiteButton",
		defaultMessage: "Add site",
	},
} );

const ActionBlock = styled.div`
	text-align: center;
`;

const Header = styled.a`
	padding: 0;
	margin: 0;
	margin-bottom: 15px;
	color: ${ colors.$color_pink_dark };
	font-weight: 50;
	font-size: 1.5em;
	text-decoration: none;
`;

const Details = styled.div`
	margin-bottom:24px;
	border-bottom: 1px ${ colors.$color_grey } solid;
	flex-grow: 1;
`;

const AddSiteImage = styled.img`
	display: block;
	max-width: 100%;
	margin: 0 auto;
	margin-bottom: 16px;
	padding: 0 40px; 
`;

let ResponsiveIconButton = makeButtonFullWidth( LargeIconButton );

/**
 * A function that returns the Courses Progress Tab component.
 *
 * @param {Object} props The props required for the SitesCard.
 *
 * @returns {ReactElement} The component that contains the progress tab of the course page.
 */
const SitesCard = ( props ) => {
	return (
		<FullHeightCard
			className={ "SitesCard" }
		>
			<Details>
				<Header href={ "sites" }>{ "Add site" }</Header>
				<p>
					<FormattedMessage
						id={ "home.addSiteInfo" }
						defaultMessage={ "Add a website to your account to manage your " +
						"subscriptions and get insights about your website!" }
					/>
				</p>
				<AddSiteImage src={ addSiteImage } alt="" />
				<AddSiteModal { ...props } />
			</Details>
			<ActionBlock>
				<ResponsiveIconButton
					onClick={ props.onClick }
					iconSource={ plus }
					aria-label={ props.intl.formatMessage( messages.addSite ) }
				>
					<FormattedMessage
						id={ messages.addSite.id }
						defaultMessage={ messages.addSite.defaultMessage }
					/>
				</ResponsiveIconButton>
			</ActionBlock>
		</FullHeightCard>
	);
};

SitesCard.propTypes = {
	intl: intlShape.isRequired,
	onClick: PropTypes.func.isRequired,
};

export const mapStateToProps = ( state ) => {
	let modalOpen = state.ui.sites.addSiteModalOpen;

	let errorFound = state.ui.sites.linkSiteFailed;

	let error = state.ui.sites.linkSiteError;

	let linkingSiteUrl = state.ui.sites.linkingSiteUrl;

	return {
		modalOpen,
		errorFound,
		error,
		linkingSiteUrl,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		onClick: () => {
			dispatch( linkSiteModalOpen() );
		},
		addSite: ( url ) => {
			dispatch( linkSiteModalOpen() );
			dispatch( updateSiteUrl( url ) );
		},
		onClose: () => {
			dispatch( linkSiteModalClose() );
		},
		onConnect: ( url, type ) => {
			dispatch( linkSite( url, type, true ) );
		},
		onChange: ( url ) => {
			dispatch( updateSiteUrl( url ) );
		},
	};
};

export const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	let url = stateProps.linkingSiteUrl;

	if ( stateProps.linkingSiteUrl.length === 0 ) {
		url = stateProps.query;
	}

	let onConnect = ( type, fromHome ) => {
		dispatchProps.onConnect( url, type, fromHome );
	};

	let addSite = () => {
		dispatchProps.addSite( url );
	};

	return Object.assign( {}, ownProps, stateProps, dispatchProps, { onConnect, addSite } );
};

const SitesCardContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( SitesCard );

export default injectIntl( SitesCardContainer );
