/** @jsx React.DOM */

EachPost = React.createClass({displayName: 'EachPost',
	render: function() {
		data = this.props.data;
		date = moment(data.date).locale('ru').calendar();
		href = '/post/' + data._id;
		imgStyle = data.image ? {
			backgroundImage : 'url(' + data.image + ')'
		} : { display : 'none' }
		return (
			React.DOM.a({href: href}, 
				React.DOM.div({className: "each-post"}, 
					React.DOM.div({className: "title"}, data.title), 
					React.DOM.div({className: "date"}, date), 
					React.DOM.div({className: "description"}, data.description), 
					React.DOM.div({style: imgStyle})
				)
			)
		)
	}
})
PostsList = React.createClass({displayName: 'PostsList',
	getInitialState: function() {
		return {
			posts : []
		}		
	},
	componentDidMount : function() {
		var self = this;
		url = '/news/';
		$.getJSON(url, function(data) {
			console.log('react ajax posts data', data);
			if (!data) return;
			self.setState({
				posts : data
			})
		})	
	},
	render: function() {
		posts = this.state.posts.map(function(element) {
			return EachPost({data: element})
		})
		return (
			React.DOM.div({className: "posts-list"}, 
				React.DOM.h3({className: "tag-title"}, "Последние новости"), 
				posts 
			)
		)
	}
})
React.renderComponent(PostsList(null), $('.list')[0]);
