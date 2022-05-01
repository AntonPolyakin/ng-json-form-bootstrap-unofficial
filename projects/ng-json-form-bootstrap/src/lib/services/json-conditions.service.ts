import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JsonConditionsService {
  //https://github.com/raisely/json-conditions

  public checkConditions(settings, reference){
    return settings != undefined ? typeof settings == 'object' ? (()=>{
		return checkConditions(settings, reference);
	})(): !!settings : !!settings;
  }

  constructor() { }

}

/**
 * @param {object} settings
 * @param {object[]} settings.rules array of rules { property, op, value, required }
 * @param {string} settings.satisfy 'ALL' or 'ANY'
 * @param {function} settings.log Function to log the evaluation process for debugging
 * @param {object} testReference The object under test
 * @returns {boolean} Null if there are no rules,therwise true/alse depending on if testReference
 */
 function checkConditions(settings, reference) {
	if (!(settings && Array.isArray(settings.rules))) return null;

	let debugStr = '';
	let requiredPassed = 0;
	let normalPassed = 0;

	// build an array of booleans based on the test results
	const results = settings.rules.map((rule, index ) => {
		let error;
		if (!rule.property) {
			error = new Error(`Property not specified for rule ${index}`);
			error.rule = rule;
			throw error;
		}
		let value = getNestedValue(reference, rule.property);
		let altComparison = null;
		if (typeof value === 'boolean' && (typeof rule.value === 'string' || rule.value instanceof String)) {
			if (rule.value.toLowerCase() === 'false') altComparison = false;
			if (rule.value.toLowerCase() === 'true') altComparison = true;
		}
		let result;
		switch (rule.op) {
			case 'eq':
				result = value == rule.value;
				if (altComparison !== null) result = result || (value == altComparison);
				break;
			case 'ne':
			case 'neq':
				result = value != rule.value;
				if (altComparison !== null) result = result || (value != altComparison);
				break;
			case 'gt':
				result = value > rule.value;
				break;
			case 'gte':
				result = value >= rule.value;
				break;
			case 'lt':
				result = value < rule.value;
				break;
			case 'lte':
				result = value <= rule.value;
				break;
			case 'startsWith':
				result = toString(value).startsWith(rule.value);
				break;
			case 'endsWith':
				result = toString(value).endsWith(rule.value);
				break;
			case 'contains':
				result = toString(value).includes(rule.value);
				break;
			case 'present':
				result = !!value;
				break;
			case 'empty':
			case 'absent':
				result = !value;
				break;
			case 'matches':{
				var bool = getMatchesRegExp(value).test(rule.value);
				result = rule.value ? bool : false;
				break;
			}
			default:
				error = new Error(`Unknown comparison for rule (${rule.comparison})`);
				error.rule = rule;
				throw error;
		}
		if (result) {
			if (rule.required) requiredPassed += 1
			else normalPassed += 1;
		}
		const unary = ['absent', 'present'].includes(rule.op);
		debugStr += `(${index}) ${rule.property} (${value}) ${unary ? 'is' : ''} ${rule.op} ${unary ? '' : rule.value}? ${result}\n`;
		return result;
	});

	const requiredTotal = settings.rules.reduce((total, rule) => total + (rule.required ? 1 : 0), 0);
	const normalTotal = settings.rules.length - requiredTotal;

	// Count how many conditions passed
	const satisfy = settings.satisfy || 'ANY';

	const requiredSatisfied = !requiredTotal || requiredTotal === requiredPassed;
	const normalSatisfied = satisfy === 'ALL' ? normalPassed === normalTotal : normalPassed > 0;
	const outcome = normalSatisfied && requiredSatisfied;

	debugStr += `Passed ${normalPassed} / ${normalTotal} (need ${satisfy}, ${normalSatisfied ? 'pass' : 'fail'})`;
	if (requiredTotal > 0) debugStr += `, and ${requiredPassed} / ${requiredTotal} required conditions (${requiredSatisfied ? 'pass' : 'fail'})`;
	debugStr += ` (${outcome ? 'PASS' : 'FAIL'})`
	if (settings.log) settings.log(debugStr);
	// test the result
	return outcome;
}

//lodash
function toString(value) {
  var INFINITY = 1 / 0;
  var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = Symbol ? symbolProto.toString : undefined;
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (value == null) {
    return '';
  }
  if (isSymbol(value)) {
    return Symbol ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}


function isSymbol(value) {
  var symbolTag = '[object Symbol]';
  return typeof value == 'symbol' ||
    (isObjectLike(value) && Object.prototype.toString.call(value) == symbolTag);
}

function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

//lodash.get alternative
function getNestedValue(obj, key, regExpEnabled?) {
	return key.split(".").reduce(function(result, key) {
	  if(regExpEnabled){
		  let resultKey = Object.keys(result).find(resKey=>{
		  key = key.replace('*', '.*');
			  var bool = getMatchesRegExp(key).test(resKey);
			  return bool
		  });
		  return result?.[resultKey];
	  }else{
		  return result?.[key];
	  }
	}, obj);
  }

function getMatchesRegExp(value) {
	var regStr = value.replace(new RegExp('[\\\\]', 'gim'), '\$&');
	var regExp = new RegExp(regStr, 'gim');
	return regExp;
  }