var UTILS = (function() {

	var block_size = 4,
	local_block = null,
	local_block_number = 0,
	init_number = 0,
	acceptable_sizes = [2,4];

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
				generateSize = function(array_fully, add_flag, arr) {
					acceptable_sizes = arr ? arr : acceptable_sizes;
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
				// } else if (rem_size > 2) {
				// 	generateSize(1, true);
				} else if (rem_size == 2) {
					generateSize(0, true, [1]);
				} else if (rem_size == 1) {
					generateSize(0, true, [1]);
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
		}, 
		formatter : function() {
			setTimeout(function() {
				a = $('news.s11');
				a.each(function(n, el) {
					console.log(el);
					el_h = $(el).find('.inner-container').height();
					text = $(el).find('.text-container');
					text_h = text.height();
					pic = $(el).find('.picture');
					pic_h = pic.height();
					title_h = $(el).find('.news_title').height();
					desc_h = $(el).find('.description').height();
					text_p = (title_h + desc_h) / text_h;
					pic_p = pic_h / el_h
					diff_p = text_p < 1 ? 1 - text_p : null;
					diff_h = diff_p * el_h;
					console.log(pic_p, text_p, diff_p, diff_h);
					text.css({
						height: (text_h - diff_h) + 'px'
					})
					pic.css({
						height: (pic_h + diff_h) + 'px'
					})
				


				})

			})
		}
	}
})();