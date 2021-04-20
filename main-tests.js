const { throws, deepEqual } = require('assert');

const mod = require('./main.js');
import { JSDOM } from 'jsdom';

describe('OLSKEmbedEndpointURL', function test_OLSKEmbedEndpointURL () {

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKEmbedEndpointURL(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns null', function () {
		deepEqual(mod.OLSKEmbedEndpointURL(''), null);
	});

	it('matches youtube', function () {
		deepEqual(mod.OLSKEmbedEndpointURL('https://youtube.com/watch?v=oUFJJNQGwhk'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('youtube');
		}).shift());
	});

	it('matches soundcloud', function () {
		deepEqual(mod.OLSKEmbedEndpointURL('https://soundcloud.com/tycho/tycho-awake'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('soundcloud');
		}).shift());
	});

	it('matches facebook', function () {
		deepEqual(mod.OLSKEmbedEndpointURL('https://facebook.com/facebook/videos/10153231379946729'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('facebook');
		}).pop());
	});

	it('matches vimeo', function () {
		deepEqual(mod.OLSKEmbedEndpointURL('https://vimeo.com/90509568'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('vimeo');
		}).shift());
	});

	it('matches instagram', function () {
		deepEqual(mod.OLSKEmbedEndpointURL('https://www.instagram.com/p/CN4V2ksHAyE/'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('instagram');
		}).shift());
	});

});
