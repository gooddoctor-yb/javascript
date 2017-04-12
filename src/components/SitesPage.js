import React from "react";
import styled from "styled-components";
import a11ySpeak from "a11y-speak";
import { defineMessages, injectIntl, intlShape } from "react-intl";

import AddSiteModal from "./AddSiteModal";

import Sites from "./Sites";
import Search from "./Search";
import NoSites from "./NoSites";
import SitesNoResult from "./SitesNoResult";
import { RoundAddButton } from "./RoundButton";

const messages = defineMessages( {
	sitesPageLoaded: {
		id: "menu.sites.loaded",
		defaultMessage: "Sites page loaded",
	},
	description: {
		id: "search.description",
		defaultMessage: "The search results will be updated as you type.",
	},
} );

const SiteAddContainer = styled.div`
	text-align: center;
	button {
		margin: 20px 0 36px 0;
	}
`;

/**
 * Returns the rendered Sites Page component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Sites component.
 */
class SitesPage extends React.Component {
	componentDidMount() {
		let message = this.props.intl.formatMessage( messages.sitesPageLoaded );
		a11ySpeak( message );
	}

	render() {
		let props = this.props;

		let modal = (
			<AddSiteModal isOpen={ props.popupOpen } onLink={ props.onLink } onClose={ props.onClose }
						  onChange={ props.onChange } errorFound={ props.errorFound }
						  errorMessage={ props.errorMessage } query={ props.query } />
		);
		if ( props.sites.length > 0 ) {
			let changeSearchQuery = ( event ) => {
				props.changeSearchQuery( event.target.value );
			};

			return (
				<div>
					<SiteAddContainer>
						<Search
							id="search"
							description={ props.intl.formatMessage( messages.description ) }
							descriptionId="searchDescription"
							onChange={ changeSearchQuery }
							query={ props.query }
						/>
						<RoundAddButton onClick={ props.addSite }/>
					</SiteAddContainer>
					<Sites sites={ props.sites } onClick={ ( sitesId ) => {
						return sitesId;
					} }/>
					{ modal }
				</div>
			);
		} else if ( props.query.length > 0 ) {
			let changeSearchQuery = ( event ) => {
				props.changeSearchQuery( event.target.value );
			};

			return (
				<div>
					<SiteAddContainer>
						<Search
							id="search"
							description={ props.intl.formatMessage( messages.description ) }
							descriptionId="searchDescription"
							onChange={ changeSearchQuery }
							query={ props.query }
						/>
					</SiteAddContainer>
					<SitesNoResult onClick={ props.addSite } query={ props.query } />
					{ modal }
				</div>
			);
		}
		return (
			<div>
				<NoSites onClick={ props.addSite }/>
				{ modal }
			</div>
		);
	}
}

export default injectIntl( SitesPage );

SitesPage.propTypes = {
	sites: React.PropTypes.arrayOf( React.PropTypes.object ),
	addSite: React.PropTypes.func.isRequired,
	changeSearchQuery: React.PropTypes.func.isRequired,
	popupOpen: React.PropTypes.bool,
	onLink: React.PropTypes.func.isRequired,
	onClose: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	errorFound: React.PropTypes.bool.isRequired,
	errorMessage: React.PropTypes.string,
	intl: intlShape.isRequired,
	query: React.PropTypes.string,
};

SitesPage.defaultProps = {
	sites: [],
	popupOpen: false,
	errorMessage: "",
};
