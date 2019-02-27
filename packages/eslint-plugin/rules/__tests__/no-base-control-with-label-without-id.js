/**
 * External dependencies
 */
import { RuleTester } from 'eslint';

/**
 * Internal dependencies
 */
import rule from '../no-base-control-with-label-without-id';

const ruleTester = new RuleTester( {
	parserOptions: {
		ecmaVersion: 6,
	},
} );

ruleTester.run( 'no-base-control-with-label-without-id', rule, {
	valid: [
		{
			code: `
			<BaseControl
				label="ok"
				id="my-id"
			/>`,
		},
		{
			code: `
			<BaseControl
			/>`,
		},
		{
			code: `
			<BaseControl
				label="ok"
				id="my-id"
			>
				<b>Child</b>
			</BaseControl>`,
		},
		{
			code: `
			<BaseControl>
				<b>Child</b>
			</BaseControl>`,
		},
		{
			code: `
			<BaseControl
				id="my-id"
			>
				<b>Child</b>
			</BaseControl>`,
		},
	],
	invalid: [
		{
			code: `
			<BaseControl
				label="ok"
			>
				<b>Child</b>
			</BaseControl>`,
			errors: [ { message: 'When using BaseControl component if a label property is passed an id property should also be passed.' } ],
		},
		{
			code: `
			<BaseControl
				label="ok"
			/>`,
			errors: [ { message: 'When using BaseControl component if a label property is passed an id property should also be passed.' } ],
		},
	],
} );
