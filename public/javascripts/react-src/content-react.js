/** @jsx React.DOM */

EachPost = React.createClass({
	render: function() {
		data = this.props.data;
		date = moment(data.date).locale('ru').calendar();
		href = '/post/' + data._id;
		imgStyle = data.image ? {
			backgroundImage : 'url(' + data.image + ')'
		} : { display : 'none' }
		return (
			<a href={href}>
				<div className="each-post">
					<div className="title">{data.title}</div>
					<div className="date">{date}</div>
					<div className="description">{data.description}</div>
					<div style={imgStyle}></div>
				</div>
			</a>
		)
	}
})
PostsList = React.createClass({
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
			return <EachPost data={element}/>
		})
		return (
			<div className="posts-list">
				<h3 className="tag-title">Последние новости</h3>
				{ posts }
			</div>
		)
	}
})
React.renderComponent(<PostsList/>, document.getElementsByClassName('list')[0]);
