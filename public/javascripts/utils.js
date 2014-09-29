var UTILS = (function() {

	var block_size = 4,
		local_block = null,
		last_block = null;

	return {
		blocks_former : function(feeds, blocks) {
			createBlock = function() {
				local_block = {
					id : ~~(Math.random() * 9999),
					feed_elements : [],
					number: 0
				}
			}
			setDefault = function() {
				local_block = null;
			}	
			blockFormEnding = function() {
				if (local_block.number != block_size) {
					sort_way = false;
				} else {
					sort_way = Math.random() > .5;
				}
				local_block.feed_elements.sort(function(a,b) {
					return sort_way ? a._size-b._size : b._size-a._size
				})

				if (!exact_element) {
					blocks.push(local_block);
				} else {
					exact_element = false;
				}
				setDefault();
			}
			addNewsToBlock = function() {
				local_block.feed_elements.push(local_element);
				local_block.number += feeds[i]._size;
				if (local_block.number == block_size) {
					blockFormEnding();
				}
			}
			generateSize = function(arr, add_flag) {
				randomOrient = function() {
					return Math.random() > .5 ? 'left' : 'right';
				}
			    random_value = ~~(Math.random() * (arr.length));
				local_element._size = arr[random_value];
				local_element.orient = local_element._size == 2 ? randomOrient() : null;
			    if (add_flag) addNewsToBlock();
			}

			// start
			if (last_block) {
				blocks.push(last_block);
				last_block = null;
			}
			if (blocks[blocks.length-1] && blocks[blocks.length-1].number != block_size) {
				exact_element = true;
				local_block = blocks[blocks.length-1];
			} else {
				exact_element = false;
			}

			// lloooopp
			for (i in feeds) {
				if (!local_block) createBlock();

				var local_element = feeds[i];

				if (local_block.number == 0) {
					generateSize([2,2,4], true);
				} else if (local_block.number == 2 || 
						   local_block.number == 3) {
					generateSize([1], true);
				} 
				// if (i == feeds.length - 1) {
				// 	if (local_block) blockFormEnding();
				// }
			}


			var blocks_length = blocks.length;
			if (blocks_length % 2 == 0) {
				last_block = blocks.pop();
			} 

			return blocks;
		},
		insertMeta : function(options_og, options_default, title) {
			$.extend(options_og, {
				type: 'article',
		        site_name: 'Твой Космос'
			});
			props = [ 'title', 
					  'type', 
					  'url', 
					  'image', 
					  'description', 
					  'site_name'
			];
			for (i in props) {
				meta = document.createElement('META');
				$(meta)
					.attr('property', 'og:' + props[i])
					.attr('content', options_og[props[i]])
				document.head.appendChild(meta);
			};

			for (i in options_default) {
				meta = document.createElement('META');
				$(meta)
					.attr('name', i)
					.attr('content', options_default[i]);
				document.head.appendChild(meta);
			}
			if (title) {
				document.title = 'Твой Космос | ' + title;
			}
		}
	}
})();