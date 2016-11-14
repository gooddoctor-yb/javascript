var getWords = require( "../../../stringProcessing/getWords.js" );
var regexFunction = require( "../../../../js/researches/german/passivevoice-german/regex.js" )();
var verbsBeginningWithErVerEntBeZerHer = regexFunction.verbsBeginningWithErVerEntBeZer;
var verbsBeginningWithGe = regexFunction.verbsBeginningWithGe;
var verbsWithGeInMiddle = regexFunction.verbsWithGeInMiddle;
var verbsWithErVerEntBeZerHerInMiddle = regexFunction.verbsWithErVerEntBeZerInMiddle;
var verbsEndingWithIert = regexFunction.verbsEndingWithIert;

var GermanParticiple = require( "../GermanParticiple.js" );

var forEach = require( "lodash/forEach" );

/**
 * Creates GermanParticiple Objects for the participles found in a sentence.
 *
 * @param {string} sentence The sentence to finds participles in.
 * @param {Array} auxiliaries The list of auxiliaries from the sentence part.
 * @returns {Array} The array with GermanParticiple Objects.
 */
module.exports = function( sentence, auxiliaries ) {
	var words = getWords( sentence );

	var foundParticiples = [];

	forEach( words, function( word ) {
		if( verbsBeginningWithGe( word ).length !== 0 ) {
			foundParticiples.push(
				new GermanParticiple( word, sentence, { auxiliaries: auxiliaries, type: "ge at beginning" } )
			);
			return;
		}
		if ( verbsWithGeInMiddle( word ).length !== 0 ) {
			foundParticiples.push(
				new GermanParticiple( word, sentence, { auxiliaries: auxiliaries, type: "ge in the middle" } )
			);
			return;
		}
		if ( verbsBeginningWithErVerEntBeZerHer( word ).length !== 0 ) {
			foundParticiples.push(
				new GermanParticiple( word, sentence, { auxiliaries: auxiliaries, type: "er/ver/ent/be/zer/her at beginning" } )
			);
			return;
		}
		if ( verbsWithErVerEntBeZerHerInMiddle( word ).length !== 0 ) {
			foundParticiples.push(
				new GermanParticiple( word, sentence, { auxiliaries: auxiliaries, type: "er/ver/ent/be/zer/her in the middle" } )
			);
			return;
		}
		if ( verbsEndingWithIert( word ).length !== 0 ) {
			foundParticiples.push(
				new GermanParticiple( word, sentence, { auxiliaries: auxiliaries, type: "iert at the end" } )
			);
		}
	} );
	return foundParticiples;
};
