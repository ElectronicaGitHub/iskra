var UTILS = (function() {

	var block_size = 4,
	local_block = null,
	local_block_number = 0,
	init_number = 0;

	return {
		blocks_former : function(feeds, blocks) {
			console.warn('UTILS BLOCK FORMER');
			debugger;
			init_number ++;
			for (var i=0; i< feeds.length;i++) {
				if (!local_block) {
					local_block = {
						id : ~~(Math.random() * 9999),
						feed_elements : []
					}
				}
				if (local_block_number < block_size) {
					if (feeds[i].size <= (block_size-local_block_number)) {
						local_block.feed_elements.push(feeds[i]);
						local_block_number += feeds[i].size;
						feeds.splice(i,1);
						i--;
					}
				} else {
					sort_way = Math.random() > .5;
					local_block.feed_elements.sort(function(a,b) {
						return sort_way ? a.size-b.size : b.size-a.size
					})
					blocks.push(local_block);
					local_block = null;
					local_block_number = 0;
				}
			}
			if (feeds.length != 0 && init_number < 10) {
				this.blocks_former(feeds, blocks);
			}
			console.log('feeds', feeds);
			console.log('blocks', blocks);
			setTimeout(function() {
				if (formatter) {
					formatter();
				} else {
					console.warn('text formatter not allowed');
				}
			})

			return blocks;
		}
	}
})();