var UTILS = (function() {

	var block_size = 4,
	local_block = null,
	local_block_number = 0,
	init_number = 0,
	acceptable_sizes = [1,2,4];

	return {
		blocks_former : function(feeds, blocks) {
			console.warn('UTILS BLOCK FORMER');
			for (i in feeds) {
				var local_element = feeds[i],
					rem_size = block_size - local_block_number;

				setDefault = function() {
					local_block = null;
					local_block_number = 0;
				}	
				addNewsToBlock = function() {
					local_block.feed_elements.push(local_element);
					local_block_number += feeds[i]._size;
				}
				createBlock = function(add_flag) {
					local_block = {
						id : ~~(Math.random() * 9999),
						feed_elements : []
					}
					if (add_flag) {
						addNewsToBlock();
					}
				}
				generateSize = function(array_fully, add_flag) {
					randomOrient = function() {
						return Math.random() > .5 ? 'left' : 'right';
					}
				    random_value = ~~(Math.random() * (acceptable_sizes.length - array_fully));
					local_element._size = acceptable_sizes[random_value];
					local_element.orient = local_element._size == 2 ? randomOrient() : null;
				    if (add_flag) addNewsToBlock();
				}
				blockFormEnding = function() {
					sort_way = Math.random() > .5;
					local_block.feed_elements.sort(function(a,b) {
						return sort_way ? a._size-b._size : b._size-a._size
					})
					blocks.push(local_block);
					setDefault();
				}

				// size generation
				if (rem_size == 4) {
					generateSize(0);
					createBlock(true);
				} else if (rem_size > 2) {
					generateSize(1, true);
				} else if (rem_size == 2) {
					generateSize(2, true);
				} else if (rem_size == 1) {
					generateSize(3, true);
				} else if (rem_size == 0) {
					blockFormEnding();
					generateSize(0);
					createBlock(true);
				}

				if (i == feeds.length - 1) {
					blockFormEnding();
				}
			}
			return blocks;
		}
	}
})();