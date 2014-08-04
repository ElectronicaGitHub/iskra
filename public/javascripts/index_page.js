app.controller('Index', [ '$scope', '$http', function($scope, $http) {
	var block_size = 4;
	$scope.feed_blocks = [];
	$scope.feeds = [];
	sizes = [1,2,4];
	for (var i=0; i<20; i++) {
		$scope.feeds.push({
			title : 'title number ' + i,
			size : sizes[~~(Math.random() * sizes.length)]
		})
	}
	local_block = null;
	local_block_number = 0;
	init_number = 0;
	var fill_blocks = function() {
		console.log('fillblocks init');
		init_number ++;
		for (var i in $scope.feeds) {
			if (!local_block) {
				local_block = {
					id : ~~(Math.random() * 9999),
					feed_elements : []
				}
			}
			if (local_block_number < block_size) {
				if ($scope.feeds[i].size <= (block_size-local_block_number)) {
					local_block.feed_elements.push($scope.feeds[i]);
					local_block_number += $scope.feeds[i].size;
					$scope.feeds.splice(i,1);
				}
			} else {
				sort_way = Math.random() > .5;
				local_block.feed_elements.sort(function(a,b) {
					return sort_way ? a.size-b.size : b.size-a.size
				})
				$scope.feed_blocks.push(local_block);
				local_block = null;
				local_block_number = 0;
			}
		}
		if ($scope.feeds.length != 0 && init_number < 10) {
			fill_blocks();
		}
	}
	fill_blocks();
	console.log('feeds', $scope.feeds);
	console.log('blocks', $scope.feed_blocks);
}])