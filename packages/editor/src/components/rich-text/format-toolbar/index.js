/**
 * External dependencies
 */

import { orderBy } from 'lodash';

/**
 * WordPress dependencies
 */

import { Toolbar, Slot, DropdownMenu } from '@wordpress/components';

const FormatToolbar = ( { controls } ) => {
	return (
		<div className="editor-format-toolbar">
			<Toolbar>
				{ controls.map( ( format ) =>
					<Slot name={ `RichText.ToolbarControls.${ format }` } key={ format } />
				) }
				<Slot name="RichText.ToolbarControls">
					{ ( fills ) =>
						<DropdownMenu
							icon={ false }
							position="bottom left"
							controls={ orderBy( fills.map( ( [ { props } ] ) => props ), 'title' ) }
						/>
					}
				</Slot>
			</Toolbar>
		</div>
	);
};

export default FormatToolbar;
