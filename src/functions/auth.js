import Cookies from "js-cookie";
import getEnv from "./getEnv";
import _defaultTo from "lodash/defaultTo";

/**
 * Returns the auth URL where the user can authenticate themselves.
 *
 * @returns {string} The URL where the user can authenticate.
 */
export function getAuthUrl() {
	return getEnv( "AUTH_URL", "http://localhost:3000/auth/yoast" );
}

/**
 * Returns the logout URL where the user can logout.
 *
 * @returns {string} The URL where the user can logout.
 */
export function getLogoutUrl() {
	return getEnv( "LOGOUT_URL", "http://yoast.dev/wp/wp-login.php?action=logout" );
}

/**
 * Returns the URL where the user can reset their password.
 *
 * @returns {string} The URL where the user can reset their password.
 */
export function getPasswordResetUrl() {
	return getEnv( "PASSWORD_RESET_URL", "http://yoast.dev/wp-login.php?action=lostpassword" );
}

/**
 * Removes the cookie signage Express adds.
 *
 * @param {string} cookie The signed cookie.
 * @returns {string} The raw value.
 */
export function removeCookieSignage( cookie ) {
	return cookie.replace( /s:([^\.]+)\..*/, "$1" );
}

/**
 * Determines whether or an access token is available.
 *
 * @returns {boolean} Whether or not an access token is available.
 */
export function hasAccessToken() {
	return !! Cookies.get( "access_token" );
}

/**
 * Returns the access token known from the cookies.
 *
 * @returns {string} The available access token.
 */
export function getAccessToken() {
	return removeCookieSignage( _defaultTo( Cookies.get( "access_token" ), "" ) );
}

/**
 * Returns the user ID known from the cookies
 *
 * @returns {string} The known user ID
 */
export function getUserId() {
	return removeCookieSignage( _defaultTo( Cookies.get( "userId" ), "" ) );
}

/**
 * Removes cookies that are relevant for authentication
 *
 * @returns {void}
 */
export function removeCookies() {
	Cookies.remove( "access_token" );
	Cookies.remove( "userId" );
}
