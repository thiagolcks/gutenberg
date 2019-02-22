/**
 * External dependencies
 */
import { sortBy, uniq } from 'lodash';

/**
 * WordPress dependencies
 */
import {
	createNewPost,
	insertBlock,
	openGlobalInserter,
} from '@wordpress/e2e-test-utils';

describe( 'Inserter', () => {
	const openAllInserterCategories = async () => {
		const notOpenCategoryPanels = await page.$$(
			'.editor-inserter__results .components-panel__body:not(.is-opened)'
		);
		for ( const categoryPanel of notOpenCategoryPanels ) {
			await categoryPanel.click();
		}
	};

	const getAllInserterItemTitles = async () => {
		const inserterItemTitles = await page.evaluate( () => {
			return Array.from(
				document.querySelectorAll(
					'.editor-inserter__results .editor-block-types-list__item-title'
				)
			).map(
				( inserterItem ) => {
					return inserterItem.innerText;
				}
			);
		} );
		return sortBy( uniq( inserterItemTitles ) );
	};

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'all blocks should appear', async () => {
		await page.click( '.editor-default-block-appender' );
		await openGlobalInserter();
		await openAllInserterCategories();
		expect( await getAllInserterItemTitles() ).toMatchSnapshot();
	} );

	it( 'media & text block should restrict allowed blocks', async () => {
		await insertBlock( 'Media & Text' );
		await page.click( '.wp-block-media-text .editor-rich-text' );
		await openGlobalInserter();
		await openAllInserterCategories();
		expect( await getAllInserterItemTitles() ).toMatchSnapshot();
	} );

	it( 'no blocks should be allowed inside columns', async () => {
		await insertBlock( 'Columns' );
		await page.click( '[aria-label="Block Navigation"]' );
		const columnBlockMenuItem = ( await page.$x( '//button[contains(concat(" ", @class, " "), " editor-block-navigation__item-button ")][text()="Column"]' ) )[ 0 ];
		await columnBlockMenuItem.click();
		await openGlobalInserter();
		await openAllInserterCategories();
		expect( await getAllInserterItemTitles() ).toHaveLength( 0 );
	} );
} );
