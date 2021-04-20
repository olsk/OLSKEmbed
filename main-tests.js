const { throws, deepEqual } = require('assert');

const mod = require('./main.js');
import { JSDOM } from 'jsdom';

describe('OLSKEmbedURL', function test_OLSKEmbedURL () {

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKEmbedURL(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns null', function () {
		deepEqual(mod.OLSKEmbedURL(''), null);
	});

	it('matches youtube', function () {
		deepEqual(mod.OLSKEmbedURL('https://youtube.com/watch?v=oUFJJNQGwhk'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('youtube');
		}).shift());
	});

	it('matches soundcloud', function () {
		deepEqual(mod.OLSKEmbedURL('https://soundcloud.com/tycho/tycho-awake'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('soundcloud');
		}).shift());
	});

	it('matches facebook', function () {
		deepEqual(mod.OLSKEmbedURL('https://facebook.com/facebook/videos/10153231379946729'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('facebook');
		}).pop());
	});

	it('matches vimeo', function () {
		deepEqual(mod.OLSKEmbedURL('https://vimeo.com/90509568'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('vimeo');
		}).shift());
	});

	it('matches instagram', function () {
		deepEqual(mod.OLSKEmbedURL('https://www.instagram.com/p/CN4V2ksHAyE/'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('instagram');
		}).shift());
	});

});
